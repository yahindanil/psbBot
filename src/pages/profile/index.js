import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { useUser } from "@/contexts/UserContext";
import { getUserProgress } from "@/utils/api";

export default function Profile() {
  const [userProgress, setUserProgress] = useState(null);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const [showCopyPopup, setShowCopyPopup] = useState(false);

  // Получаем данные пользователя из контекста
  const { telegramUser } = useUser();

  // Функция копирования ссылки
  const handleInviteFriends = async () => {
    const inviteLink = "https://t.me/junior_blago_bot";

    try {
      await navigator.clipboard.writeText(inviteLink);
      setShowCopyPopup(true);

      // Скрываем попап через 2 секунды
      setTimeout(() => {
        setShowCopyPopup(false);
      }, 2000);
    } catch (error) {
      console.error("Ошибка копирования:", error);
      // Fallback для старых браузеров
      const textArea = document.createElement("textarea");
      textArea.value = inviteLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      setShowCopyPopup(true);
      setTimeout(() => {
        setShowCopyPopup(false);
      }, 2000);
    }
  };

  // Загружаем прогресс пользователя
  useEffect(() => {
    const fetchUserProgress = async () => {
      if (!telegramUser?.id) return;

      try {
        setIsLoadingProgress(true);
        const progress = await getUserProgress(telegramUser.id);
        setUserProgress(progress);
      } catch (error) {
        console.error("[Profile] Ошибка загрузки прогресса:", error);
        setUserProgress({ stats: { completed_lessons: 0, total_lessons: 14 } });
      } finally {
        setIsLoadingProgress(false);
      }
    };

    fetchUserProgress();
  }, [telegramUser?.id]);

  // Вычисляем динамические значения
  const completedLessons = userProgress?.stats?.completed_lessons || 0;
  const totalLessons = userProgress?.stats?.total_lessons || 14;

  // Вычисляем среднее время прохождения уроков
  const averageTime = useMemo(() => {
    if (!userProgress?.modules || completedLessons === 0) {
      return { value: 0, text: "0" };
    }

    let totalTimeSeconds = 0;
    let completedCount = 0;

    userProgress.modules.forEach((module) => {
      if (module.lessons) {
        module.lessons.forEach((lesson) => {
          if (lesson.completed && lesson.time_spent_seconds) {
            totalTimeSeconds += lesson.time_spent_seconds;
            completedCount++;
          }
        });
      }
    });

    if (completedCount === 0) return { value: 0, text: "0" };

    const averageSeconds = totalTimeSeconds / completedCount;
    const averageMinutes = Math.round(averageSeconds / 60);

    // Правильные падежи для минут
    let minuteText;
    if (averageMinutes % 10 === 1 && averageMinutes % 100 !== 11) {
      minuteText = "минута";
    } else if (
      [2, 3, 4].includes(averageMinutes % 10) &&
      ![12, 13, 14].includes(averageMinutes % 100)
    ) {
      minuteText = "минуты";
    } else {
      minuteText = "минут";
    }

    return {
      value: averageMinutes,
      text: `${averageMinutes} ${minuteText}`,
    };
  }, [userProgress, completedLessons]);

  // Текст мотивации в зависимости от прогресса
  const motivationText = useMemo(() => {
    if (completedLessons === 0) {
      return "Нужно только начать!";
    } else if (completedLessons >= totalLessons) {
      return "Молодец! Отличная работа!";
    } else {
      return "Ты на верном пути — не сбавляй темп!";
    }
  }, [completedLessons, totalLessons]);

  // Имя пользователя
  const userName = telegramUser?.first_name || "Пользователь";
  if (isLoadingProgress) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 mb-2">Загружаем ваш профиль...</div>
          <div className="text-sm text-gray-400">
            Получаем данные о прогрессе
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Попап с уведомлением о копировании */}
      {showCopyPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-[15px] px-[30px] py-[20px] mx-[20px] text-center shadow-lg">
            <div className="text-[16px] font-semibold text-[#283B41] mb-[10px]">
              Ссылка скопирована!
            </div>
            <div className="text-[14px] text-[#666] mb-[15px]">
              Теперь вы можете поделиться ей с друзьями
            </div>
            <div className="text-[12px] text-[#749484] bg-[#F5ECDA] rounded-[8px] px-[10px] py-[5px]">
              https://t.me/junior_blago_bot
            </div>
          </div>
        </div>
      )}

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
            {userName}!
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
            <div className="text-[#283B41] text-[14px] font-normal text-center mb-[12px]">
              {motivationText}
            </div>
            <div className="border-b border-[#283B41] mb-[7px]"></div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-semibold text-[#283B41] leading-none">
                {completedLessons}/14
              </span>
              <div className="flex-1 flex justify-center">
                {/* Прогрессбар */}
                <div className="flex items-center justify-around border-[1px] px-[1px] border-[#283B41] rounded-[5px] w-[158px] h-[20px] bg-[#D8E2DE]">
                  {[...Array(14)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-[9px] h-[16px] rounded-[5px] ${
                        i < completedLessons ? "bg-[#749484]" : "bg-[#ACC0B1]"
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
          <div className="border border-[#ACC0B1] rounded-[15px] px-[13px] py-[10px] flex items-start w-full max-w-[400px] mx-auto bg-white mb-[15px] ">
            <Image
              src="/images/personal account/time.png"
              alt="Песочные часы"
              width={13.4}
              height={20.76}
              className="flex-shrink-0 mr-[10px]"
            />
            <div className="text-left">
              <div className="text-[#283B41] text-[14px] font-semibold">
                {averageTime.text}
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
              onClick={handleInviteFriends}
            >
              Пригласить друзей
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
