import Router from "next/router";

export function checkTestAndRedirect({
  correctAnswers,
  userAnswers,
  lessonUrl,
  router,
}) {
  const isSuccess = correctAnswers.every(
    (ans, idx) => ans === userAnswers[idx]
  );
  const resultPage = isSuccess
    ? "/all-modules/test-results/success"
    : "/all-modules/test-results/fail";
  router.push({
    pathname: resultPage,
    query: { from: lessonUrl },
  });
}
