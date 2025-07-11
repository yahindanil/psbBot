import Link from "next/link";
import Image from "next/image";

export default function Profile() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container-without-padding text-center">
        <div className="h-[326px] bg-[#749484] rounded-b-[15px] pt-[30px] pl-[16px] pr-[16px]">
          <Link
            href="/all-modules"
            className="w-[25px] h-[25px] flex items-center justify-center rounded-full bg-[#F5ECDA] mb-[14px]"
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
          <div className="text-[16px] text-white font-semibold">
            Привет,
            <br />
            Мария!
          </div>
          <div className="flex justify-center mt-[18px]">
            <Image
              src="/images/personal account/Artem profile.png"
              alt="Аватар"
              width={294}
              height={225}
              priority
              style={{ zIndex: 10 }}
            />
          </div>
          <div className="bg-[#D8E2DE] min-w-[288px] rounded-[15px] mx-auto mt-[-75px] mb-[15px] z-50 relative px-[14px] pt-[19px] pb-[14px]">
            <div className="text-[#283B41] text-[14px] font-normal text-left mb-[12px]">
              Ты на верном пути — не сбавляй темп!
            </div>
            <div className="border-b border-[#283B41] mb-[7px]"></div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-semibold text-[#283B41] leading-none">
                2/14
              </span>
              <div className="flex-1 flex justify-center">
                {/* Прогрессбар */}
                <div className="flex items-center justify-around border-[1px] px-[1px] border-[#283B41] rounded-[5px] w-[158px] h-[20px] bg-[#D8E2DE]">
                  {[...Array(14)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-[9px] h-[16px] rounded-[5px] ${
                        i < 2 ? "bg-[#749484]" : "bg-[#ACC0B1]"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <Image
                src="/images/personal account/coin.png"
                alt="Монеты"
                width={30}
                height={25}
                className="ml-2"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
          <div className="border border-[#ACC0B1] rounded-[15px] px-[13px] py-[10px] flex items-start w-full max-w-[400px] mx-auto bg-white mb-[15px]">
            <Image
              src="/images/personal account/time.png"
              alt="Песочные часы"
              width={13.4}
              height={20.76}
              className="flex-shrink-0"
            />
            <div className="text-left">
              <div className="text-[#283B41] text-[14px] font-semibold">
                15 минут
              </div>
              <div className="text-[#222] text-[10px]">
                Среднее время занятий
              </div>
            </div>
          </div>
          <div className="rounded-[15px] bg-[#F5ECDA] px-[14px] pt-[14px] pb-[15px] flex flex-col items-center w-full max-w-[400px] mx-auto">
            <div className="flex items-center w-full mb-2">
              <Image
                src="/images/personal account/Artem winking.png"
                alt="Аватар"
                width={41}
                height={41}
                className="rounded-full mr-3"
              />
              <div className="text-left">
                <div className="text-[#283B41] text-[14px] font-semibold">
                  Вместе веселее
                </div>
                <div className="text-[#000000] text-[10px] ">
                  Поделись курсом с друзьями и собери
                  <br />
                  свою команду будущих инвесторов!
                </div>
              </div>
            </div>
            <button
              className="w-full bg-[#DFB57F] rounded-[30px] text-[14px] font-semibold text-black mt-2 hover:opacity-90 min-w-[260px] h-[42px] flex items-center justify-center"
              type="button"
            >
              Пригласить друзей
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
