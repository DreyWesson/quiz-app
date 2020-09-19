const username = document.getElementById("username"),
  saveScoreBtn = document.getElementById("saveScoreBtn"),
  difficulty = document.getElementById("difficulty"),
  category = document.getElementById("category"),
  percentageScore = document.getElementById("percentageScore"),
  progressBar = document.getElementById("progress-bar"),
  finalScore = document.querySelector(".finalScore"),
  latestScore = localStorage.getItem("latestScore"),
  maxScore = localStorage.getItem("maxScore"),
  highScores = JSON.parse(localStorage.getItem("highScores")) || [],
  MAX_HIGH_SCORES = 5,
  valueDelivery = JSON.parse(localStorage.getItem("formFetchValues")),
  setDifficulty = valueDelivery.selectDifficulty,
  setCategory = valueDelivery.catSelect,
  setNumber = valueDelivery.numSelect,
  setPercentage = (latestScore / maxScore) * 100;

progressBar.style.width = `${setPercentage}%`;
percentageScore.innerText = `${setPercentage}%`;
progressBar.setAttribute("aria-valuenow", `${setPercentage}`);

if (maxScore == latestScore) {
  // sweetMessage.innerText = "You Cracked it!!!";
  progressBar.classList.remove("bg-primary");
  progressBar.classList.add("bg-success");
} else if (latestScore > 50 && latestScore < maxScore)
  progressBar.classList.add("bg-primary");
else if (latestScore < 50) progressBar.classList.add("bg-danger");

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
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("/");
};
