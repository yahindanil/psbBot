import Image from "next/image";

const ModuleCard = ({
  imageSrc,
  imageAlt,
  title,
  text,
  locked = false,
  bgColor = "#DFB57F",
  bgColorLocked = "#ACC0B1",
  onClick,
}) => {
  return (
    <div
      className="rounded-[30px] p-[20px] w-[210px] h-[183px] flex-shrink-0"
      style={{
        background: locked ? bgColorLocked : bgColor,
        width: 210,
        height: 183,
        cursor: onClick ? "pointer" : undefined,
      }}
      onClick={onClick}
    >
      <div className="h-[71px] flex justify-between items-start mb-[16px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={68.34}
          height={71}
          priority
        />
        {locked && (
          <Image
            src="/svgs/Lock.svg"
            alt="Lock Icon"
            width={16.13}
            height={22}
            priority
          />
        )}
      </div>
      <div className="w-[183px] leading-[1.2]">
        <h3 className="text-[16px] font-bold">{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ModuleCard;
