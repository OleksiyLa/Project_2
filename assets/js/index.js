const elementsDOM = {
  cardBoard: document.querySelector('#card-board'),
  startButton: document.querySelector('#start-button'),
  maxLevel: document.querySelector('#max-level'),
  currentLevel: document.querySelector('#current-level'),
  tries: document.querySelector('#tries'),
}

const appState = {
  set maxLevel(num) {
    localStorage.setItem('maxLevel', num);
    elementsDOM.maxLevel.textContent = num;
  },
  get maxLevel() {
    return localStorage.getItem('maxLevel') ? Number(localStorage.getItem('maxLevel')) : 1;
  },
  set currentLevel(num) {
    if(num > this.maxLevel) {
      this.maxLevel = num;
    }
    localStorage.setItem('currentLevel', num);
    elementsDOM.currentLevel.textContent = num;
  },
  get currentLevel() {
    return localStorage.getItem('currentLevel') ? Number(localStorage.getItem('currentLevel')) : 1;
  },
  set tries(num) {
    localStorage.setItem('tries', num);
    elementsDOM.tries.textContent = num;
  },
  get tries() {
    return localStorage.getItem('tries') ? Number(localStorage.getItem('tries')) : 0;;
  },
  set isGameStarted(bool) {
    localStorage.setItem('isGameStarted', bool);
  },
  get isGameStarted() {
    return localStorage.getItem('isGameStarted') ? JSON.parse(localStorage.getItem('isGameStarted')) : false;
  },
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

if(appState.currentLevel > 1 && !appState.isGameStarted) {
  elementsDOM.cardBoard.appendChild(createContinueButton());
} else {
  appState.isGameStarted = false;
  resetState();
  appState.shuffledArray = shuffleArray(generateArrayFromOneToArgumentNumber())
  elementsDOM.cardBoard.innerHTML = generateCardsHTML(appState.shuffledArray);
}


elementsDOM.startButton.addEventListener("click", () => {
  resetState();
  startGame();
});

// Funtions
function startGame() {
  appState.isGameStarted = true
  if(timerCountDownId) {
    clearInterval(timerCountDownId);
    appState.countDown = 10;
  }
  appState.shuffledArray = shuffleArray(generateArrayFromOneToArgumentNumber())
  appState.startingValue = 1;
  elementsDOM.cardBoard.removeEventListener("click", clickBoardHandler);
  elementsDOM.cardBoard.innerHTML = generateCardsHTML(appState.shuffledArray);
  appState.winCardsIndexes = getArrOfWinIndexes();
  elementsDOM.currentLevel.textContent = appState.currentLevel;
  elementsDOM.tries.textContent = appState.tries
  openWinCards();
  elementsDOM.cardBoard.addEventListener("click", clickBoardHandler);
}

function resetState() {
  appState.startingValue = 1;
  appState.tries = 0;
  appState.currentLevel = 1;
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
      appState.isGameStarted = false;
      appState.tries++
      appState.currentLevel++;
      elementsDOM.cardBoard.innerHTML = `
      <h2 class="win-text">${appState.currentLevel > 5 ? 'Excelent Job!' : 'Good Job!'}</h2>
      <div class="timer">${appState.countDown}</div>
      `
      elementsDOM.cardBoard.appendChild(createContinueButton());
      appState.shuffledArray = shuffleArray(generateArrayFromOneToArgumentNumber())
      countDown()
    } else {
      e.target.parentNode.classList.add('rotate');
      appState.startingValue++
    }
  } else if((e.target.className === "card-back") && (parseInt(e.target.parentNode.dataset.cardNumber) !== appState.startingValue) && !appState.tries) {
    elementsDOM.cardBoard.innerHTML = `<div class="lose-text"><h2>You lost on level ${appState.currentLevel}</h2><p>Click the <strong>New Game</strong> button below to play again</p></div>`
  } else if(e.target.className === "card-back") {
    appState.tries--
  }
}

function countDown() {
  timerCountDownId = setInterval(() => {
    if(appState.countDown === 1) {
      startGame()
    } else {
      appState.countDown--;
      elementsDOM.cardBoard.children[1].textContent = appState.countDown;
    }
  }, appState.continueTimer);
}