const highScoreSection = document.querySelector(".high-scores-section");
const highScoreList = document.querySelector("#high-scores-list");
const highScoreBtn = document.querySelector(".high-score-btn");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoreBtn.addEventListener("click", () => {
  highScoreSection.classList.toggle("d-none");
});

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
