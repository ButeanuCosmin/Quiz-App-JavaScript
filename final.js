
// se acceseaza obiectele cu id-ul respectiv

const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem("mostRecentScore");

// se acceseaza datele din localStorage

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// se afiseaza rezultatul final al quiz-ului, se trece username-ul dorit iar apoi datele se salveaza in localstorage.

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

finalScore.innerText = mostRecentScore;


saveHighScore = e => {
    console.log("clicked the save button!");
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(10);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("final.html");
};