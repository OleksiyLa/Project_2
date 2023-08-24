const elementsDOM = {
  cardBoard: document.querySelector('#card-board'),
  startButton: document.querySelector('#start-button'),
  currentLevel: document.querySelector('#current-level'),
  tries: document.querySelector('#tries'),
}

const appState = {
  maxLevel: 1,
  currentLevel: 1,
  tries: 0,
  startingValue: 1,
  numberOfCards: 20,
  shuffledArray: null,
  winCardsIndexes: null,
}
appState.shuffledArray = shuffleArray(generateArrayFromOneToArgumentNumber())
elementsDOM.cardBoard.innerHTML = generateCardsHTML(appState.shuffledArray);

elementsDOM.startButton.addEventListener("click", () => {
  resetState();
  startGame();
});

// Funtions
function startGame() {
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
    }, 2000)
  })
}

// Event listener functions
function clickBoardHandler(e) {
  if(e.target.className === "card-back" && parseInt(e.target.parentNode.dataset.cardNumber) === appState.startingValue) {
    appState.winCardsIndexes.pop();
    if(!appState.winCardsIndexes.length){
      appState.tries++
      appState.currentLevel++;
      elementsDOM.cardBoard.innerHTML = `<h2>You Won!!!</h2>`
      setTimeout(startGame,1000);
      return
    }
    e.target.parentNode.classList.add('rotate');
    appState.startingValue++
  } else if((e.target.className === "card-back") && (parseInt(e.target.parentNode.dataset.cardNumber) !== appState.startingValue) && !appState.tries) {
    elementsDOM.cardBoard.innerHTML = `<h2>You Lost!!!</h2>`
  } else {
    appState.tries--
    elementsDOM.tries.textContent = appState.tries
  }
}