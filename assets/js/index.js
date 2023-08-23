document.addEventListener("DOMContentLoaded", function() {
  const cardBoard = document.querySelector('#card-board');
  const startButton = document.querySelector('#start-button');

  let numberOfCards = 20;
  let arrNumbers = generateArrayFromOneToArgumentNumber(numberOfCards);
  cardBoard.innerHTML = generateCardsHTML(arrNumbers);
  


  startButton.addEventListener("click", () => {
    let startingValue = 1
    const shuffledArray = shuffleArray(arrNumbers);
    cardBoard.innerHTML = generateCardsHTML(shuffledArray);
    cardBoard.addEventListener("click", (e) => {
      if(e.target.className === "card-back" && e.target.parentNode.dataset.cardNumber == startingValue) {
        e.target.parentNode.style.transform = 'rotateY(180deg)';
        console.log(e.target.parentNode.dataset.cardNumber)
        startingValue++
      }
    })
    console.log(openCardsFromOneToArgumentNumber(cardBoard, shuffledArray, 1))
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

// function generateArrayOfRandomIndexes(arrNumbers, numberOfCardsToOpen) {
//   let arrayOfRandomIndexes = []
//   for (let index = 0; index < numberOfCardsToOpen; index++) {
//     arrayOfRandomIndexes.push(selectRandomArrayIndex(arrNumbers));
//   }
//   return arrayOfRandomIndexes
// }

// function openCardsRandomly(domElem, arrNumbers, numberOfCardsToOpen) {
//   const arrayOfRandomIndexes = generateArrayOfRandomIndexes(arrNumbers, numberOfCardsToOpen);
//   const cardsToPick = []
//   arrayOfRandomIndexes.map(item => {
//     cardsToPick.push(domElem.children[item].children[0].dataset.cardNumber)
//     setTimeout(()=>{
//     domElem.children[item].children[0].classList.add("rotate");
//     }, 0)
//     setTimeout(()=>{
//       domElem.children[item].children[0].classList.remove("rotate");
//     }, 2000)
//   });
//   return cardsToPick;
// }

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