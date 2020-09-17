const username = document.getElementById("username"),
  saveScoreBtn = document.getElementById("saveScoreBtn"),
  finalScore = document.querySelector(".finalScore"),
  latestScore = localStorage.getItem("latestScore"),
  highScores = JSON.parse(localStorage.getItem("highScores")) || [],
  MAX_HIGH_SCORES = 5;
finalScore.innerText = latestScore;

username.addEventListener("keyup", (e) => {
  // if value is falsy disable button
  saveScoreBtn.disabled = !username.value;
});
const saveHighScore = (e) => {
  e.preventDefault();
  const score = {
    score: Math.floor(Math.random() * 100),
    // score: latestScore,
    name: username.value,
  };
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("/");
  console.log(highScores);
};
