const highScoreSection = document.querySelector(".high-scores-section"),
  highScoreList = document.querySelector("#high-scores-list"),
  highScoreBtn = document.querySelector(".high-score-btn"),
  highScores = JSON.parse(localStorage.getItem("highScores")) || [],
  emptyHighScore = document.querySelector(".emptyHighScore");

let height = highScoreSection.clientHeight,
  width = highScoreSection.clientWidth;

// Ckeck if localStorage has no highscores
if (localStorage.getItem("highScores") === null)
  emptyHighScore.classList.remove("d-none");

if (screen.width > 750) {
  // Initial visibility settings
  visibility("30", "30", "0", "hidden");
  highScoreBtn.addEventListener("click", function () {
    if (highScoreSection.style.visibility == "hidden")
      visibility("100", "100", "1", "visible");
    else visibility("20", "20", "0", "hidden");
  });
} else {
  // Initial visibility settings
  visibility("60", "60", "0", "hidden");
  highScoreBtn.addEventListener("click", function () {
    if (highScoreSection.style.visibility == "hidden")
      visibility("100", "100", "1", "visible");
    else visibility("70", "70", "0", "hidden");
  });
}

function visibility(height, width, opacity, visibility) {
  highScoreSection.style.height = `${height}%`;
  highScoreSection.style.width = `${width}%`;
  highScoreSection.style.opacity = `${opacity}`;
  highScoreSection.style.visibility = `${visibility}`;
}

let increment = 0;
highScoreList.innerHTML = highScores
  .map((score) => {
    increment++;
    return `<tr>
    <th scope="row" class='h4'>${increment}</th>
    <td class='h4'>${score.name}</td>
    <td class='h4'>${score.score}</td>
  </tr>`;
  })
  .join("");
