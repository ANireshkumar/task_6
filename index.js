const cardValues = ["A", "B", "C", "D", "E", "F", "G", "H"];
let cardDeck = [...cardValues, ...cardValues];
let firstCard, secondCard;
let lockBoard = false;
let matchedCards = 0;

const gameBoard = document.getElementById("game-board");
const restartButton = document.getElementById("restart-button");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCard(value) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.value = value;
  card.innerText = "?";
  card.addEventListener("click", flipCard);
  return card;
}

function init() {
  matchedCards = 0;
  lockBoard = false;
  gameBoard.innerHTML = "";
  shuffle(cardDeck);
  cardDeck.forEach((value) => {
    const card = createCard(value);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (
    lockBoard ||
    this.classList.contains("flipped") ||
    this.classList.contains("matched")
  )
    return;

  this.classList.add("flipped");
  this.innerText = this.dataset.value;

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    lockBoard = true;
    checkForMatch();
  }
}

function checkForMatch() {
  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetTurn();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      firstCard.innerText = "?";
      secondCard.classList.remove("flipped");
      secondCard.innerText = "?";
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

restartButton.addEventListener("click", init);

init();
