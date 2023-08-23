document.addEventListener("DOMContentLoaded", function() {
  const cardBoard = document.querySelector('#card-board');
  const startButton = document.querySelector('#start-button');

  let numberOfCards = 20;
  let arrNumbers = generateArrayFromOneToArgumentNumber(numberOfCards);
  cardBoard.innerHTML = generateCardsHTML(arrNumbers);
  


  startButton.addEventListener("click", () => {
    cardBoard.innerHTML = generateCardsHTML(shuffleArray(arrNumbers));
    cardBoard.addEventListener("click", (e) => {
      if(e.target.className === "card-back") {
        e.target.parentNode.style.transform = 'rotateY(180deg)';
        console.log(e.target.parentNode.dataset.cardNumber)
      }
    })
    console.log(generateArrayOfRandomIndexes(arrNumbers, 3))
    openCardsRandomly(cardBoard, arrNumbers, 5)
  });
})

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

function generateArrayOfRandomIndexes(arrNumbers, numberOfCardsToOpen) {
  let arrayOfRandomIndexes = []
  for (let index = 0; index < numberOfCardsToOpen; index++) {
    arrayOfRandomIndexes.push(selectRandomArrayIndex(arrNumbers));
  }
  return arrayOfRandomIndexes
}

function openCardsRandomly(domElem, arrNumbers, numberOfCardsToOpen) {
  const arrayOfRandomIndexes = generateArrayOfRandomIndexes(arrNumbers, numberOfCardsToOpen);
  arrayOfRandomIndexes.map(item => {
    console.log(domElem.children[item].children[0])
    domElem.children[item].children[0].style.transform = 'rotateY(180deg)';
  });
}