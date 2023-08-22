document.addEventListener("DOMContentLoaded", function() {
	const cardBoard = document.querySelector('#card-board');
	let cardsHTML = '';
	let arrNumbers = [];
	let numberOfCards = 20;

  for (let index = 0; index < numberOfCards; index++) {
    arrNumbers.push(index + 1);
  }

  arrNumbers = shuffleArray(arrNumbers);

	for (let index = 0; index < numberOfCards; index++) {
		cardsHTML += 
		`<div class="card-container">
				<div class="card">
					<div class="card-front">
						${arrNumbers[index]}
					</div>
					<div class="card-back">
					</div>
				</div>
			</div>`;
			}
	cardBoard.innerHTML = cardsHTML
	cardBoard.addEventListener("click", (e) => {
		if(e.target.className === "card-back") {
			e.target.parentNode.style.transform = 'rotateY(180deg)';
		}
	})
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