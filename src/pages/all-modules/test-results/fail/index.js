import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { getTestUrlFromLessonUrl } from "@/utils/testUtils";

export default function Fail() {
  const router = useRouter();
  const [lessonUrl, setLessonUrl] = useState("/all-modules");
  const [testUrl, setTestUrl] = useState("/all-modules");

  useEffect(() => {
    const { from } = router.query;
    if (from) {
      setLessonUrl(from);
      setTestUrl(getTestUrlFromLessonUrl(from));
    }
  }, [router.query]);

  return (
    <div className="min-h-screen bg-[#DFB57F]">
      <div className="container text-center relative">
        {/* Крестик */}
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
        {/* Картинка */}
        <Image
          src="/images/test/fail.png"
          alt="Тест не пройден"
          width={320}
          height={320}
          className="relative z-10 select-none mx-auto mb-[0px]"
          priority
        />
        {/* Текст */}
        <h1 className="mb-[30px] text-black">
          Эх, тест не пройден.
          <br />
          Давай попробуем еще раз?
        </h1>
        {/* Кнопка */}
        <Link href={lessonUrl}>
          <Button
            className="w-[260px] text-[16px] text-[#283B41] font-semibold rounded-full"
            color="#F5ECDA"
          >
            Пройти урок еще раз
          </Button>
        </Link>
        {/* Ссылка пройти тест еще раз */}
        <Link href={testUrl}>
          <div className="mt-4 flex items-center justify-center gap-2 text-black cursor-pointer select-none">
            <Image
              src="/svgs/Reload.svg"
              alt="Обновить"
              width={18}
              height={18}
            />
            <span>Пройти тест еще раз</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
