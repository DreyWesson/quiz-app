const valueDelivery = JSON.parse(localStorage.getItem("formFetchValues")),
  catObject = {
    random: "random",
    generalknowledge: 9,
    books: 10,
    film: 11,
    music: 12,
    musicalstheaters: 13,
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
  },
  loader = document.getElementById("loader"),
  game = document.getElementById("game"),
  setDifficulty = valueDelivery.selectDifficulty,
  setCategory = valueDelivery.catSelect,
  setNumber = valueDelivery.numSelect,
  getCatValue = catObject[setCategory],
  choices = [...document.querySelectorAll(".choice-text")],
  question = document.getElementById("question"),
  CORRECT_BONUS = 10,
  MAX_QUESTION = setNumber,
  questionCounterText = document.getElementById("questionCounter"),
  scoreText = document.getElementById("score"),
  difficulty = document.querySelector(".difficulty"),
  category = document.querySelector(".category");

let currentQuestion = {},
  acceptingAnswers = false,
  score = 0,
  questionCounter = 0,
  availableQuestions = [],
  questions = [],
  progressBar = document.querySelector(".progress-bar");

// Customize fetch request
const init = (e) => {
  // Use different API for random settings
  // https://opentdb.com/api.php?amount=10&category=24&type=multiple
  function screenForRandom() {
    if (catObject[setCategory] !== "random" && setDifficulty !== "random") {
      console.log("We both not random");
      return `https://opentdb.com/api.php?amount=${setNumber}&category=${getCatValue}&difficulty=${setDifficulty}&type=multiple`;
    } else if (
      catObject[setCategory] == "random" ||
      setDifficulty == "random"
    ) {
      if (catObject[setCategory] == "random" && setDifficulty == "random") {
        console.log("We both random");
        return `https://opentdb.com/api.php?amount=${setNumber}&type=multiple`;
      } else if (
        catObject[setCategory] == "random" &&
        setDifficulty != "random"
      ) {
        console.log("cat is random");
        return `https://opentdb.com/api.php?amount=${setNumber}&difficulty=${setDifficulty}&type=multiple`;
      } else if (
        catObject[setCategory] != "random" &&
        setDifficulty == "random"
      ) {
        console.log("diff is random");
        return `https://opentdb.com/api.php?amount=${setNumber}&category=${getCatValue}&type=multiple`;
      }
    }
  }
  // console.log(screenForRandom());
  // const screenOutRandom =
  //   catObject[setCategory] == "random" || setDifficulty == "random"
  //     ? `https://opentdb.com/api.php?amount=${setNumber}&type=multiple`
  //     : `https://opentdb.com/api.php?amount=${setNumber}&category=${getCatValue}&difficulty=${setDifficulty}&type=multiple`;
  // console.log(screenOutRandom);
  // Populate questions  with Questions from API
  fetch(screenForRandom())
    .then((res) => res.json())
    .then((loadedQuestions) => {
      console.log(loadedQuestions.results);
      questions = loadedQuestions.results.map((loadedQuestion) => {
        const formattedQuestion = {
            question: loadedQuestion.question,
            difficulty: loadedQuestion.difficulty,
            category: loadedQuestion.category,
          },
          answerChoices = [...loadedQuestion.incorrect_answers];
        // changed number from 3 to 4, cos that seem to utilize the whole choices slot for correct answer
        formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
        answerChoices.splice(
          formattedQuestion.answer - 1,
          0,
          loadedQuestion.correct_answer
        );
        answerChoices.forEach(
          (choice, index) =>
            (formattedQuestion["choice" + (index + 1)] = choice)
        );
        return formattedQuestion;
      });
      startGame();
    })
    .catch((err) => console.error(err));
};
let startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  // UX for our loader
  game.classList.remove("d-none");
  quitBtn.classList.remove("d-none");
  loader.classList.add("d-none");
};

let getNewQuestion = () => {
  if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTION) {
    // make our app persistent by storing in localstorage
    localStorage.setItem("latestScore", score);
    // Go to homepage
    return window.location.assign("./end.html");
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTION}`;
  // Get the % score in 2 decimal places
  let percentageScore = (questionCounter / MAX_QUESTION) * 100;
  percentageScore =
    percentageScore == 100
      ? `${percentageScore.toFixed(0)}%`
      : `${percentageScore.toFixed(2)}%`;
  // Update progress bar
  progressBar.style.width = percentageScore;
  progressBar.innerText = percentageScore;
  // Slot in a random question, difficulty level & category
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;
  difficulty.innerText = currentQuestion.difficulty;
  category.innerText = currentQuestion.category;

  // Slot in the multiple choices from our question object
  choices.map((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion[`choice${number}`];
  });

  // Remove engaged question
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    // Get selected answer
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    // Check for correctness and style accordingly
    const checkCorrectness =
      selectedAnswer == currentQuestion.answer
        ? "alert-success"
        : "alert-danger";
    // Increment Scoreboard
    checkCorrectness == "alert-success" ? incrementScore(CORRECT_BONUS) : null;
    selectedChoice.parentElement.classList.add(checkCorrectness);

    //using the dataset to track the element carrying d
    //  correct answer in our choices and change its color
    const dataNumber = choices[currentQuestion.answer - 1];
    if (checkCorrectness == "alert-danger")
      dataNumber.classList.add("alert-success");

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(checkCorrectness);
      dataNumber.classList.remove("alert-success");
      getNewQuestion();
    }, 1000);
  });
});
const incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
const maxScore = CORRECT_BONUS * MAX_QUESTION;
localStorage.setItem("maxScore", maxScore);
const quitBtn = document.querySelector(".quit");
quitBtn.addEventListener("click", (e) => {
  availableQuestions = [];
  getNewQuestion();
});
document.addEventListener("DOMContentLoaded", () => init());
