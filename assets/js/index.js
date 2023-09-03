const elementsDOM = {
  cardBoard: document.querySelector('#card-board'),
  startButton: document.querySelector('#start-button'),
  maxLevel: document.querySelector('#max-level'),
  currentLevel: document.querySelector('#current-level'),
  tries: document.querySelector('#tries'),
  instructionsToggler: document.querySelector('#instructions-toggler'),
  instructionsPopUp: document.querySelector('#instructions-pop-up'),
  instructions: document.querySelector('.instruction-overlay'),
};

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
    return localStorage.getItem('tries') ? Number(localStorage.getItem('tries')) : 0;
  },
  set isGameStarted(bool) {
    localStorage.setItem('isGameStarted', bool);
  },
  get isGameStarted() {
    return localStorage.getItem('isGameStarted') ? JSON.parse(localStorage.getItem('isGameStarted')) : false;
  },
  winLevel: 20,
  startingValue: 1,
  numOfCardsArr: generateArrOfNumbers(20),
  shuffledArray: null,
  winCardsIndexes: null,
  showCardsTimer: 2000,
  countDown: {
    intervalId: null,
    timer: 1000,
    number: 10
  },
  wrongCardTimer: 1000,
};

startApp();

/**
 * This function initiates the entire application.
 */
function startApp() {
  displayIndicators();
  displayBoard();
  showPopUp();
  elementsDOM.instructionsToggler.addEventListener('click', toggleInstructions);
  elementsDOM.startButton.addEventListener("click", () => {
    resetState();
    startGame();
  });
}

/**
 * This function shows indicators for the maximum level, current level, and remaining tries.
 */
function displayIndicators() {
  elementsDOM.maxLevel.textContent = appState.maxLevel;
  elementsDOM.currentLevel.textContent = appState.currentLevel;
  elementsDOM.tries.textContent = appState.tries;
}

/**
 * This function either displays cards on the board or presents a menu to continue the previous game (provided the necessary conditions are met).
 */
function displayBoard() {
  if(appState.currentLevel > 1 && !appState.isGameStarted) {
    displayContinueBoard();
  } else {
    displayCardsOnBoard();
  }
}

/**
 * This function displays current level and continue button on the board.
 */
function displayContinueBoard() {
  elementsDOM.cardBoard.innerHTML = `<h2 class="win-text">Level ${appState.currentLevel}</h2>`;
  elementsDOM.cardBoard.appendChild(createContinueButton());
}

/**
 * This function resets the indicators and presents a board with face-down cards.
 */
function displayCardsOnBoard() {
  appState.isGameStarted = false;
  resetState();
  appState.shuffledArray = shuffleArray(appState.numOfCardsArr);
  elementsDOM.cardBoard.innerHTML = generateCardsHTML(appState.shuffledArray);
}

/**
 * This function either continues an ongoing game or starts a new game.
 */
function startGame() {
  resetInterval();
  setInnerStates();
  setCards();
  openWinCards();
  addListenerOnBoard();
}

/**
 * This function clears interval and set countDown number to 10.
 */
function resetInterval() {
  if(appState.countDown.intervalId) {
    clearInterval(appState.countDown.intervalId);
    appState.countDown.number = 10;
  }
}

/**
 * This function shuffles cards, displays cards on the board and assigns array of win cards to appState winCardsIndexes.
 */
function setCards() {
  appState.shuffledArray = shuffleArray(appState.numOfCardsArr);
  elementsDOM.cardBoard.innerHTML = generateCardsHTML(appState.shuffledArray);
  appState.winCardsIndexes = getArrOfWinIndexes();
}

/**
 * This function sets isGameStarted to true and startingValue to 1.
 */
function setInnerStates() {
  appState.isGameStarted = true;
  appState.startingValue = 1;
}

/**
 * This function removes an old eventListener and adds a new one.
 */
function addListenerOnBoard() {
  elementsDOM.cardBoard.removeEventListener("click", clickBoardHandler);
  elementsDOM.cardBoard.addEventListener("click", clickBoardHandler);
}

/**
 * This function resets the states of the starting value, tries, and current level.
 */
function resetState() {
  appState.startingValue = 1;
  appState.tries = 0;
  appState.currentLevel = 1;
}

/**
 * This function creates a button and attaches a click event listener to it. 
 * When the button is clicked, it will proceed with the game.
 */
function createContinueButton() {
  const button = document.createElement('button');
  button.className = 'continue-button';
  button.innerHTML = 'Continue';
  button.addEventListener('click', () => {
    startGame();
  });
  return button;
}

/**
 * This function selects a random index from an array.
 */
function selectRandomArrayIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

/**
 * This function randomly shuffles an array.
 */
function shuffleArray(arrOfNumbers) {
  const arr = [...arrOfNumbers];
  const newArr = [];
  let newValue;
  let randomIndex;
  for (let index = 0; index < arrOfNumbers.length; index++) {
    randomIndex = selectRandomArrayIndex(arr);
    newValue = arr[randomIndex];
    arr.splice(randomIndex, 1);
    newArr.push(newValue);
  }
  return newArr;
}

/**
 * This function generates an array of numbers in a sequence from 1 to a given number passed as an argument.
 */
function generateArrOfNumbers(num) {
  const arrNumbers = [];
  for (let index = 0; index < num; index++) {
    arrNumbers.push(index + 1);
  }
  return arrNumbers;
}

/**
 * This function generates HTML for the cards.
 */
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

/**
 * This function returns an array of winning card indexes.
 */
function getArrOfWinIndexes() {
  const arrayOfIndexes = [];
  for (let index = 0; index < appState.currentLevel; index++) {
    arrayOfIndexes.push(appState.shuffledArray.findIndex(elem => elem === index + 1));
  }
  return arrayOfIndexes;
}

/**
 * This function reveals all the winning cards.
 */
function openWinCards() {
  appState.winCardsIndexes.map(elem => {
    const card = elementsDOM.cardBoard.children[elem].children[0];
    setTimeout(()=>{
      card.classList.add("rotate");
      setTimeout(()=>{
        card.classList.remove("rotate");
      }, appState.showCardsTimer);
    }, 100);
  });
}

/**
 * This function manages the click event listener when a card is clicked.  
 * If the correct card is found, the function opens that card. If all winning cards are discovered, it displays a message on the board informing the user about the discovered winning cards and initiates a countdown. Additionally, it increases the current level and the number of tries.  
 * If an incorrect card is chosen, it reduces the number of tries. If no more tries are available, it informs the user that they have lost.
 */
function clickBoardHandler(e) {
  if(e.target.className === "card-back" && parseInt(e.target.parentNode.dataset.cardNumber) === appState.startingValue) {
    appState.winCardsIndexes.pop();
    if(!appState.winCardsIndexes.length){
      appState.isGameStarted = false;
      appState.currentLevel++;
      appState.tries++;
      displayLevelPassed();
    } else {
      e.target.parentNode.classList.add('rotate');
      appState.startingValue++;
    }
  } else if((e.target.className === "card-back") && (parseInt(e.target.parentNode.dataset.cardNumber) !== appState.startingValue) && !appState.tries) {
    elementsDOM.cardBoard.innerHTML = `<div class="lose-text"><h2>You lost on level ${appState.currentLevel}</h2><p>Click the <strong>New Game</strong> button below to play again</p></div>`;
  } else if(e.target.className === "card-back") {
    appState.tries--;
    higlightWrongCard(e);
  }
}

/**
 * This function presents information on the board once a level is successfully completed. It provides messages indicating whether you've won, broken a record, or simply congratulates you with a "good job," depending on specific conditions.
 */
function displayLevelPassed() {
  if(appState.currentLevel === appState.winLevel) {
    elementsDOM.cardBoard.innerHTML = `
    <h2 class="win-text">You win</h2>
    `;
  } else if(appState.currentLevel === appState.maxLevel) {
    elementsDOM.cardBoard.innerHTML = `
    <h2 class="win-text">New Record</h2>
    <div class="timer">${appState.countDown.number}</div>
    `;
    elementsDOM.cardBoard.appendChild(createContinueButton());
    countDown();
  } else {
    elementsDOM.cardBoard.innerHTML = `
    <h2 class="win-text">Good Job</h2>
    <div class="timer">${appState.countDown.number}</div>
    `;
    elementsDOM.cardBoard.appendChild(createContinueButton());
    countDown();
  }
}

/**
 * This function highlights the incorrect card and subtracts 1 from the tries.
 */
function higlightWrongCard(e) {
  e.target.parentNode.classList.add('wrong-card');
  setTimeout(() => {
    e.target.parentNode.classList.remove('wrong-card');
  }, appState.wrongCardTimer);
}

/**
 * This function proceeds with the game once the countDown number reaches 1. 
 * Otherwise, it decreases the countDown number by 1.
 */
function countDown() {
  appState.countDown.intervalId = setInterval(() => {
    if(appState.countDown.number === 1) {
      startGame();
    } else {
      appState.countDown.number--;
      elementsDOM.cardBoard.children[1].textContent = appState.countDown.number;
    }
  }, appState.countDown.timer);
}

/**
 * This function toggles instructions for the game.
 */
function toggleInstructions(e) {
  if(e.target !== elementsDOM.instructionsPopUp) {
    elementsDOM.instructions.classList.toggle('hidden');
  }
}

/**
 * This function briefly displays a popup to inform the user about the toggler button, which grants access to view the game instructions.
 */
function showPopUp() {
  setTimeout(() => {
    elementsDOM.instructionsPopUp.classList.remove("hidden");
    setTimeout(() => {
      elementsDOM.instructionsPopUp.classList.add("hidden");
    }, 2500);
  }, 500);
}