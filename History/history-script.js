const questions = [
  {
    question: "When did Kenya gain independence?",
    answers: [
      { text: "1964", correct: false },
      { text: "1963", correct: true },
      { text: "1965", correct: false },
      { text: "1962", correct: false },
    ],
  },
  {
    question: "Who was Kenya's first president?",
    answers: [
      { text: "Jomo Kenyatta", correct: true },
      { text: "Daniel Arap Moi", correct: false },
      { text: "Uhuru Kenyatta", correct: false },
      { text: "Mwai Kibaki", correct: false },
    ],
  },
  {
    question: "In 1951, the Kenya African Union (KAU) president Jomo Kenyatta presented the British Labor Secretary of State for the Colonies James Griffiths with a list of proposed actions, all of which were ignored. Which of these was NOT on Kenyatta's list?",
    answers: [
      { text: "Autonomy for a Kenyan Free State", correct: false },
      { text: "Legalization of trade unions", correct: true },
      { text: "Abolition of race-based laws", correct: false },
      { text: "Aid for African farmers", correct: false },
    ],
  },
  {
    question: "In 1960, under a more equitable electoral system, there were fourteen African members of the Kenya Legislative Council. Who amongst these was NOT one of them?",
    answers: [
      { text: "Dedan Kimathi", correct: true },
      { text: "Daniel Arap Moi", correct: false },
      { text: "Oginga Odinga", correct: false },
      { text: "Tom Mboya", correct: false },
    ],
  },
  {
    question: "The government that independent Kenya would have was hammered out in a series of constitutional conferences between 1960 and 1963. Where were these conferences held?",
    answers: [
      { text: "Lancaster House, United Kingdom", correct: false },
      { text: "Buenos Aires, Argentina", correct: false },
      { text: "Calcutta, India", correct: false },
      { text: "Dayton,  United States", correct: true },
    ],
  },
  {
    question: "The land that is now called Nairobi was once a swamp land occupied by which indigenous people?",
    answers: [
      { text: "Luhya", correct: false },
      { text: "Taita", correct: false },
      { text: "Maasai", correct: true },
      { text: "Kikuyu", correct: false },
    ],
  },
  {
    question: "Who was the founder of the Young Kikuyu Association, later called the East African Association, an organization focused on protesting the British rule in Kenya and the poor treatment of native blacks in 1921?",
    answers: [
      { text: "Jomo Kenyatta", correct: false },
      { text: "Harry Thuku", correct: true },
      { text: "Ratemo Michieka", correct: false },
      { text: "Steve Tikolo", correct: false },
    ],
  },
  {
    question: "In what tumultuous year did the Mau Mau Uprising begin that ultimately led to the decolonization of Kenya and then to independence?",
    answers: [
      { text: "1958", correct: false },
      { text: "1962", correct: false },
      { text: "1952", correct: false },
      { text: "1960", correct: true },
    ],
  },
  {
    question: "Which nation's embassy in Nairobi was attacked by Al-Qaeda militants on August 7, 1998?",
    answers: [
      { text: "United States", correct: true },
      { text: "United Kingdom", correct: false },
      { text: "France", correct: false },
      { text: "China", correct: false },
    ],
  },
  {
    question: "Which Kenyan president won the controversial and disputed election of 2007?",
    answers: [
      { text: "Raila Odinga", correct: false },
      { text: "Daniel Arap Moi", correct: false },
      { text: "Mwai Kibaki", correct: true },
      { text: "Uhuru Kenyatta", correct: false },
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
