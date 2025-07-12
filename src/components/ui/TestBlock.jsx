import Image from "next/image";
import Link from "next/link";

export default function TestBlock({ testUrl, variant = "default" }) {
  if (variant === "module2") {
    return (
      <>
        <h2 className="text-[24px] font-semibold mb-[30px] text-center">
          Проверь себя
        </h2>
        <p className="text-[16px] mb-[40px] text-center">
          Давай проверим на сколько ты усвоил пройденный урок
        </p>
        <div className="flex justify-center mb-[40px]">
          <Image
            src="/images/Laptop.png"
            alt="Laptop"
            width={249}
            height={208}
            loading="eager"
          />
        </div>
        <div className="flex justify-center">
          <Link
            href={testUrl}
            className="bg-white text-black py-[15px] px-[40px] rounded-[30px] font-semibold text-[16px] hover:bg-gray-100 transition-colors"
          >
            Пройти тест
          </Link>
        </div>
      </>
    );
  }

  // Default variant for module 1
  return (
    <>
      <div className="flex justify-between items-start mb-[15px]"></div>
      <div className="flex justify-center mt-[30px] mb-[53px]">
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/Laptop.png"
            alt="Lock Icon"
            width={236}
            height={236}
            loading="eager"
          />
        </div>
      </div>
      <h2 className="text-center text-black text-[22px] font-semibold mb-[15px]">
        Проверь себя
      </h2>
      <p className="text-center text-black text-[16px] mb-[33px]">
        Давай проверим на сколько ты усвоил пройденный урок
      </p>
      <div className="flex justify-center">
        <Link href={testUrl} className="block">
          <button className="bg-[#F5ECDA] rounded-full py-[11px] text-black font-semibold text-[16px] w-[225px]">
            Пройти тест
          </button>
        </Link>
      </div>
    </>
  );
}
