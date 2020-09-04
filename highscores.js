
// se acceseaza obiectele cu id-ul respectiv

const highScoresList = document.getElementById("highScoresList");

// se acceseaza datele din localStorage

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// se afiseaza rezultatele cu ajutorul unei functii arrow care are un singur parametru, score.

highScoresList.innerHTML = highScores
    .map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
    })
    .join("");