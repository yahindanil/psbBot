import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { checkTestWithTimer, getLessonIdFromUrl } from "@/utils/testUtils";
import { useLessonTimer } from "@/utils/lessonTimer";
import { useUser } from "@/contexts/UserContext";
import Image from "next/image";
import testsData from "@/data/testsData.json";

export default function UniversalTest({ moduleId, lessonId }) {
  const [testData, setTestData] = useState(null);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);

  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();
  const { telegramUser, refreshUserData } = useUser();

  // Получаем ID урока для таймера
  const lessonUrl = `/all-modules/${moduleId}/${lessonId}`;
  const numericLessonId = getLessonIdFromUrl(lessonUrl);

  // Инициализируем таймер урока
  const lessonTimer = useLessonTimer(numericLessonId, {
    autoStart: false, // Не запускаем автоматически, запустим вручную
    trackInactivity: true,
    debugMode: process.env.NODE_ENV === "development",
  });

  useEffect(() => {
    // Загружаем данные теста из JSON файла
    const moduleData = testsData[moduleId];
    const lessonData = moduleData?.[lessonId];

    if (lessonData) {
      setTestData(lessonData.questions);
      // Запускаем таймер когда тест загружен
      if (lessonTimer && !lessonTimer.isActive) {
        lessonTimer.startTimer();
      }
    } else {
      console.error(`Test data not found for ${moduleId}/${lessonId}`);
    }
  }, [moduleId, lessonId, numericLessonId, lessonTimer]);

  // Очистка таймера при размонтировании компонента
  useEffect(() => {
    return () => {
      if (lessonTimer && lessonTimer.isActive) {
        // Не останавливаем таймер здесь, он должен продолжать работать
        // до успешного завершения теста
      }
    };
  }, [lessonTimer]);

  const handleCheck = () => {
    if (selected === null || !testData) return;
    const correct = selected === testData[page].correct;
    setIsChecked(true);
    setIsCorrect(correct);
    // Сохраняем ответ пользователя и результат проверки
    const updatedAnswers = [...userAnswers];
    updatedAnswers[page] = { answer: selected, isCorrect: correct };
    setUserAnswers(updatedAnswers);

    // Отмечаем активность пользователя
    if (lessonTimer) {
      lessonTimer.updateActivity();
    }
  };

  const handleNext = () => {
    if (!testData) return;
    setPage((p) => Math.min(testData.length - 1, p + 1));
    const next = userAnswers[page + 1];
    setSelected(next ? next.answer : null);
    setIsChecked(!!next);
    setIsCorrect(next ? next.isCorrect : null);

    // Отмечаем активность пользователя
    if (lessonTimer) {
      lessonTimer.updateActivity();
    }
  };

  const handlePrev = () => {
    setPage((p) => Math.max(0, p - 1));
    const prev = userAnswers[page - 1];
    setSelected(prev ? prev.answer : null);
    setIsChecked(!!prev);
    setIsCorrect(prev ? prev.isCorrect : null);

    // Отмечаем активность пользователя
    if (lessonTimer) {
      lessonTimer.updateActivity();
    }
  };

  const handleFinish = async () => {
    if (!testData || !numericLessonId) return;

    setIsProcessing(true);

    try {
      // Обработчик успешного завершения урока
      const onLessonCompleted = async (result) => {
        if (result.module_completed) {
          console.log(
            `🎉 Поздравляем! Вы завершили модуль ${result.module_id}!`
          );
        }
      };

      // Вызываем улучшенную функцию с таймером
      await checkTestWithTimer({
        correctAnswers: testData.map((q) => q.correct),
        userAnswers: userAnswers.map((a) => (a ? a.answer : null)),
        lessonUrl,
        router,
        telegramUser,
        lessonTimer, // Передаем объект таймера
        onLessonCompleted,
        refreshUserData, // Передаем функцию обновления данных пользователя
      });
    } catch (error) {
      console.error("Ошибка в checkTestWithTimer:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Если данные еще не загружены
  if (!testData) {
    return (
      <div className="container-without-padding pt-[20px] min-h-screen">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-gray-600 mb-2">Загрузка теста...</div>
            {numericLessonId && (
              <div className="text-sm text-gray-400">
                Урок {numericLessonId}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-without-padding pt-[20px] min-h-screen">
      <header className="relative flex items-center mb-[20px] min-h-[25px] pl-[16px] pr-[16px]">
        <div className="bg-[#749484] rounded-[30px] px-[15px] py-[5px] text-white text-[14px] mx-auto mb-[61px]">
          Тест
        </div>
      </header>
      <div
        className={`relative flex-1 rounded-t-[15px] pr-[20px] pt-[20px] pb-[50px] pl-[16px] flex flex-col bg-[#DFB57F] text-black`}
        style={{ minHeight: "calc(100vh - 132px)" }}
      >
        {/* Картинка Артёма */}
        <div
          style={{
            position: "absolute",
            top: "-41px",
            left: "50%",
            transform: "translateX(-50%)",
            width: 82,
            height: 82,
            zIndex: 2,
          }}
        >
          <Image
            src="/images/test/Artem (1).png"
            alt="Артем"
            width={82}
            height={82}
            priority
            loading="eager"
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
        </div>
        <div className="text-center mt-[51px] text-[10px] text-[#283B41] mb-[15px]">
          Вопрос {page + 1}/{testData.length}
        </div>
        <h1 className="text-[22px] font-bold text-center mb-[24px] leading-tight">
          {testData[page].question}
        </h1>
        <div className="flex flex-col gap-[14px] w-full mb-[32px]">
          {testData[page].answers.map((ans, idx) => {
            let btnColor = "bg-[#F5ECDA]";
            if (isChecked && selected === idx) {
              btnColor = isCorrect
                ? "!bg-[#749484] text-white"
                : "!bg-[#DC5869] text-white";
            } else if (!isChecked && selected === idx) {
              btnColor = "!bg-[#ACC0B1]";
            }
            return (
              <button
                key={idx}
                className={`rounded-[12px] py-[13px] px-[10px] text-[16px] font-medium shadow-sm ${btnColor}`}
                onClick={() => {
                  if (!isChecked) {
                    setSelected(idx);
                    // Отмечаем активность пользователя
                    if (lessonTimer) {
                      lessonTimer.updateActivity();
                    }
                  }
                }}
                type="button"
                disabled={isChecked}
              >
                {ans}
              </button>
            );
          })}
        </div>
        {isChecked && (
          <div
            className="text-center mt-2 mb-2"
            style={{ fontSize: 16, color: isCorrect ? "#283B41" : "#DC5869" }}
          >
            {isCorrect ? "Верно!" : "Неверно :("}
          </div>
        )}
        <div className="flex w-full gap-[14px] mt-auto">
          <button
            className={`flex-1 rounded-[8px] py-[13px] text-[16px] font-semibold text-white ${
              page === 0 ? "bg-[#A9BDB2]" : "bg-[#749484]"
            }`}
            onClick={handlePrev}
            disabled={page === 0}
          >
            Назад
          </button>
          {!isChecked ? (
            <button
              className="flex-1 bg-[#749484] text-white rounded-[8px] py-[13px] text-[16px] font-semibold"
              onClick={handleCheck}
              disabled={selected === null}
            >
              Проверить
            </button>
          ) : page === testData.length - 1 ? (
            <button
              className="flex-1 bg-[#749484] text-white rounded-[8px] py-[13px] text-[16px] font-semibold"
              onClick={handleFinish}
              disabled={isProcessing}
            >
              {isProcessing ? "Завершение..." : "Завершить"}
            </button>
          ) : (
            <button
              className="flex-1 bg-[#749484] text-white rounded-[8px] py-[13px] text-[16px] font-semibold"
              onClick={handleNext}
            >
              Далее
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
