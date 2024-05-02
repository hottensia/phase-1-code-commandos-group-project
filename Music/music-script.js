const questions = [
  {
    question: "Daima mimi Mkenya, mwananchi mzalendo...?",
    answers: [
      { text: "E-Sir", correct: false },
      { text: "Eric Wainaina", correct: true },
      { text: "Nameless", correct: false },
      { text: "Suzanna Owiyo", correct: false },
    ],
  },
  {
    question: "How often is Blankets & Wine held?",
    answers: [
      { text: "Every two months", correct: false },
      { text: "Every six months", correct: false },
      { text: "Every four months", correct: false },
      { text: "Every three months", correct: true },
    ],
  },
  {
    question: "Which of these are Kenyan music genres?",
    answers: [
      { text: "Arbantone", correct: false },
      { text: "Gengetone", correct: false },
      { text: "Kapuka", correct: false },
      { text: "All the above", correct: true },
    ],
  },
  {
    question: "Who amongst the following was not an original member of the Calif records label?",
    answers: [
      { text: "Nonini", correct: false },
      { text: "Juacali", correct: false },
      { text: "Prezzo", correct: true },
      { text: "'Clemo' Rapudo", correct: false },
    ],
  },
  {
    question: "Who amongst the following was not an owner of the popular Ogopa deejays label?",
    answers: [
      { text: "Francis Bikedo", correct: false },
      { text: "Lucas Bikedo", correct: false },
      { text: "E-Sir", correct: true },
      { text: "Banda", correct: false },
    ],
  },
  {
    question: "The late E-Sir popularly know for his hit song 'Moss Moss' hailed from which estate in Nairobi?",
    answers: [
      { text: "South B", correct: false },
      { text: "South C", correct: true },
      { text: "California", correct: false },
      { text: "Nairobi West", correct: false },
    ],
  },
  {
    question: "Genge music is a genre of hip hop music with influences from dancehall and originating from Nairobi. Who coined the term 'Genge'?",
    answers: [
      { text: "Producer Clemo", correct: true },
      { text: "Nonini", correct: false },
      { text: "Juacali", correct: false },
      { text: "Wahu", correct: false },
    ],
  },
  {
    question: "Which of the following record labels started the 'Kapuka' beat, a form of hip hop music popular in Kenya?",
    answers: [
      { text: "Calif Records", correct: false },
      { text: "Ogopa Deejays", correct: true },
      { text: "Boomba Clan", correct: false },
      { text: "System Unit Deejays", correct: false },
    ],
  },
  {
    question: "Who amongst the following was not in Calif records?",
    answers: [
      { text: "Nonini", correct: false },
      { text: "Jua Cali", correct: false },
      { text: "Nameless", correct: true },
      { text: "K-Rupt", correct: false },
    ],
  },
  {
    question: "The Kenyan national anthem was adapted from a lullaby associated with which community?",
    answers: [
      { text: "Sabaot", correct: false },
      { text: "Tugen", correct: false },
      { text: "Pokomo", correct: true },
      { text: "Gumba", correct: false },
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
