import React, { useEffect } from "react";
import { useLessonTimer } from "@/utils/lessonTimer";
import { getLessonIdFromUrl } from "@/utils/testUtils";
import { useRouter } from "next/router";

/**
 * Компонент-обертка для автоматического управления таймером урока
 * @param {Object} props - Пропсы компонента
 * @param {React.ReactNode} props.children - Дочерние элементы
 * @param {string} props.lessonUrl - URL урока для определения ID
 * @param {boolean} props.autoStart - Автоматически запускать таймер
 * @param {boolean} props.showDebugInfo - Показывать отладочную информацию
 * @param {Function} props.onTimerStart - Колбэк при запуске таймера
 * @param {Function} props.onTimerStop - Колбэк при остановке таймера
 */
export default function LessonWithTimer({
  children,
  lessonUrl = null,
  autoStart = true,
  showDebugInfo = false,
  onTimerStart = null,
  onTimerStop = null,
}) {
  const router = useRouter();

  // Получаем URL урока из роутера, если не передан явно
  const finalLessonUrl = lessonUrl || router.asPath.split("?")[0];

  // Получаем числовой ID урока
  const numericLessonId = getLessonIdFromUrl(finalLessonUrl);

  // Инициализируем таймер
  const lessonTimer = useLessonTimer(numericLessonId, {
    autoStart,
    trackInactivity: true,
    debugMode: process.env.NODE_ENV === "development",
  });

  // Вызываем колбэки при изменении состояния таймера
  useEffect(() => {
    if (lessonTimer.isActive && onTimerStart) {
      onTimerStart(lessonTimer);
    }
  }, [lessonTimer.isActive, onTimerStart]);

  // Предоставляем таймер через контекст для дочерних компонентов
  const childrenWithTimer = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { lessonTimer });
    }
    return child;
  });

  return (
    <>
      {childrenWithTimer}

      {/* Debug информация */}
      {(showDebugInfo || process.env.NODE_ENV === "development") &&
        lessonTimer && (
          <div
            style={{
              position: "fixed",
              top: "10px",
              right: "10px",
              background: "rgba(0, 0, 0, 0.8)",
              color: "white",
              padding: "8px",
              borderRadius: "4px",
              fontSize: "12px",
              zIndex: 1000,
              maxWidth: "200px",
            }}
          >
            <div>🕒 {lessonTimer.formattedTime}</div>
            <div>📚 Урок {numericLessonId}</div>
            <div>
              {lessonTimer.isActive ? "▶️" : "⏸️"}
              {lessonTimer.isActive ? "Активен" : "Неактивен"}
              {lessonTimer.isPaused ? " (Пауза)" : ""}
            </div>
          </div>
        )}
    </>
  );
}

/**
 * Хук для использования таймера урока в дочерних компонентах
 * @param {string} lessonUrl - URL урока (опционально)
 * @returns {Object} - Объект таймера урока
 */
export function useCurrentLessonTimer(lessonUrl = null) {
  const router = useRouter();
  const finalLessonUrl = lessonUrl || router.asPath.split("?")[0];
  const numericLessonId = getLessonIdFromUrl(finalLessonUrl);

  return useLessonTimer(numericLessonId, {
    autoStart: false, // Не автозапуск, управляется извне
    trackInactivity: true,
    debugMode: process.env.NODE_ENV === "development",
  });
}
