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
