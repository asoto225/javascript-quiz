const questions = [
    {
        question: 'The first question',
        answers: [
            { text: 'The first answer', correct: true },
            { text: 'The second answer', correct: false },
            { text: 'The third answer', correct: false },
            { text: 'The fourth answer', correct: false }
        ]
    },
    {
        question: 'The second question',
        answers: [
            { text: 'The first answer', correct: false },
            { text: 'The second answer', correct: true },
            { text: 'The third answer', correct: false },
            { text: 'The fourth answer', correct: false }
        ]
    },
    {
        question: 'The third question',
        answers: [
            { text: 'The first answer', correct: false },
            { text: 'The second answer', correct: false },
            { text: 'The third answer', correct: true },
            { text: 'The fourth answer', correct: false }
        ]
    },
    {
        question: 'The fourth question',
        answers: [
            { text: 'The first answer', correct: false },
            { text: 'The second answer', correct: false },
            { text: 'The third answer', correct: false },
            { text: 'The fourth answer', correct: true }
        ]
    }
];

const startButton = document.getElementById('startBtn');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answerBtns');

const totalTimeForQuiz = 120;
let timeLeft = totalTimeForQuiz;
let timerInterval;
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    console.log('Started');
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    startTimer();
};

function showQuestion(){
    resetQuestion();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerText = questionNumber + '. ' + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answers');
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
};

function startTimer(){
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;
        if(timeLeft <= 0){
            clearInterval(timerInterval);
            showScore();
        } else {
            updateTimerDisplay();
        }
    }, 1000);

}

function updateTimerDisplay(){
    document.getElementById('timer').innerText = `Timer: ${timeLeft}`;

}

function resetQuestion(){
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(){
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct;
    if(isCorrect){
        selectedButton.classList.add('correct');
        score++;
    }else{
        selectedButton.classList.add('incorrect');
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true;
    });

    setTimeout(nextQuestion, 1000);
}

function showScore(){
    resetQuestion();
    questionElement.innerText = `Score: ${score} out of ${questions.length}`;
    const button = document.createElement('button');
    button.innerText = 'Restart';
    button.classList.add('restart');
    button.addEventListener('click', startQuiz);
    answerButtonsElement.appendChild(button);
    
}

function nextQuestion(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        console.log(`Score: ${score}`);
        showScore()
    }

}
startButton.addEventListenerstartQuiz("click", startQuiz);