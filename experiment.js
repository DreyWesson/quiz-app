const catObject = {
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
  japaneseAnimeManga: 31,
  cartoonsAnimations: 32,
};
const formatCategoryString = "music"
  .toLowerCase()
  .replace(/&/g, "")
  .split(" ")
  .join("");
console.log(formatCategoryString);
const matchCategories = () => {
  Object.entries(catObject).forEach((category) => {
    const [key, value] = category;
    if (key == formatCategoryString) {
      console.log(value);
    }
  });
};
matchCategories();
