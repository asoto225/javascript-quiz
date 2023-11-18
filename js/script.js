const questions = [
    {
        question: `What is the difference between "==" and "==="?`,
        answers: [
            { text: `'==' compares two variables regardless of data type, '===' strictly compares two data types and it's values.`, correct: true },
            { text: `'==' is a strict comparision between two values, '===' is a loose comparision and doesnt care about data types`, correct: false },
            { text: `'==' does not exist in Javascript.`, correct: false },
            { text: `There is no difference between '==' and '==='.`, correct: false }
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

const totalTimeForQuiz = 60;
let timeLeft = totalTimeForQuiz;
let timerInterval;
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    console.log('Started');
    const player = document.getElementById('username').value;
    if (!player) {
        alert('Please enter your name before starting quiz');
        return;
    }
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    startTimer();

    document.getElementById('questionList').style.display = 'block';
};

function showQuestion(){
    resetQuestion();
    resetTimer();
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

function resetTimer() {
    timeLeft = totalTimeForQuiz;
    updateTimerDisplay();
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
    const player = document.getElementById('username').value;
    questionElement.innerText = `Score: ${score} out of ${questions.length}`;
    const button = document.createElement('button');
    button.innerText = 'Restart';
    button.classList.add('restart');
    button.addEventListener('click', startQuiz);
    answerButtonsElement.appendChild(button);
    clearInterval(timerInterval);
    saveHighScore(player, score);
    document.getElementById('username').value = '';
    clearInterval(timerInterval);
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

function saveHighScore (user, score){
    const storedHighScores = JSON.parse(localStorage.getItem('highScores')) || [];
    storedHighScores.push({user, score});
    storedHighScores.sort((a,b) => b.score - a.score);
    localStorage.setItem('highScores', JSON.stringify(storedHighScores));
}

//Highscore functions

function redirectToHighScores(){
    window.location.href = 'highscore.html';
}

// document.addEventListener('DOMContentLoaded', displayHighScores);


// function displayHighScores(){
//     const highScoreList = document.getElementById('highScores');
//     const storedHighScores = JSON.parse(localStorage.getItem('highScores'));

//     highScoreList.innerHTML = ' ';

//     storedHighScores.forEach(entry => {
//         const li = document.createElement('li');
//         li.innerText = `${entry.name} - ${entry.score}`;
//         highScoreList.appendChild(li);
//     });
// }

startButton.addEventListener('click', startQuiz);