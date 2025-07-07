import Image from "next/image";

/**
 * Props:
 * - imageSrc: string (SVG path)
 * - imageAlt: string
 * - title: string
 * - text: string
 * - state: 'open' | 'done' | 'locked'
 */
const LessonCard = ({
  imageSrc,
  imageAlt,
  title,
  text,
  state = "open",
  imageSrcLocked,
}) => {
  const isDone = state === "done";
  const isLocked = state === "locked";
  // Если урок заблокирован, показываем imageSrcLocked, если он есть, иначе fallback
  const displayImageSrc = isLocked
    ? imageSrcLocked || "/images/Coins.png"
    : imageSrc;
  return (
    <div
      className={`flex items-center px-[20px] py-[15px] rounded-[15px] mb-[15px] min-h-[74px] ${
        isLocked ? "bg-[#D8E2DE]" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-center mr-[12px]">
        <Image
          src={displayImageSrc}
          alt={imageAlt}
          width={44}
          height={44}
          priority
        />
      </div>
      <div className="flex-1 min-w-0 text-[14px]">
        <h3 className="font-semibold">{title}</h3>
        <p>{text}</p>
      </div>
      <div className="ml-[14px] flex items-center">
        {isDone && (
          <Image
            src="/svgs/Check mark.svg"
            alt="Check mark"
            width={18}
            height={13}
            priority
          />
        )}
        {isLocked && (
          <Image
            src="/svgs/Lock.svg"
            alt="Lock Icon"
            width={16}
            height={22}
            priority
          />
        )}
      </div>
    </div>
  );
};

export default LessonCard;
