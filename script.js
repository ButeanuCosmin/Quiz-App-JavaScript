
// MODIFICARI!!!!
// Am adaugat in plus fata de proiectul initial :::


// - Intrebari noi pentru quiz, ca acesta sa devina unul educational
// - Am contabilizat scorul
// - Am adaugat optiunea de a salva scorul in local storage in functie de numele de utilizator
// - Am adaugat o noua pagina in care poti sa salvezi scorul respectiv ( final.html + final.js)
// - Am adaugat o noua pagina in care se pot observa cele mai bune 10 scoruri (highscores.html + highscores.js)
// - Am schimbat o parte din design-ul initial



// se acceseaza obiectele cu id-ul respectiv

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const scoreText = document.getElementById("score");



let score = 0;
let shuffledQuestions, currentQuestionIndex


// se apeleaza functia startGame la momentul in care se da click pe butonul start
startButton.addEventListener('click', startGame)


nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})


// Functia startGame e functia care are rolul de a incepe jocul
// Scorul devine 0 la fiecare apel al functiei
// Butonul de start devine ascuns dupa apasarea initiala al acestuia
// Se vor sorta random intrebarile
// Iar containerul in care intrebarile si raspunsurile se vor afla devine vizibil.

function startGame() {

  score=0;

  startButton.classList.add('hide')

  
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')

  setNextQuestion()

}

// Functia setNextQuestion apeleaza functiile resetState si showQuestion prezentate mai jos, si are rolul de a pregati intrebarea urmatoare.

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])

}

// Functia showQuestion, cu parametru obiectul question, acceseaza datele intrebarilor scrise mai jos.
// Accesam textul intrebarii, iar mai apoi trecem, cu ajutorul metodei forEach si a functiei arrow, prin toate raspunsurile din array
// Se vor creea butoane pentru fiecare raspuns in parte, iar daca un raspuns este corect se va contabiliza butonul care echivaleaza raspunsul

function showQuestion(question) {

  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

// Functia resetState are rolul de a reseta toate datele dupa finalizarea unei intrebari.

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

// Functia selectAnswer, dupa cum ii spune si numele, are rolul de a verifica raspunsul selectat si de a apela animatiile din styles.css
// Tot in aceasta functie se contorizeaza scorul in cazul in care raspunsul selectat e cel corect
// Daca mai sunt intrebari ramase se afiseaza butonul next, care initial este ascuns
// Daca intrebarile au fost epuizate se salveaza scorul in localstorage, iar aplicatia trece la pagina de afisare a rezultatului final.
// In aceasta functie se foloseste metoda array.from care creeaza o instanta copiata a obiectului si apoi se trece prin fiecare
// Functia arrow reprezinta prescurtarea function(button), iar in aceasta se apeleaza functia setStatusClass prezentata mai jos.

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (selectedButton.dataset = correct) {
    score++;

  }
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("final.html");
  }
}

// Functia setStatusClass cu parametrii element si correct are rolul de a verifica tipul raspunsului
// Si de a adauga raspunsul in obiectul care acceseaza mai sus animatiile produse in styles.css
// De asemenea se apeleaza initial si functia care sterge datele obiectului la fiecare utilizare a functiei setStatusClass.

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

// in constanta questions vom trece textul intrebarii intr-o variabila
// iar raspunsurile le vom trece intr-un array care e format din textul raspunsului si o variabila logica ce are rezultatele true/false.

const questions = [
  {
    question: 'What is the capital of France?',
    answers: [
      { text: 'Paris', correct: true },
      { text: 'London', correct: false },
      { text: 'Berlin', correct: false },
      { text: 'Marseille', correct: false }
    ]
  },
  {
    question: 'Which country is located in Asia?',
    answers: [
      { text: 'Norway', correct: false },
      { text: 'New Zealand', correct: false },
      { text: 'Belarus', correct: false },
      { text: 'Thailand', correct: true }
    ]
  },
  {
    question: 'The country with the most population out of these 4 is?',
    answers: [
      { text: 'Moldova', correct: false },
      { text: 'Romania', correct: true },
      { text: 'Bulgaria', correct: false },
      { text: 'Hungary', correct: false }
    ]
  },
  {
    question: 'The Everest is located in?',
    answers: [
      { text: 'Alpes', correct: false },
      { text: 'Carpathians', correct: false },
      { text: 'Himalayas', correct: true },
      { text: 'Urals', correct: false }
    ]
  }
]