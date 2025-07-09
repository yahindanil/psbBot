import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import LessonNavButtons from "@/components/ui/LessonNavButtons";

const lessonPages = [
  {
    type: "start",
    content: (
      <>
        <h1 className="text-center text-[24px] font-semibold mb-[24px]">
          Почему деньги <br />
          не берутся <span className="bg-[#E9CDA7]">из воздуха</span>
        </h1>
        <div className="mb-[11px]">
          <Image
            src="/images/lesson 1/main.png"
            alt="Lock Icon"
            width={501.45}
            height={398}
            priority
            loading="eager"
          />
        </div>
        <div className="flex justify-center mb-[40px]">
          {/* Navigation to first lesson page handled in main component */}
        </div>
      </>
    ),
  },
  {
    type: "lesson",
    content: (
      <>
        <div className="flex justify-between items-start mb-[15px]">
          <h2>Представь: тебе подарили 3000 ₽.</h2>
          <div className="text-[10px] text-[#D8E2DE]">1/9</div>
        </div>
        <p className="text-[16px] mb-[53px]">
          Проходит всего пара дней — и ты не можешь вспомнить, куда они делись.
          Вроде ничего особенного не купил, но денег уже нет. Почему так
          произошло?
        </p>
        <div className="flex justify-center mb-auto">
          <Image
            src="/images/Money.png"
            alt="Lock Icon"
            width={249}
            height={208}
            loading="eager"
          />
        </div>
      </>
    ),
    bg: "bg-[#749484] text-white",
  },
  {
    type: "lesson",
    content: (
      <>
        <div className="flex justify-between items-start mb-[15px]">
          <h2>
            Почему деньги <br />{" "}
            <span className="bg-[#E9CDA7]">быстро исчезают</span>
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">2/9</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Деньги исчезают не потому, что с ними происходит что-то мистическое.
          Просто мы не всегда замечаем, на что тратим.
        </p>
        <p className="mb-[30px]">
          <span className="bg-[#D8E2DE] font-semibold">
            Приводим несколько сценариев:
          </span>{" "}
          увидел прикольный чехол для телефона — не удержался и купил, пошел с
          друзьями в кафе голодный — купил лишнюю булочку.
        </p>
        <p>
          Суммы вроде небольшие, но если не следить, за пару дней можно
          потратить все карманные деньги.
        </p>
      </>
    ),
    bg: "bg-white text-black",
  },
];

export default function Lesson() {
  const [page, setPage] = useState(0);

  const handleStart = () => setPage(1);
  const handlePrev = () => {
    setPage((p) => (p === 1 ? 0 : Math.max(1, p - 1)));
  };
  const handleNext = () =>
    setPage((p) => Math.min(lessonPages.length - 1, p + 1));

  return (
    <div className="container-without-padding pt-[20px] min-h-screen">
      <header className="relative flex items-center mb-[20px] min-h-[25px] pl-[16px] pr-[16px]">
        {/* Back button as Link, only on start page */}
        {page === 0 && (
          <Link
            href="/all-modules"
            className="w-[25px] h-[25px] flex items-center justify-center rounded-full bg-[#F5ECDA] absolute left-[16px] top-1/2 -translate-y-1/2"
          >
            <Image
              src="/svgs/Arrow left.svg"
              alt="Назад"
              width={5.5}
              height={8}
              loading="eager"
              className="pr-[1px]"
            />
          </Link>
        )}
        {/* Lesson label */}
        <div className="bg-[#749484] rounded-[30px] px-[15px] py-[5px] text-white text-[14px] mx-auto">
          Урок 2
        </div>
      </header>

      {/* Start page */}
      {page === 0 && (
        <div className="lesson-start-page mt-[10px]">
          {lessonPages[0].content}
          <div className="flex justify-center mb-[40px]">
            <Button className="w-[225px]" onClick={handleStart}>
              Начать учиться
            </Button>
          </div>
        </div>
      )}

      {/* Lesson pages */}
      {page > 0 && (
        <div
          className={`flex-1 rounded-t-[15px] pr-[20px] pt-[20px] pb-[50px] pl-[16px] flex flex-col min-h-[calc(100vh-65px)] ${
            lessonPages[page].bg || "bg-white text-black"
          }`}
          style={{ minHeight: "calc(100vh - 65px)" }}
        >
          {lessonPages[page].content}
          {page < lessonPages.length - 1 && (
            <div className="mt-auto">
              <LessonNavButtons onPrev={handlePrev} onNext={handleNext} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
