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
        queston: 'The third question',
        answers: [
            { text: 'The first answer', correct: false },
            { text: 'The second answer', correct: false },
            { text: 'The third answer', correct: true },
            { text: 'The fourth answer', correct: false }
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answerBtns');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    console.log('Started');
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
};

function showQuestion(){
    // resetQuestion();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerText = questionNumber + '. ' + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answers');
        // if(answer.correct){
        //     button.dataset.correct = answer.correct;
        // }
        // button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
};

// function showQuestion(){
//     console.log('Show question');
//     questionElement.innerText = questions[currentQuestionIndex].question;
//     questions[currentQuestionIndex].answers.forEach(answer => {
//         const button = document.createElement('button');
//         button.innerText = answer.text;
//         button.classList.add('answerBtn');
//         if(answer.correct){
//             button.dataset.correct = answer.correct;
//         }
//         button.addEventListener('click', selectAnswer);
//         answerButtonsElement.appendChild(button);
//     });
// }

// function selectAnswer(e){
//     console.log('Selected answer');
//     const selectedButton = e.target;
//     const correct = selectedButton.dataset.correct;
//     if(correct){
//         score++;
//     }
//     currentQuestionIndex++;
//     if(currentQuestionIndex < questions.length){
//         showQuestion();
//     } else {
//         console.log(`Score: ${score}`);
//     }
// }

startQuiz();