const elementsDOM = {
  cardBoard: document.querySelector('#card-board'),
  startButton: document.querySelector('#start-button'),
  currentLevel: document.querySelector('#current-level'),
}

const appState = {
  maxLevel: 1,
  currentLevel: 1,
  tries: 0,
  startingValue: 1,
}
let arrayOfIndexes = [];
let numberOfCards = 20;

let arrNumbers = generateArrayFromOneToArgumentNumber(numberOfCards);
elementsDOM.cardBoard.innerHTML = generateCardsHTML(arrNumbers);

elementsDOM.startButton.addEventListener("click", () => {
  elementsDOM.cardBoard.removeEventListener("click", clickBoardHandler);
  appState.startingValue = 1;
  const shuffledArray = shuffleArray(arrNumbers);
  elementsDOM.cardBoard.innerHTML = generateCardsHTML(shuffledArray);
  arrayOfIndexes = openCardsFromOneToArgumentNumber(shuffledArray, appState.currentLevel)
  elementsDOM.currentLevel.textContent = appState.currentLevel;
  elementsDOM.cardBoard.addEventListener("click", clickBoardHandler)
});


// Functions
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

function generateArrayFromOneToArgumentNumber(numberOfCards) {
  let arrNumbers = [];
  for (let index = 0; index < numberOfCards; index++) {
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

function obtainArrayOfIndexesFromOneToArgumentNumber(arrNumbers, numberOfCardsToOpen) {
  const arrayOfIndexes = []
  for (let index = 0; index < numberOfCardsToOpen; index++) {
    arrayOfIndexes.push(arrNumbers.findIndex(elem => elem == index + 1));
  }
  return arrayOfIndexes;
}

function openCardsFromOneToArgumentNumber(arrNumbers, numberOfCardsToOpen) {
  const arrayOfIndexes = obtainArrayOfIndexesFromOneToArgumentNumber(arrNumbers, numberOfCardsToOpen);
  arrayOfIndexes.map(elem => {
    const card = elementsDOM.cardBoard.children[elem].children[0]
    setTimeout(()=>{
      card.classList.add("rotate");
    })
    setTimeout(()=>{
      card.classList.remove("rotate");
    }, 2000)
  })
  return arrayOfIndexes;
}

// Event listener functions
function clickBoardHandler(e) {
  if(e.target.className === "card-back" && parseInt(e.target.parentNode.dataset.cardNumber) === appState.startingValue) {
    arrayOfIndexes.pop();
    if(!arrayOfIndexes.length){
      appState.startingValue = 1;
      appState.currentLevel++;
      elementsDOM.cardBoard.innerHTML = `<h2>You Won!!!</h2>`
      setTimeout(()=>{elementsDOM.startButton.click()},1000);
      return
    }
    e.target.parentNode.classList.add('rotate');
    appState.startingValue++
  } else if(e.target.className === "card-back" && parseInt(e.target.parentNode.dataset.cardNumber) !== appState.startingValue) {
    elementsDOM.cardBoard.innerHTML = `<h2>You Lost!!!</h2>`
    appState.startingValue = 1;
  }
}