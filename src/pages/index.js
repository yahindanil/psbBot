import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="container text-center">
      <p className="text-[14px] mb-[9px]">Бесплатный курс</p>
      <h1 className="mb-[9px]">
        Инвестиции
        <br />
        для подростков
      </h1>
      <p>
        Узнай о том, как управлять своими деньгами, копить на мечты и сделать
        первые инвестиции без страха.{" "}
      </p>
      <Image
        src="/images/start page and modules page/Artem with cup.png"
        alt="Иллюстрация курса"
        width={320}
        height={296}
        className="relative z-10 h-auto select-none mx-auto mb-[16px]"
        priority
      />
      <Link href="/all-modules">
        <Button className="w-[225px]">Начать учиться</Button>
      </Link>
    </div>
  );
}
