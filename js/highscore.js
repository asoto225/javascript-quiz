document.addEventListener('DOMContentLoaded', displayHighScores);


function displayHighScores(){
    const highScoreList = document.getElementById('highScores');
    const storedHighScores = JSON.parse(localStorage.getItem('highScores'));


    // highScoreList.innerHTML = '';

    storedHighScores.forEach(entry => {
        const li = document.createElement('li');
        li.innerText = `${entry.user} - ${entry.score}`;
        highScoreList.appendChild(li);
    });
}

function redirectToQuiz(){
    window.location.href = 'index.html';
}