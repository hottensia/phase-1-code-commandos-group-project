const questions = [
  {
    question: "Who was Kenya's first president?",
    answers: [
      { text: "Daniel Moi", correct: false },
      { text: "Jomo Kenyatta", correct: true },
      { text: "Mwai Kibaki", correct: false },
      { text: "Uhuru Kenyatta", correct: false },
    ],
  },
  {
    question: "Who was Uganda's first president?",
    answers: [
      { text: "Daniel Moi", correct: false },
      { text: "Jomo Kenyatta", correct: false },
      { text: "Mwai Kibaki", correct: true },
      { text: "Uhuru Kenyatta", correct: false },
    ],
  },
  {
    question: "Who was Tanzania's first president?",
    answers: [
      { text: "Daniel Moi", correct: false },
      { text: "Jomo Kenyatta", correct: false },
      { text: "Mwai Kibaki", correct: false },
      { text: "Uhuru Kenyatta", correct: true },
    ],
  },
  {
    question: "Who was Somalia's first president?",
    answers: [
      { text: "Daniel Moi", correct: false },
      { text: "Jomo Kenyatta", correct: true },
      { text: "Mwai Kibaki", correct: false },
      { text: "Uhuru Kenyatta", correct: false },
    ],
  },
  {
    question: "Who was Rwanda's first president?",
    answers: [
      { text: "Daniel Moi", correct: false },
      { text: "Jomo Kenyatta", correct: true },
      { text: "Mwai Kibaki", correct: false },
      { text: "Uhuru Kenyatta", correct: false },
    ],
  },
  {
    question: "Who was Djibouti's first president?",
    answers: [
      { text: "Daniel Moi", correct: false },
      { text: "Jomo Kenyatta", correct: true },
      { text: "Mwai Kibaki", correct: false },
      { text: "Uhuru Kenyatta", correct: false },
    ],
  },
  {
    question: "Who was Sudan's first president?",
    answers: [
      { text: "Daniel Moi", correct: false },
      { text: "Jomo Kenyatta", correct: true },
      { text: "Mwai Kibaki", correct: false },
      { text: "Uhuru Kenyatta", correct: false },
    ],
  },
  {
    question: "Who was Ethiopia's first president?",
    answers: [
      { text: "Daniel Moi", correct: false },
      { text: "Jomo Kenyatta", correct: true },
      { text: "Mwai Kibaki", correct: false },
      { text: "Uhuru Kenyatta", correct: false },
    ],
  },
  {
    question: "Who was Eritrea's first president?",
    answers: [
      { text: "Daniel Moi", correct: false },
      { text: "Jomo Kenyatta", correct: true },
      { text: "Mwai Kibaki", correct: false },
      { text: "Uhuru Kenyatta", correct: false },
    ],
  },
  {
    question: "Who was Malawi's first president?",
    answers: [
      { text: "Daniel Moi", correct: false },
      { text: "Jomo Kenyatta", correct: true },
      { text: "Mwai Kibaki", correct: false },
      { text: "Uhuru Kenyatta", correct: false },
    ],
  },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerbuttons");
const nextButton = document.getElementById("nextbtn");

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
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
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
