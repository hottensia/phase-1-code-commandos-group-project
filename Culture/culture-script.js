const questions = [
  {
    question: "Which are the two official languages of Kenya?",
    answers: [
      { text: "Swahili and Kikuyu", correct: false },
      { text: "Luo and Kamba", correct: false },
      { text: "Kamba and English", correct: false },
      { text: "Swahili and English", correct: true },
    ],
  },
  {
    question: "What is a matatu?",
    answers: [
      { text: "A tribal spear", correct: false },
      { text: "A camera", correct: false },
      { text: "A goat", correct: false },
      { text: "A minibus", correct: true },
    ],
  },
  {
    question: "Lake Nam Lolwe, also known as Lake Victoria, is a popular fishing spot for the Luo community. What is the meaning of 'Lake Nam Lolwe'?",
    answers: [
      { text: "Endless Lake", correct: true },
      { text: "Rich Lake", correct: false },
      { text: "Diverse Lake", correct: false },
      { text: "Popular Lake", correct: false },
    ],
  },
  {
    question: "One of the staple foods of Kenya is ugali na sukuma wiki. What is it?",
    answers: [
      { text: "Goats, cheese with bread", correct: false },
      { text: "Couscous", correct: false },
      { text: "Maize meal (pap) with vegetables", correct: true },
      { text: "Curried lamb", correct: false },
    ],
  },
  {
    question: "Which is the most popular religion practised in Kenya?",
    answers: [
      { text: "Indigenous", correct: false },
      { text: "Christianity", correct: true },
      { text: "Islam", correct: false },
      { text: "Hindu", correct: false },
    ],
  },
  {
    question: "Which Kenyan tribe is famous for dancing on stilts performed by men wearing long black coats and white masks?",
    answers: [
      { text: "Turkana", correct: false },
      { text: "Kikuyu", correct: false },
      { text: "Embu", correct: true },
      { text: "Maasai", correct: false },
    ],
  },
  {
    question: "When is the best time of the year to visit the Maasai Mara National Reserve?",
    answers: [
      { text: "September and October", correct: false },
      { text: "January and February", correct: false },
      { text: "July and August", correct: true },
      { text: "November and May", correct: false },
    ],
  },
  {
    question: "Both sexes of the Maasai community wear earrings. True or False?",
    answers: [
      { text: "False", correct: false },
      { text: "True", correct: true },
      // { text: "1952", correct: false },
      // { text: "1960", correct: false },
    ],
  },
  {
    question: "What is siwa?",
    answers: [
      { text: "A wind instrument", correct: true },
      { text: "A seafood dish", correct: false },
      { text: "A rowboat", correct: false },
      { text: "A pink flower", correct: false },
    ],
  },
  {
    question: "Which of the following Kalenjin sub-tribes has the highest population?",
    answers: [
      { text: "Pokot", correct: false },
      { text: "Nandi", correct: false },
      { text: "Kipsigis", correct: true },
      { text: "Tugen", correct: false },
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
