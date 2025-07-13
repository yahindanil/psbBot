import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { checkTestAndRedirectWithAPI } from "@/utils/testUtils";
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
  const [testStartTime] = useState(Date.now());
  const [logs, setLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const { telegramUser } = useUser();

  // Функция для добавления логов на страницу
  const addLog = (type, message, data = null) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = {
      timestamp,
      type,
      message,
      data: data ? JSON.stringify(data, null, 2) : null,
    };
    setLogs((prev) => [...prev, logEntry]);
    console.log(`[${type.toUpperCase()}] ${message}`, data || "");
  };

  useEffect(() => {
    // Загружаем данные теста из JSON файла
    const moduleData = testsData[moduleId];
    const lessonData = moduleData?.[lessonId];

    if (lessonData) {
      setTestData(lessonData.questions);
    } else {
      console.error(`Test data not found for ${moduleId}/${lessonId}`);
    }
  }, [moduleId, lessonId]);

  const handleCheck = () => {
    if (selected === null || !testData) return;
    const correct = selected === testData[page].correct;
    setIsChecked(true);
    setIsCorrect(correct);
    // Сохраняем ответ пользователя и результат проверки
    const updatedAnswers = [...userAnswers];
    updatedAnswers[page] = { answer: selected, isCorrect: correct };
    setUserAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (!testData) return;
    setPage((p) => Math.min(testData.length - 1, p + 1));
    const next = userAnswers[page + 1];
    setSelected(next ? next.answer : null);
    setIsChecked(!!next);
    setIsCorrect(next ? next.isCorrect : null);
  };

  const handlePrev = () => {
    setPage((p) => Math.max(0, p - 1));
    const prev = userAnswers[page - 1];
    setSelected(prev ? prev.answer : null);
    setIsChecked(!!prev);
    setIsCorrect(prev ? prev.isCorrect : null);
  };

  const handleFinish = async () => {
    if (!testData) return;

    setIsProcessing(true);
    setShowLogs(true);
    setLogs([]); // Очищаем предыдущие логи

    const timeSpentSeconds = Math.floor((Date.now() - testStartTime) / 1000);
    const lessonUrl = `/all-modules/${moduleId}/${lessonId}`;

    addLog("info", "Начало завершения теста", {
      moduleId,
      lessonId,
      lessonUrl,
      timeSpentSeconds,
      telegramUser: telegramUser
        ? { id: telegramUser.id, first_name: telegramUser.first_name }
        : null,
      userAnswers,
      correctAnswers: testData.map((q) => q.correct),
    });

    try {
      addLog("info", "Вызов checkTestAndRedirectWithAPI...");

      // Временно отключаем автоматический переход для тестирования
      const testMode = true; // Установите в false, чтобы включить переходы

      if (testMode) {
        addLog("warning", "ТЕСТОВЫЙ РЕЖИМ: автоматический переход отключен");

        // Вызываем функцию завершения урока напрямую для тестирования
        const { checkTestAndRedirectWithAPI } = await import(
          "@/utils/testUtils"
        );

        // Создаем модифицированный router, который не переходит
        const testRouter = {
          ...router,
          push: (url) => {
            addLog("info", `ТЕСТОВЫЙ РЕЖИМ: переход на ${url} заблокирован`);
            return Promise.resolve();
          },
        };

        // Передаем функцию логирования в checkTestAndRedirectWithAPI
        await checkTestAndRedirectWithAPI({
          correctAnswers: testData.map((q) => q.correct),
          userAnswers: userAnswers.map((a) => (a ? a.answer : null)),
          lessonUrl,
          router: testRouter,
          telegramUser,
          timeSpentSeconds,
          addLog, // Передаем функцию логирования
        });
      } else {
        // Обычный режим с переходами
        await checkTestAndRedirectWithAPI({
          correctAnswers: testData.map((q) => q.correct),
          userAnswers: userAnswers.map((a) => (a ? a.answer : null)),
          lessonUrl,
          router,
          telegramUser,
          timeSpentSeconds,
          addLog, // Передаем функцию логирования
        });
      }

      addLog("success", "checkTestAndRedirectWithAPI завершен успешно");
    } catch (error) {
      addLog("error", "Ошибка в checkTestAndRedirectWithAPI", {
        message: error.message,
        details: error.details,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Если данные еще не загружены
  if (!testData) {
    return (
      <div className="container-without-padding pt-[20px] min-h-screen">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">Загрузка теста...</div>
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
        style={{ height: "calc(100vh - 132px)" }}
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
                onClick={() => !isChecked && setSelected(idx)}
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
            >
              Далее
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

      {/* Панель логов */}
      {showLogs && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "20px",
              maxWidth: "90%",
              maxHeight: "80%",
              overflow: "auto",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>
                Логи завершения теста
              </h3>
              <button
                onClick={() => setShowLogs(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                  padding: "5px",
                }}
              >
                ✕
              </button>
            </div>

            {isProcessing && (
              <div
                style={{
                  textAlign: "center",
                  padding: "20px",
                  fontSize: "16px",
                  color: "#666",
                }}
              >
                Обработка теста...
              </div>
            )}

            <div style={{ maxHeight: "400px", overflow: "auto" }}>
              {logs.map((log, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "15px",
                    padding: "10px",
                    borderRadius: "8px",
                    backgroundColor:
                      log.type === "error"
                        ? "#ffebee"
                        : log.type === "warning"
                        ? "#fff3e0"
                        : log.type === "success"
                        ? "#e8f5e8"
                        : "#f5f5f5",
                    borderLeft: `4px solid ${
                      log.type === "error"
                        ? "#f44336"
                        : log.type === "warning"
                        ? "#ff9800"
                        : log.type === "success"
                        ? "#4caf50"
                        : "#2196f3"
                    }`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "5px",
                    }}
                  >
                    <strong
                      style={{
                        color:
                          log.type === "error"
                            ? "#d32f2f"
                            : log.type === "warning"
                            ? "#f57c00"
                            : log.type === "success"
                            ? "#388e3c"
                            : "#1976d2",
                      }}
                    >
                      {log.type.toUpperCase()}
                    </strong>
                    <span style={{ fontSize: "12px", color: "#666" }}>
                      {log.timestamp}
                    </span>
                  </div>
                  <div style={{ fontSize: "14px", marginBottom: "5px" }}>
                    {log.message}
                  </div>
                  {log.data && (
                    <pre
                      style={{
                        fontSize: "12px",
                        backgroundColor: "#f8f9fa",
                        padding: "8px",
                        borderRadius: "4px",
                        overflow: "auto",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      {log.data}
                    </pre>
                  )}
                </div>
              ))}
            </div>

            {!isProcessing && logs.length > 0 && (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  padding: "10px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "8px",
                }}
              >
                <strong>Обработка завершена!</strong>
                <br />
                <small>Проверьте логи выше для диагностики проблем</small>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
