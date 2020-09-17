const choices = [...document.querySelectorAll(".choice-text")],
  question = document.getElementById("question"),
  CORRECT_BONUS = 10,
  MAX_QUESTION = 3,
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

// Customize fetch

// Populate questions  with Questions from API
fetch("https://opentdb.com/api.php?amount=10&type=multiple")
  .then((res) => res.json())
  .then((loadedQuestions) => {
    questions = loadedQuestions.results.map((loadedQuestion) => {
      const formattedQuestion = {
        question: loadedQuestion.question,
        difficulty: loadedQuestion.difficulty,
        category: loadedQuestion.category,
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];

      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );
      answerChoices.forEach(
        (choice, index) => (formattedQuestion["choice" + (index + 1)] = choice)
      );
      return formattedQuestion;
    });
    startGame();
  })
  .catch((err) => {
    console.error(err);
  });
let startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
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

  // Slot in the multiple choices
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
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(checkCorrectness);
      getNewQuestion();
    }, 1000);
  });
});
const incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
