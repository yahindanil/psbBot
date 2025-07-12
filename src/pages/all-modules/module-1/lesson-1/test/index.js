import { useState } from "react";
import { useRouter } from "next/router";
import { checkTestAndRedirectWithAPI } from "@/utils/testUtils";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import LessonNavButtons from "@/components/ui/LessonNavButtons";

const testData = [
  {
    question: "Почему деньги могут незаметно заканчиваться?",
    answers: [
      "Они сами по себе исчезают",
      "Они уходят на ненужные покупки",
      "Их слишком мало",
    ],
    correct: 1,
  },
  {
    question: "Что помогает не тратить деньги впустую?",
    answers: [
      "Покупать то, что есть у других",
      "Делать покупки по настроению",
      "Понимать, на что уходят деньги",
    ],
    correct: 2,
  },
  {
    question: "Что такое финансовая грамотность?",
    answers: [
      "Знание всех банковских терминов",
      "Понимание, как управлять деньгами",
      "Способ заработать легкие деньги",
    ],
    correct: 1,
  },
];

export default function Test() {
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [testStartTime] = useState(Date.now());
  const router = useRouter();
  const { telegramUser } = useUser();

  const handleCheck = () => {
    if (selected === null) return;
    const correct = selected === testData[page].correct;
    setIsChecked(true);
    setIsCorrect(correct);
    // Сохраняем ответ пользователя и результат проверки
    const updatedAnswers = [...userAnswers];
    updatedAnswers[page] = { answer: selected, isCorrect: correct };
    setUserAnswers(updatedAnswers);
  };

  const handleNext = () => {
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
    const timeSpentSeconds = Math.floor((Date.now() - testStartTime) / 1000);

    await checkTestAndRedirectWithAPI({
      correctAnswers: testData.map((q) => q.correct),
      userAnswers: userAnswers.map((a) => (a ? a.answer : null)),
      lessonUrl: "/all-modules/module-1/lesson-1",
      router,
      telegramUser,
      timeSpentSeconds,
    });
  };

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
                className={`rounded-[12px] py-[13px] text-[16px] font-medium shadow-sm ${btnColor}`}
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
    </div>
  );
}
