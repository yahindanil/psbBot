import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Success() {
  return (
    <div className="min-h-screen bg-[#749484]">
      <div className="container bg-[#749484] text-center relative">
        <Link href="/all-modules">
          <div
            className="absolute"
            style={{
              top: 24,
              right: 24,
              width: 25,
              height: 25,
              background: "#F5ECDA",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 50,
              boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
              cursor: "pointer",
            }}
          >
            <Image src="/svgs/X mark.svg" alt="Закрыть" width={7} height={7} />
          </div>
        </Link>
        <Image
          src="/images/test/completed.png"
          alt="Иллюстрация курса"
          width={320}
          height={296}
          className="relative z-10 select-none mx-auto mb-[0px]"
          priority
        />
        <h1 className="mb-[30px] text-white">
          Поздравляем!
          <br />
          Тест успешно пройден
        </h1>
        <Link href="/all-modules">
          <Button
            className="w-[260px] text-[16px] py-[13px] text-[#283B41] font-semibold rounded-full"
            color="#F5ECDA"
          >
            К следующему уроку
          </Button>
        </Link>
      </div>
    </div>
  );
}
