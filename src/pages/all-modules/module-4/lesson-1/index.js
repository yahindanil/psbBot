import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import LessonNavButtons from "@/components/ui/LessonNavButtons";
import TestBlock from "@/components/ui/TestBlock";

const lessonPages = [
  {
    type: "start",
    content: (
      <>
        <h1 className="text-center text-[24px] font-semibold mb-[24px]">
          Как начать <br />
          инвестировать <br />
          <span className="bg-[#E9CDA7]">самостоятельно</span>
        </h1>
        <div className="mb-[11px]">
          <Image
            src="/images/lesson 11/main (11).png"
            alt="Lesson image"
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
          <p className="text-[16px] mb-[30px]">
            Ты не можешь просто прийти в компанию и купить у нее акцию или
            облигацию, как мороженое в магазине.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">1/10</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Чтобы покупать активы, нужен специальный счет. Его открывают у брокера
          — посредника между тобой и рынком ценных бумаг.
        </p>
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
            Что такое брокерский <br />
            счет и зачем он нужен
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">2/10</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Брокерский счет — это твой личный кабинет на фондовом рынке. На нем
          можно хранить деньги, покупать и продавать ценные бумаги.
        </p>
        <p className="text-[16px] mb-[30px]">
          Без брокерского счета купить или продать ценные бумаги нельзя. Это как
          аккаунт в онлайн-игре: без него ты не попадешь на сервер и не сможешь
          играть.
        </p>
      </>
    ),
    bg: "bg-white text-black",
  },
  {
    type: "lesson",
    content: (
      <>
        <div className="flex justify-between items-start mb-[15px]">
          <p className="text-[16px] mb-[30px]">
            Через брокерский счет ты получаешь доступ к бирже.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">3/10</div>
        </div>
        <p className="text-[16px] mb-[30px]">
          Это онлайн-площадка, где встречаются продавцы и покупатели ценных
          бумаг. Как маркетплейс, только вместо вещей — инвестиционные
          инструменты.
        </p>
        <div className="flex justify-center">
          <Image
            src="/images/lesson 11/1.png"
            alt="Lesson image"
            width={285}
            height={238}
            loading="eager"
          />
        </div>
      </>
    ),
    bg: "bg-white text-black",
  },
  {
    type: "lesson",
    content: (
      <>
        <div className="flex justify-between items-start mb-[15px]">
          <h2>
            Где открывают <br />
            брокерские счета <br />
            и кто может <br />
            это сделать
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">4/10</div>
        </div>
        <p className="text-[16px] mb-[18px]">
          Брокерский счет открывают через брокера — это финансовая компания,
          которая дает доступ к инвестициям.
        </p>
        <p className="text-[16px] mb-[18px]">
          Ее работу регулирует Центральный банк РФ. Он следит, чтобы такие
          компании соблюдали правила и честно работали с деньгами клиентов.
        </p>
        <p className="text-[16px]">
          Проверить, настоящий ли брокер, можно на сайте Банка России. Просто
          введи название в поиске и посмотри, есть ли у компании лицензия на
          оказание брокерских услуг.
        </p>
      </>
    ),
    bg: "bg-white text-black",
  },
  {
    type: "lesson",
    content: (
      <>
        <div className="flex justify-between items-start mb-[15px]">
          <p className="text-[16px] mb-[30px]">
            Счет для инвестиций открывают через мобильное приложение, на сайте
            или в офисе брокера. Это можно сделать только с 18 лет. Но уже
            сейчас ты можешь разобраться, как все устроено, и даже накопить
            небольшую сумму, чтобы попробовать инвестировать в будущем.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">5/10</div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/lesson 11/2.png"
            alt="Lesson image"
            width={285}
            height={238}
            loading="eager"
          />
        </div>
      </>
    ),
    bg: "bg-white text-black",
  },
  {
    type: "lesson",
    content: (
      <>
        <div className="flex justify-between items-start mb-[15px]">
          <h2>
            Что можно купить <br />
            через брокерский <br />
            счет
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">6/10</div>
        </div>
        <p className="text-[16px] mb-[18px]">
          С открытием брокерского счета ты получаешь доступ к разным
          инвестиционным инструментам.
        </p>
        <p className="text-[16px] mb-[18px]">
          Для новичков доступны самые базовые инструменты: акции, облигации,
          валюта, паи ПИФов.
        </p>
        <p className="text-[16px]">
          То, с чем несложно разобраться с нуля самостоятельно.
        </p>
      </>
    ),
    bg: "bg-white text-black",
  },
  {
    type: "lesson",
    content: (
      <>
        <div className="flex justify-between items-start mb-[15px]">
          <p className="text-[16px] mb-[30px]">
            Более сложные и рискованные инструменты брокеры открывают только для
            опытных инвесторов, которые сдали тесты или получили специальный
            статус.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">7/10</div>
        </div>
        <p className="text-[16px] mb-[18px]">
          <span className="font-semibold">Как в школе:</span> сначала ты учишься
          читать и писать, а со временем переходишь к более сложным предметам,
          например к физике и химии.
        </p>
        <div className="flex justify-center">
          <Image
            src="/images/lesson 11/3.png"
            alt="Lesson image"
            width={285}
            height={238}
            loading="eager"
          />
        </div>
      </>
    ),
    bg: "bg-white text-black",
  },
  {
    type: "lesson",
    content: (
      <>
        <div className="flex justify-between items-start mb-[15px]">
          <h2>
            Как покупают <br />и продают активы
          </h2>
          <div className="text-[10px] text-[#D8E2DE]">8/10</div>
        </div>
        <p className="text-[16px] mb-[18px]">
          Купить актив не сложнее, чем кроссовки на маркетплейсе. Заходишь в
          приложение брокера, выбираешь, что хочешь купить, смотришь
          характеристики, указываешь количество и нажимаешь «Купить». Если все
          прошло, то у тебя в портфеле новые активы.
        </p>
        <div className="flex justify-center">
          <Image
            src="/images/lesson 11/4.png"
            alt="Lesson image"
            width={285}
            height={238}
            loading="eager"
          />
        </div>
      </>
    ),
    bg: "bg-white text-black",
  },
  {
    type: "lesson",
    content: (
      <>
        <div className="flex justify-between items-start mb-[15px]">
          <p className="text-[16px] mb-[30px]">
            Если потом захочешь продать актив, процесс будет таким же: выбираешь
            его в списке своих ценных бумаг, затем нажимаешь «Продать» и
            подтверждаешь сделку.
          </p>
          <div className="text-[10px] text-[#D8E2DE]">9/10</div>
        </div>
        <p className="text-[16px]">
          Отличие от обычных покупок только в том, что здесь ты покупаешь не
          вещь, а инвестиционный инструмент, который потенциально может принести
          доход.
        </p>
      </>
    ),
    bg: "bg-white text-black",
  },
  {
    type: "lesson",
    content: (
      <>
        <div className="flex justify-between items-start mb-[15px]">
          <div></div>
          <div className="text-[10px] text-[#D8E2DE]">10/10</div>
        </div>
        <div className="flex justify-center mt-[20px]">
          <Image
            src="/images/lesson 11/5.png"
            alt="Lesson image"
            width={191}
            height={232}
            loading="eager"
          />
        </div>
        <h2 className="text-center text-white text-[22px] font-semibold mb-[16px]">
          Коротко о главном
        </h2>
        <p className="text-center text-white text-[16px] mb-[16px]">
          Брокерский счет нужен, <br />
          <span className="bg-[#DFB57F]">чтобы начать и продолжать</span> <br />
          инвестиционную деятельность. Через <br />
          брокера можно выбрать отдельные <br />
          активы или вложиться сразу в <br />
          готовый набор — в ПИФы.
        </p>
        <p className="text-center text-white text-[16px]">
          А если захочешь полностью <br />
          передать управление капиталом <br />
          специалистам, есть доверительное <br />
          управление.
        </p>
      </>
    ),
    bg: "bg-[#749484]",
  },
  {
    type: "lesson",
    content: <TestBlock testUrl="/all-modules/module-4/lesson-1/test" />,
    bg: "bg-[#DFB57F]",
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
      {/* Preload all images */}
      <div style={{ display: "none" }}>
        <Image
          src="/images/lesson 11/main (11).png"
          alt=""
          width={501.45}
          height={398}
          priority
        />
        <Image
          src="/images/lesson 11/1.png"
          alt=""
          width={285}
          height={238}
          priority
        />
        <Image
          src="/images/lesson 11/2.png"
          alt=""
          width={285}
          height={238}
          priority
        />
        <Image
          src="/images/lesson 11/3.png"
          alt=""
          width={285}
          height={238}
          priority
        />
        <Image
          src="/images/lesson 11/4.png"
          alt=""
          width={285}
          height={238}
          priority
        />
        <Image
          src="/images/lesson 11/5.png"
          alt=""
          width={191}
          height={232}
          priority
        />
        <Image
          src="/svgs/Arrow left.svg"
          alt=""
          width={5.5}
          height={8}
          priority
        />
      </div>

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
          Урок 11
        </div>
      </header>

      {/* Start page */}
      {page === 0 && (
        <div className="lesson-start-page mt-[10px]">
          {lessonPages[0].content}
          <div className="flex justify-center mb-[40px]">
            <Button className="w-[225px]" onClick={handleStart}>
              Начать урок
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
