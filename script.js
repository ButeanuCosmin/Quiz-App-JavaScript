

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const scoreText = document.getElementById("score");



let score = 0;
let shuffledQuestions, currentQuestionIndex


startButton.addEventListener('click', startGame)


nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})



function startGame() {

  score=0;

  startButton.classList.add('hide')

  
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')

  setNextQuestion()

}


function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])

}


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


function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}


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