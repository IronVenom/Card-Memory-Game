const cards = document.querySelectorAll('.memory-card');
const scoreText = document.querySelector('#score');
const resultText = document.querySelector('#results');
const resetButton = document.querySelector('#reset');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let tries = 0;

function flipCard(){
	if (lockBoard) return;
	if (this === firstCard) return;
	this.classList.toggle('flip');
	tries += 1;
	scoreText.innerHTML = Math.floor(tries/2);
	if(!hasFlippedCard){
		hasFlippedCard = true;
		firstCard = this;
		return;
	}
	secondCard = this;
	checkForMatch();
}

function checkForMatch(){
	let isMatch = firstCard.dataset.movie === secondCard.dataset.movie;
	isMatch ? disableCards() : unflipCards();
}

function disableCards(){
	firstCard.removeEventListener('click',flipCard);
	secondCard.removeEventListener('click',flipCard);
	score += 1;
	if (score === 6){
		resultText.innerHTML = "Congrats! You won and took " + String(tries/2) + " tries to complete the game!";
	}
	resetBoard();
}

function unflipCards(){
	lockBoard = true;
	setTimeout(()=>{
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');
		resetBoard();
	},1500);
}

function resetBoard(){
	[hasFlippedCard,lockBoard] = [false,false];
	[firstCard,secondCard] = [null,null];
}

(function shuffle(){
	cards.forEach(card=>{
		let randomPos = Math.floor(Math.random()*12);
		card.style.order = randomPos;
	})
})();

resetButton.addEventListener('click',function(){location.reload();});
cards.forEach(card => card.addEventListener('click',flipCard))