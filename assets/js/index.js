document.addEventListener("DOMContentLoaded", function() {
	const cardBoard = document.querySelector('#card-board');
	let cardsHTML = '';
	for (let index = 0; index < 20; index++) {
		cardsHTML += 
		`<div class="card-container">
				<div class="card">
					<div class="card-front">
						${index}
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