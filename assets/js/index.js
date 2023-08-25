const elementsDOM = {
  cardBoard: document.querySelector('#card-board'),
  startButton: document.querySelector('#start-button'),
  maxLevel: document.querySelector('#max-level'),
  currentLevel: document.querySelector('#current-level'),
  tries: document.querySelector('#tries'),
}

const appState = {
  maxLevel: localStorage.getItem('maxLevel') ? Number(localStorage.getItem('maxLevel')) : 1,
  currentLevel: localStorage.getItem('currentLevel') ? Number(localStorage.getItem('currentLevel')) : 1,
  tries: localStorage.getItem('tries') ? Number(localStorage.getItem('tries')) : 0,
  startingValue: 1,
  numberOfCards: 20,
  shuffledArray: null,
  winCardsIndexes: null,
  showCardsTimer: 2000,
  continueTimer: 1000,
  countDown: 10,
}

let timerCountDownId;

elementsDOM.maxLevel.textContent = appState.maxLevel
elementsDOM.currentLevel.textContent = appState.currentLevel
elementsDOM.tries.textContent = appState.tries

if(appState.currentLevel > 1) {
  elementsDOM.cardBoard.appendChild(createContinueButton());
} else {
  appState.shuffledArray = shuffleArray(generateArrayFromOneToArgumentNumber())
  elementsDOM.cardBoard.innerHTML = generateCardsHTML(appState.shuffledArray);
}


elementsDOM.startButton.addEventListener("click", () => {
  resetState();
  startGame();
});

// Funtions
function startGame() {
  if(timerCountDownId) {
    clearTimeout(timerCountDownId);
    appState.countDown = 10;
  }
  appState.shuffledArray = shuffleArray(generateArrayFromOneToArgumentNumber())
  appState.startingValue = 1;
  elementsDOM.cardBoard.removeEventListener("click", clickBoardHandler);
  elementsDOM.cardBoard.innerHTML = generateCardsHTML(appState.shuffledArray);
  appState.winCardsIndexes = getArrOfWinIndexes();
  elementsDOM.currentLevel.textContent = appState.currentLevel;
  console.log(appState.currentLevel)
  elementsDOM.tries.textContent = appState.tries
  console.log(appState.tries)
  setMaxLevel();
  openWinCards();
  elementsDOM.cardBoard.addEventListener("click", clickBoardHandler);
}

function resetState() {
  appState.startingValue = 1;
  appState.tries = 0;
  appState.currentLevel = 1;
  localStorage.setItem('tries', 0);
  localStorage.setItem('currentLevel', 1);
}

function setMaxLevel() {
  if(appState.maxLevel < appState.currentLevel) {
    appState.maxLevel = appState.currentLevel
    localStorage.setItem('maxLevel', appState.maxLevel);
    elementsDOM.maxLevel.textContent = appState.currentLevel
  }
}

function createContinueButton() {
  const button = document.createElement('button');
  button.className = 'button continue-button';
  button.innerHTML = 'Continue';
  button.addEventListener('click', () => {

    startGame()
  });
  return button
}

// Util Functions
function selectRandomArrayIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

function shuffleArray(arrOfNumbers) {
const arr = [...arrOfNumbers];
const newArr = [];
let newValue;
let randomIndex;
for (let index = 0; index < arrOfNumbers.length; index++) {
  randomIndex = selectRandomArrayIndex(arr)
  newValue = arr[randomIndex]
  arr.splice(randomIndex, 1)
  newArr.push(newValue)
}
  return newArr
}

function generateArrayFromOneToArgumentNumber() {
  let arrNumbers = [];
  for (let index = 0; index < appState.numberOfCards; index++) {
    arrNumbers.push(index + 1);
  }
  return arrNumbers
}

function generateCardsHTML(arrNumbers) {
  let cardsHTML = '';
  for (let index = 0; index < arrNumbers.length; index++) {
    cardsHTML += 
    `<div class="card-container">
        <div class="card" data-card-number="${arrNumbers[index]}">
          <div class="card-front">
            ${arrNumbers[index]}
          </div>
          <div class="card-back">
          </div>
        </div>
      </div>`;
  }
  return cardsHTML;
}

function getArrOfWinIndexes() {
  const arrayOfIndexes = []
  for (let index = 0; index < appState.currentLevel; index++) {
    arrayOfIndexes.push(appState.shuffledArray.findIndex(elem => elem === index + 1));
  }
  return arrayOfIndexes;
}

function openWinCards() {
  appState.winCardsIndexes.map(elem => {
    const card = elementsDOM.cardBoard.children[elem].children[0]
    setTimeout(()=>{
      card.classList.add("rotate");
    })
    setTimeout(()=>{
      card.classList.remove("rotate");
    }, appState.showCardsTimer)
  })
}

// Event listener functions
function clickBoardHandler(e) {
  if(e.target.className === "card-back" && parseInt(e.target.parentNode.dataset.cardNumber) === appState.startingValue) {
    appState.winCardsIndexes.pop();
    if(!appState.winCardsIndexes.length){
      appState.tries++
      localStorage.setItem('tries', appState.tries)
      appState.currentLevel++;
      localStorage.setItem('currentLevel', appState.currentLevel)
      elementsDOM.cardBoard.innerHTML = `
      <h2 class="win-text">${appState.currentLevel > 5 ? 'Excelent Job!' : 'Good Job!'}</h2>
      <div class="timer">${appState.countDown}</div>
      `
      elementsDOM.cardBoard.appendChild(createContinueButton());
      appState.shuffledArray = shuffleArray(generateArrayFromOneToArgumentNumber())
      elementsDOM.currentLevel.textContent = appState.currentLevel
      elementsDOM.tries.textContent = appState.tries
      countDown()
      // return
    } else {
      e.target.parentNode.classList.add('rotate');
      appState.startingValue++
    }
  } else if((e.target.className === "card-back") && (parseInt(e.target.parentNode.dataset.cardNumber) !== appState.startingValue) && !appState.tries) {
    elementsDOM.cardBoard.innerHTML = `<h2>You Lost!!!</h2>`
  } else if(e.target.className === "card-back") {
    appState.tries--
    localStorage.setItem('tries', appState.tries)
    elementsDOM.tries.textContent = appState.tries
  }
}


function countDown() {
  timerCountDownId = setTimeout(() => {
    if(appState.countDown === 1) {
      appState.countDown = 10
      startGame()
    } else {
      appState.countDown--;
      elementsDOM.cardBoard.children[1].textContent = appState.countDown;
      countDown()
    }
  }, appState.continueTimer);
}