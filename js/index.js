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

// Customize fetch
// https://opentdb.com/api.php?amount=10&category=9&difficulty=medium
// const chooseDifficulty
// const chooseAmount
// const chooseCategory
const init = (e) => {
  const playBtn = document.querySelector(".playBtn"),
    catSelect = document.getElementById("selectCategory"),
    numSelect = document.getElementById("selectNumber"),
    selectDifficulty = document.getElementById("selectDifficulty"),
    catObject = {
      random: "random",
      generalknowledge: 9,
      books: 10,
      film: 11,
      music: 12,
      musicalsTheaters: 13,
      television: 14,
      videoGame: 15,
      boardGame: 16,
      scienceNature: 17,
      computers: 18,
      mathematics: 19,
      mythology: 20,
      sports: 21,
      geography: 22,
      history: 23,
      politics: 24,
      art: 25,
      celebrities: 26,
      animals: 27,
      vehicles: 28,
      comics: 29,
      gadgets: 30,
      japaneseanimemanga: 31,
      cartoonsanimations: 32,
    };

  playBtn.addEventListener("click", () => {
    // Insert form values in local storage to hand it over
    // to game.js fetch function
    // remove whitespace and '&'
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

    window.document.location = "/game.html";
  });
};
document.addEventListener("DOMContentLoaded", () => {
  init();
});
