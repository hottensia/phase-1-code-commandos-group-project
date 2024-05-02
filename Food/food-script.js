const questions = [
  {
    question: "What is the staple food of the Kenyan people?",
    answers: [
      { text: "Wheat", correct: false },
      { text: "Sorghum", correct: false },
      { text: "Maize", correct: true },
      { text: "Millet", correct: false },
    ],
  },
  {
    question: "Ugali is popularly made using?",
    answers: [
      { text: "Rice flour", correct: false },
      { text: "Maize flour", correct: true },
      { text: "Wheat flour", correct: false },
      { text: "Rice flour", correct: false },
    ],
  },
  {
    question: "Mursik is a popular Kalenjin drink. What is it?",
    answers: [
      { text: "Traditional juice", correct: false },
      { text: "Traditional fermented milk", correct: true },
      { text: "Traditional alcoholic drink", correct: false },
      { text: "Traditional soda", correct: false },
    ],
  },
  {
    question:
      "Mutura, an instentine-encased mixture of minced pieces of cow/goat meat, tripe, and cooled blood that's been flavoured with onions, salt pepper and chilli is popular among the?",
    answers: [
      { text: "Turkana", correct: false },
      { text: "Ameru", correct: false },
      { text: "Luhya", correct: false },
      { text: "Kikuyu", correct: true },
    ],
  },
  {
    question:
      "Muthokoi is the staple food of the Akamba in Kenya. What is it comprised of?",
    answers: [
      { text: "Dehulled maize and beans", correct: true },
      { text: "Kales and maize", correct: false },
      { text: "Green bananas", correct: false },
      { text: "Meat", correct: false },
    ],
  },
  {
    question:
      "What accompanies the famous Kenyan dish, 'nyama choma and ugali'?",
    answers: [
      { text: "Kachumbari", correct: true },
      { text: "Guacamole", correct: false },
      { text: "Coleslaw", correct: false },
      { text: "French fries", correct: false },
    ],
  },
  {
    question:
      "Which is Kenya's biggest food export?",
    answers: [
      { text: "Tea", correct: true },
      { text: "Coffee", correct: false },
      { text: "Nuts", correct: false },
      { text: "Flowers", correct: false },
    ],
  },
  {
    question:
      "Pilau is a staple food for which people on the Kenyan coast?",
    answers: [
      { text: "Luhya", correct: false },
      { text: "Kikuyu", correct: false },
      { text: "Kisii", correct: false },
      { text: "Swahili", correct: true },
    ],
  },
  {
    question:
      "'Ingoho' is a popular dish associated with which Kenyan community?",
    answers: [
      { text: "Luhya", correct: true },
      { text: "Kisii", correct: false },
      { text: "Luo", correct: false },
      { text: "Taita", correct: false },
    ],
  },
  {
    question:
      "What is the staple food of the Kisii people of Western Kenya?",
    answers: [
      { text: "Ugali", correct: false },
      { text: "Matoke", correct: true },
      { text: "Pilau", correct: false },
      { text: "Githeri", correct: false },
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
