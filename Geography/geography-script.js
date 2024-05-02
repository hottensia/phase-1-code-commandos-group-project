const questions = [
  {
    question:
      "What landscape do you expect to find in Nyeri?",
    answers: [
      { text: "Jagged mountains", correct: false },
      { text: "Highlands", correct: true },
      { text: "Oceanic coast", correct: false },
      { text: "Basalt canyons", correct: false },
    ],
  },
  {
    question:
      "Shortly northeast of Kenya's former Central Province, Mount Kenya is the second-largest mountain in Africa. Is it also the second-largest mountain in Kenya?",
    answers: [
      { text: "True", correct: false },
      { text: "False", correct: true },
      // { text: "Uhuru Kenyatta", correct: false },
      // { text: "Mwai Kibaki", correct: false },
    ],
  },
  {
    question:
      "If you head to Mombasa, a beach city in the country's southeastern coast, you can visit the shores of which ocean?",
    answers: [
      { text: "Indian Ocean", correct: true },
      { text: "Pacific Ocean", correct: false },
      { text: "Atlantic Ocean", correct: false },
      { text: "Southern Ocean", correct: false },
    ],
  },
  {
    question:
      "Mandera is found in the northeastern-most corner of Kenya. Within ten miles you can visit Somalia or which other nearby country?",
    answers: [
      { text: "Uganda", correct: false },
      { text: "Tanzania", correct: false },
      { text: "South Sudan", correct: false },
      { text: "Ethiopia", correct: true },
    ],
  },
  {
    question:
      "The largest desert lake in the world can be found in the Rift Valley of Kenya. What is its name?",
    answers: [
      { text: "Lake Victoria", correct: false },
      { text: "Lake Nakuru", correct: false },
      { text: "Lake Elementaita", correct: false },
      { text: "Lake Turkana", correct: true },
    ],
  },
  {
    question:
      "Stretching from northwest to the southern border of Kenya is which of these notable landforms characterized by active volcanos and soda lakes?",
    answers: [
      { text: "Rift Valley", correct: true },
      { text: "Arid Deserts", correct: false },
      { text: "Basalt Canyons", correct: false },
      { text: "Equatorial Rainforests", correct: false },
    ],
  },
  {
    question:
      "If you're taking a tour of Kenya, you absolutely can't visit the peak known as Wagagai?",
    answers: [
      { text: "True", correct: false },
      { text: "False", correct: true },
      // { text: "Ratemo Michieka", correct: false },
      // { text: "Steve Tikolo", correct: false },
    ],
  },
  {
    question:
      "Goliath beetles, centipedes, tree pangolin and bushbucks are all found in what West Kenyan ecosystem?",
    answers: [
      { text: "Witu Forest", correct: false },
      { text: "Lake Victoria", correct: false },
      { text: "Kakamega Forest", correct: true },
      { text: "Samburu National Reserve", correct: false },
    ],
  },
  {
    question:
      "What National Reserve in Southwest Kenya is home to Africa's big five and was named after one of the country's most prominent tribes?",
    answers: [
      { text: "Serengeti", correct: false },
      { text: "Maasai Mara", correct: true },
      { text: "Amboseli", correct: false },
      { text: "Tsavo", correct: false },
    ],
  },
  {
    question:
      "Nairobi, the capital city of Kenya, translates to 'cool waters' in which language?",
    answers: [
      { text: "Maasai", correct: true },
      { text: "Ndonde", correct: false },
      { text: "Kerewe", correct: false },
      { text: "Bungu", correct: false },
    ],
  },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerbuttons");
const nextButton = document.getElementById("nextbtn");
const categoryBtn = document.getElementById("category");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  categoryBtn.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  if (score >= 10) {
    questionElement.innerHTML = `Congratulations!  You scored ${score} out of ${questions.length}!  You aced it!`;
  } else if (score >= 7) {
    questionElement.innerHTML = `Good work!  You scored ${score} out of ${questions.length}!  You got most of them right.`;
  } else if (score >= 4) {
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!  Play again to improve your score.`;
  } else {
    questionElement.innerHTML = `Bad day in the office? You scored ${score} out of ${questions.length}!`;
  }
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  categoryBtn.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
