import Image from "next/image";

export default function LessonNavButtons({ onPrev, onNext, className = "" }) {
  return (
    <div className={`flex justify-center gap-[20px] mt-[20px] ${className}`}>
      {/* Prev button */}
      <button
        className="w-[34px] h-[34px] rounded-full bg-[#D8E2DE] flex items-center justify-center"
        onClick={onPrev}
      >
        <Image
          src="/svgs/Arrow left.svg"
          alt="Назад"
          width={4}
          height={7}
          priority
        />
      </button>
      {/* Next button */}
      <button
        className="w-[34px] h-[34px] rounded-full bg-[#D8E2DE] flex items-center justify-center"
        onClick={onNext}
      >
        <Image
          src="/svgs/Arrow right.svg"
          alt="Вперёд"
          width={4}
          height={7}
          priority
        />
      </button>
    </div>
  );
}
