import { useState, useEffect, useRef, useCallback, useMemo } from "react";

/**
 * Ключи для хранения данных в localStorage
 */
const STORAGE_KEYS = {
  startTime: (lessonId) => `lesson_start_time_${lessonId}`,
  pausedTime: (lessonId) => `lesson_paused_time_${lessonId}`,
  totalTime: (lessonId) => `lesson_total_time_${lessonId}`,
  lastActivity: (lessonId) => `lesson_last_activity_${lessonId}`,
};

/**
 * Конфигурация таймера
 */
const TIMER_CONFIG = {
  // Максимальное время неактивности в миллисекундах (5 минут)
  maxInactivityTime: 5 * 60 * 1000,
  
  // Интервал обновления таймера в миллисекундах
  updateInterval: 1000,
  
  // Максимальное разумное время урока в миллисекундах (2 часа)
  maxReasonableTime: 2 * 60 * 60 * 1000,
  
  // Минимальное время урока для засчитывания в миллисекундах (10 секунд)
  minValidTime: 10 * 1000,
};

/**
 * Утилиты для работы с localStorage
 */
const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify({
        value,
        timestamp: Date.now(),
      }));
    } catch (error) {
      console.warn(`[LessonTimer] Не удалось сохранить в localStorage:`, error);
    }
  },
  
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      
      const parsed = JSON.parse(item);
      return parsed.value;
    } catch (error) {
      console.warn(`[LessonTimer] Не удалось прочитать из localStorage:`, error);
      return null;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`[LessonTimer] Не удалось удалить из localStorage:`, error);
    }
  },
  
  clear: (lessonId) => {
    const keys = Object.values(STORAGE_KEYS).map(fn => fn(lessonId));
    keys.forEach(key => storage.remove(key));
  },
};

/**
 * Проверяет, был ли пользователь неактивен слишком долго
 */
const checkInactivity = (lastActivity) => {
  if (!lastActivity) return false;
  
  const timeSinceLastActivity = Date.now() - lastActivity;
  return timeSinceLastActivity > TIMER_CONFIG.maxInactivityTime;
};

/**
 * Проверяет, разумно ли время урока
 */
const isReasonableTime = (timeMs) => {
  return timeMs >= TIMER_CONFIG.minValidTime && timeMs <= TIMER_CONFIG.maxReasonableTime;
};

/**
 * Вычисляет финальное время урока с учетом всех факторов
 */
const calculateFinalTime = (startTime, endTime, pausedTime = 0) => {
  if (!startTime || !endTime) return 0;
  
  const totalElapsed = endTime - startTime;
  const activeTime = totalElapsed - pausedTime;
  
  // Проверяем разумность времени
  if (!isReasonableTime(activeTime)) {
    console.warn(`[LessonTimer] Неразумное время урока: ${activeTime}ms`);
    // Возвращаем среднее время урока (10 минут) как fallback
    return 10 * 60 * 1000;
  }
  
  return Math.max(activeTime, TIMER_CONFIG.minValidTime);
};

/**
 * Хук для работы с таймером урока
 * @param {number} lessonId - ID урока
 * @param {Object} options - Дополнительные параметры
 * @returns {Object} - Объект с состоянием и методами таймера
 */
export const useLessonTimer = (lessonId, options = {}) => {
  const {
    autoStart = true,
    trackInactivity = true,
    debugMode = process.env.NODE_ENV === 'development',
  } = options;
  
  const [isActive, setIsActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const startTimeRef = useRef(null);
  const pausedTimeRef = useRef(0);
  const lastActivityRef = useRef(Date.now());
  const intervalRef = useRef(null);
  
  const log = useCallback((message, data) => {
    if (debugMode) {
      console.log(`[LessonTimer] ${message}`, data || '');
    }
  }, [debugMode]);
  
  /**
   * Обновляет время последней активности
   */
  const updateActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
    storage.set(STORAGE_KEYS.lastActivity(lessonId), lastActivityRef.current);
  }, [lessonId]);
  
  /**
   * Обновляет отображаемое время
   */
  const updateElapsedTime = useCallback(() => {
    if (!startTimeRef.current || isPaused) return;
    
    const now = Date.now();
    const totalElapsed = now - startTimeRef.current;
    const activeTime = totalElapsed - pausedTimeRef.current;
    
    setElapsedTime(Math.max(0, activeTime));
  }, [isPaused]);
  
  /**
   * Запускает таймер
   */
  const startTimer = useCallback(() => {
    if (isActive) return;
    
    const now = Date.now();
    startTimeRef.current = now;
    lastActivityRef.current = now;
    pausedTimeRef.current = 0;
    
    setIsActive(true);
    setIsPaused(false);
    setElapsedTime(0);
    
    // Сохраняем в localStorage
    storage.set(STORAGE_KEYS.startTime(lessonId), now);
    storage.set(STORAGE_KEYS.lastActivity(lessonId), now);
    storage.set(STORAGE_KEYS.pausedTime(lessonId), 0);
    
    log(`Таймер запущен для урока ${lessonId}`);
  }, [lessonId, isActive, log]);
  
  /**
   * Приостанавливает таймер
   */
  const pauseTimer = useCallback(() => {
    if (!isActive || isPaused) return;
    
    setIsPaused(true);
    log(`Таймер приостановлен для урока ${lessonId}`);
  }, [lessonId, isActive, isPaused, log]);
  
  /**
   * Возобновляет таймер
   */
  const resumeTimer = useCallback(() => {
    if (!isActive || !isPaused) return;
    
    setIsPaused(false);
    updateActivity();
    log(`Таймер возобновлен для урока ${lessonId}`);
  }, [lessonId, isActive, isPaused, updateActivity, log]);
  
  /**
   * Останавливает таймер и возвращает финальное время
   */
  const stopTimer = useCallback(() => {
    if (!isActive) return 0;
    
    const endTime = Date.now();
    const finalTime = calculateFinalTime(
      startTimeRef.current,
      endTime,
      pausedTimeRef.current
    );
    
    // Очищаем состояние
    setIsActive(false);
    setIsPaused(false);
    setElapsedTime(0);
    
    // Очищаем localStorage
    storage.clear(lessonId);
    
    // Очищаем интервал
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    log(`Таймер остановлен для урока ${lessonId}. Финальное время: ${finalTime}ms`);
    
    return Math.floor(finalTime / 1000); // Возвращаем в секундах
  }, [lessonId, isActive, log]);
  
  /**
   * Сбрасывает таймер
   */
  const resetTimer = useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
    setElapsedTime(0);
    
    startTimeRef.current = null;
    pausedTimeRef.current = 0;
    lastActivityRef.current = Date.now();
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    storage.clear(lessonId);
    log(`Таймер сброшен для урока ${lessonId}`);
  }, [lessonId, log]);
  
  /**
   * Восстанавливает состояние таймера из localStorage
   */
  const restoreFromStorage = useCallback(() => {
    const startTime = storage.get(STORAGE_KEYS.startTime(lessonId));
    const pausedTime = storage.get(STORAGE_KEYS.pausedTime(lessonId));
    const lastActivity = storage.get(STORAGE_KEYS.lastActivity(lessonId));
    
    if (!startTime) return false;
    
    // Проверяем, не был ли пользователь неактивен слишком долго
    if (trackInactivity && checkInactivity(lastActivity)) {
      log(`Обнаружена длительная неактивность, сбрасываем таймер`);
      storage.clear(lessonId);
      return false;
    }
    
    // Восстанавливаем состояние
    startTimeRef.current = startTime;
    pausedTimeRef.current = pausedTime || 0;
    lastActivityRef.current = lastActivity || Date.now();
    
    setIsActive(true);
    setIsPaused(false);
    
    log(`Восстановлено состояние таймера для урока ${lessonId}`, {
      startTime,
      pausedTime,
      lastActivity,
    });
    
    return true;
  }, [lessonId, trackInactivity, log]);
  
  /**
   * Обработчик активности пользователя
   */
  const handleUserActivity = useCallback(() => {
    if (isActive && !isPaused) {
      updateActivity();
    }
  }, [isActive, isPaused, updateActivity]);
  
  // Эффект для инициализации таймера
  useEffect(() => {
    if (!lessonId) return;
    
    // Пытаемся восстановить состояние
    const restored = restoreFromStorage();
    
    // Автозапуск, если не восстановили и включен автозапуск
    if (!restored && autoStart) {
      startTimer();
    }
  }, [lessonId, autoStart, restoreFromStorage, startTimer]);
  
  // Эффект для обновления времени
  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(updateElapsedTime, TIMER_CONFIG.updateInterval);
      updateElapsedTime(); // Обновляем сразу
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, isPaused, updateElapsedTime]);
  
  // Эффект для отслеживания активности пользователя
  useEffect(() => {
    if (!trackInactivity || !isActive) return;
    
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, true);
    });
    
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity, true);
      });
    };
  }, [trackInactivity, isActive, handleUserActivity]);
  
  // Эффект для очистки при размонтировании
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  // Форматирование времени для отображения
  const formattedTime = useMemo(() => {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [elapsedTime]);
  
  return {
    // Состояние
    isActive,
    isPaused,
    elapsedTime,
    formattedTime,
    
    // Методы
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    resetTimer,
    updateActivity,
    
    // Утилиты
    getElapsedSeconds: () => Math.floor(elapsedTime / 1000),
  };
};

/**
 * Экспорт утилит для использования вне хука
 */
export const LessonTimerUtils = {
  // Очистка данных конкретного урока
  clearLessonData: (lessonId) => storage.clear(lessonId),
  
  // Очистка всех данных таймеров
  clearAllData: () => {
    const keys = Object.keys(localStorage).filter(key => 
      key.startsWith('lesson_start_time_') ||
      key.startsWith('lesson_paused_time_') ||
      key.startsWith('lesson_total_time_') ||
      key.startsWith('lesson_last_activity_')
    );
    
    keys.forEach(key => localStorage.removeItem(key));
  },
  
  // Проверка наличия активных таймеров
  hasActiveTimers: () => {
    const keys = Object.keys(localStorage).filter(key => 
      key.startsWith('lesson_start_time_')
    );
    
    return keys.length > 0;
  },
  
  // Получение времени конкретного урока
  getLessonTime: (lessonId) => {
    const startTime = storage.get(STORAGE_KEYS.startTime(lessonId));
    const pausedTime = storage.get(STORAGE_KEYS.pausedTime(lessonId));
    
    if (!startTime) return 0;
    
    const totalElapsed = Date.now() - startTime;
    const activeTime = totalElapsed - (pausedTime || 0);
    
    return Math.floor(Math.max(0, activeTime) / 1000);
  },
}; 