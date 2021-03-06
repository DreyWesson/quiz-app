const username = document.getElementById("username"),
  saveScoreBtn = document.getElementById("saveScoreBtn"),
  difficulty = document.getElementById("difficulty"),
  category = document.getElementById("category"),
  percentageScore = document.getElementById("percentageScore"),
  progressBar = document.getElementById("progress-bar"),
  sweetMessage = document.getElementById("sweetMessage"),
  thumbsUp = document.querySelector(".thumbs-up"),
  finalScore = document.querySelector(".finalScore"),
  latestScore = localStorage.getItem("latestScore"),
  maxScore = localStorage.getItem("maxScore"),
  highScore = JSON.parse(localStorage.getItem("highScores")) || [],
  valueDelivery = JSON.parse(localStorage.getItem("formFetchValues")),
  MAX_HIGH_SCORES = 5,
  setDifficulty = valueDelivery.selectDifficulty,
  setCategory = valueDelivery.catSelect,
  setNumber = valueDelivery.numSelect,
  setPercentage = (latestScore / maxScore) * 100;

progressBar.style.width = `${setPercentage}%`;
percentageScore.innerText = `${setPercentage}%`;
progressBar.setAttribute("aria-valuenow", `${setPercentage}`);

if (maxScore == latestScore) {
  progressBar.classList.remove("bg-primary");
  resultMessage("You cracked it!!!", "fa-thumbs-up", "bg-success");
} else if (latestScore < 50) resultMessage("Do better", "fa-meh", "bg-danger");
else resultMessage("Nice Try!!!", "fa-smile", "bg-primary");

function resultMessage(innerText, fa, color, display = "d-none") {
  sweetMessage.innerText = `${innerText}`;
  thumbsUp.classList.remove(`${display}`);
  thumbsUp.classList.add(`${fa}`);
  progressBar.classList.add(`${color}`);
}
finalScore.innerText = latestScore;
category.innerText = setCategory;
difficulty.innerText = setDifficulty;

username.addEventListener("keyup", (e) => {
  // if value is falsy disable button
  saveScoreBtn.disabled = !username.value;
});
const saveHighScore = (e) => {
  e.preventDefault();
  const score = {
    score: latestScore,
    name: username.value,
  };
  highScore.push(score);
  highScore.sort((a, b) => b.score - a.score);
  highScore.splice(5);
  localStorage.setItem("highScores", JSON.stringify(highScore));
  const promptSaved = document.querySelector(".prompt");
  promptSaved.style.visibility = "visible";
  setTimeout(() => {
    window.location.assign("/");
  }, 700);
};
// const checkBlur = (e) => {
//   if (username.value.length > 0) saveHighScore(e);
// };
