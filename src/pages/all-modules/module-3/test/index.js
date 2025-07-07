import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import LessonNavButtons from "@/components/ui/LessonNavButtons";

const testPages = [
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
            src="/images/Lesson one greetings picture.png"
            alt="Lock Icon"
            width={501.45}
            height={398}
            priority
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
        <div className="text-[#7A9885] text-[13px] mb-[10px]">Вопрос 1/3</div>
        <h1 className="text-[22px] font-bold text-center mb-[24px] leading-tight">
          Что отличает цель от мечты?
        </h1>
        <div className="flex flex-col gap-[14px] w-full mb-[32px]">
          <button className="bg-[#F9F6EF] rounded-[12px] py-[13px] text-[16px] font-medium shadow-sm">
            У цели есть сумма и срок
          </button>
          <button className="bg-[#F9F6EF] rounded-[12px] py-[13px] text-[16px] font-medium shadow-sm">
            Цель всегда дороже
          </button>
          <button className="bg-[#F9F6EF] rounded-[12px] py-[13px] text-[16px] font-medium shadow-sm">
            Мечта обязательно исполнится
          </button>
        </div>
        <div className="flex w-full gap-[14px] mt-auto">
          <button className="flex-1 bg-[#A9BDB2] text-white rounded-[8px] py-[13px] text-[16px] font-semibold opacity-60 cursor-not-allowed">
            Назад
          </button>
          <button className="flex-1 bg-[#749484] text-white rounded-[8px] py-[13px] text-[16px] font-semibold">
            Проверить
          </button>
        </div>
      </>
    ),
    bg: "bg-[#DFB57F] text-black",
  },
];

export default function Test() {
  const [page, setPage] = useState(1);

  return (
    <div className="container-without-padding pt-[20px] min-h-screen">
      <header className="relative flex items-center mb-[20px] min-h-[25px] pl-[16px] pr-[16px]">
        <div className="bg-[#749484] rounded-[30px] px-[15px] py-[5px] text-white text-[14px] mx-auto">
          Урок 1
        </div>
      </header>

      {/* Lesson pages */}
      {page > 0 && (
        <div
          className={`flex-1 rounded-t-[15px] pr-[20px] pt-[20px] pb-[50px] pl-[16px] flex flex-col min-h-[calc(100vh-65px)] ${
            testPages[page].bg || "bg-white text-black"
          }`}
          style={{ minHeight: "calc(100vh - 65px)" }}
        >
          {testPages[page].content}
          {page < testPages.length - 1 && (
            <div className="mt-auto">
              <LessonNavButtons onPrev={handlePrev} onNext={handleNext} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
