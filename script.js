// DOM Element
const startScreen = document.querySelector('#start-screen');
const quizScreen = document.querySelector('#quiz-screen');
const resultScreen = document.querySelector('#result-screen');

const questionText = document.querySelector('#question-text');
const currentQuestionSpan = document.querySelector('#current-question');
const totalQuestion = document.querySelector('#total-question');
const answerContainer = document.querySelector('#answer-container');
const progress = document.querySelector('#progress');


const scoreSpan = document.querySelector('#score');
const finalScore = document.querySelector('#final-score');
const maxScore = document.querySelector('#max-score');
const resultMessage = document.querySelector('#result-message');

const startBtn = document.querySelector('#start-btn');
const restartBtn = document.querySelector('#restart-btn');



const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Madrid", correct: false },
        ],
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
        ],
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
        ],
    },
    {
        question: "Which of these is NOT a programming language?",
        answers: [
            { text: "Java", correct: false },
            { text: "Python", correct: false },
            { text: "Banana", correct: true },
            { text: "JavaScript", correct: false },
        ],
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Go", correct: false },
            { text: "Gd", correct: false },
            { text: "Au", correct: true },
            { text: "Ag", correct: false },
        ],
    },
];


let currentQuestionIndex = 0;
let score = 0;
let answersDisable = false;

totalQuestion.textContent = quizQuestions.length;
maxScore.textContent = quizQuestions.length;

// event listeners

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);

function startQuiz() {
    // Reset Vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;

    startScreen.classList.remove('active');
    quizScreen.classList.add('active');

    showQuestion();
}

function showQuestion() {
    // Reset State

    answersDisable = false;

    const currentQuestion = quizQuestions[currentQuestionIndex]
    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progress.style.width = progressPercent + "%";


    questionText.textContent = currentQuestion.question

    //

    answerContainer.innerHTML = "";
    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.textContent = answers.text;
        button.classList.add('answer-btn');

        button.dataset.correct = answers.correct;

        button.addEventListener('click', selectAnswer)

        answerContainer.appendChild(button);

    })
}
function selectAnswer(event) {
    // Optimization
    if (answersDisable) return
    answersDisable = true;

    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    Array.from(answerContainer.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct")
        } else {
            button.classList.add("incorrect")
        }
    });
    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;

    }

    setTimeout(() => {
        currentQuestionIndex++;

        // Check there more question or quiz is over
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();

        } else {
            showResult()
        }
    }, 1000)

}

function showResult() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScore.textContent = score;
    const percentage = (score / quizQuestions.length) * 100;

    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great Job! You know your stuff!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effot! Keep learing!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to inprove!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
    }
}


function restartQuiz() {
    resultScreen.classList.remove("active");

    startQuiz();
}
