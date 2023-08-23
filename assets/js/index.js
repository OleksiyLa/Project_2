let startingValue = 1;
let level = 1;
let arrayOfIndexes = [];
// Event listeners
document.addEventListener("DOMContentLoaded", function() {
  const cardBoard = document.querySelector('#card-board');
  const startButton = document.querySelector('#start-button');
  const currentLevel = document.querySelector('#current-level');

  let numberOfCards = 20;
  let arrNumbers = generateArrayFromOneToArgumentNumber(numberOfCards);
  cardBoard.innerHTML = generateCardsHTML(arrNumbers);
  

  const wrappedFunction = eventHandlerWrapper(cardBoard, startButton, clickBoardHandler)
  startButton.addEventListener("click", () => {
    // cardBoard.removeEventListener("click", clickBoardHandler);
    cardBoard.removeEventListener("click", wrappedFunction);
    console.log(startingValue)
    startingValue = 1;
    console.log(startingValue)
    const shuffledArray = shuffleArray(arrNumbers);
    cardBoard.innerHTML = generateCardsHTML(shuffledArray);
    arrayOfIndexes = openCardsFromOneToArgumentNumber(cardBoard, shuffledArray, level)
    console.log(arrayOfIndexes)
    currentLevel.textContent = level;
    console.log(wrappedFunction)
    cardBoard.addEventListener("click", wrappedFunction)
  });
})

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

function openCardsFromOneToArgumentNumber(domElem, arrNumbers, numberOfCardsToOpen) {
  const arrayOfIndexes = obtainArrayOfIndexesFromOneToArgumentNumber(arrNumbers, numberOfCardsToOpen);
  arrayOfIndexes.map(elem => {
    setTimeout(()=>{
      domElem.children[elem].children[0].classList.add("rotate");
    })
    setTimeout(()=>{
      domElem.children[elem].children[0].classList.remove("rotate");
    }, 2000)
  })
  return arrayOfIndexes;
}

// Event listener functions
function clickBoardHandler(e, boardDOM, buttonDom) {
  console.log(startingValue + ' function clickBoardHandler')
  if(e.target.className === "card-back" && parseInt(e.target.parentNode.dataset.cardNumber) === startingValue) {
    arrayOfIndexes.pop();
    console.log(arrayOfIndexes.length + 'Array length')
    if(!arrayOfIndexes.length){
      startingValue = 1;
      level++;
      boardDOM.innerHTML = `<h2>You Won!!!</h2>`
      setTimeout(()=>{buttonDom.click()},1500);
      return
    }
    e.target.parentNode.style.transform = 'rotateY(180deg)';
    console.log('You won and should not be here')
    startingValue++
  } else if(e.target.className === "card-back" && parseInt(e.target.parentNode.dataset.cardNumber) !== startingValue) {

    boardDOM.innerHTML = `<h2>You Lost!!!</h2>`
    console.log('Works twice')
    startingValue = 1;
  }
}

function eventHandlerWrapper(arg1, arg2, myFunction) {
  return function(e) {
    myFunction(e, arg1, arg2);
  };
}