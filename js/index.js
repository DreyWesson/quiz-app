const highScoreSection = document.querySelector(".high-scores-section");
const highScoreList = document.querySelector("#high-scores-list");
const highScoreBtn = document.querySelector(".high-score-btn");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// highScoreBtn.addEventListener("click", () => {
//   highScoreSection.classList.toggle("d-none");
// });
var height = highScoreSection.clientHeight;
var width = highScoreSection.clientWidth;

// initialize them (within highScoreSection.style)

if (screen.width > 750) {
  highScoreSection.style.height = "30%";
  highScoreSection.style.width = "30%";
  highScoreSection.style.opacity = "0";

  highScoreBtn.addEventListener("click", function () {
    if (highScoreSection.style.visibility == "hidden") {
      highScoreSection.style.visibility = "visible";
      highScoreSection.style.opacity = "1";
      highScoreSection.style.height = "100%";
      highScoreSection.style.width = "100%";
    } else {
      highScoreSection.style.visibility = "hidden";
      highScoreSection.style.opacity = "0";
      highScoreSection.style.height = "0";
      highScoreSection.style.width = "20%";
    }
  });
} else {
  highScoreSection.style.height = "60%";
  highScoreSection.style.width = "60%";
  highScoreSection.style.opacity = "0";

  highScoreBtn.addEventListener("click", function () {
    if (highScoreSection.style.visibility == "hidden") {
      highScoreSection.style.visibility = "visible";
      highScoreSection.style.opacity = "1";
      highScoreSection.style.height = "100%";
      highScoreSection.style.width = "100%";
    } else {
      highScoreSection.style.visibility = "hidden";
      highScoreSection.style.opacity = "0";
      highScoreSection.style.height = "0";
      highScoreSection.style.width = "70%";
    }
  });
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

// Customize fetch
const init = (e) => {
  const playBtn = document.querySelector(".playBtn"),
    catSelect = document.getElementById("selectCategory"),
    numSelect = document.getElementById("selectNumber"),
    selectDifficulty = document.getElementById("selectDifficulty");

  playBtn.addEventListener("click", () => {
    // Insert form values in local storage to hand it over
    // to game.js fetch function and remove whitespace and '&'
    const formatCategoryString = catSelect.value
      .toLowerCase()
      .replace(/&/g, "")
      .split(" ")
      .join("");

    localStorage.setItem(
      "formFetchValues",
      JSON.stringify({
        catSelect: `${formatCategoryString}`,
        selectDifficulty: `${selectDifficulty.value.toLowerCase()}`,
        numSelect: `${numSelect.value}`,
      })
    );
    window.document.location = "../views/game.html";
  });
};
document.addEventListener("DOMContentLoaded", () => init());
