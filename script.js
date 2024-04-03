const symbols = ['♠️', '♥️', '♣️', '♦️', '🌟', '☘️', '⚡', '⚽', '🌹'];

const cards = [...symbols, ...symbols];

let flippedCards = [];
let matchedCards = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCard(symbol) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');
  cardElement.dataset.symbol = symbol;
  const front = document.createElement('div');
  front.classList.add('front');
  const back = document.createElement('div');
  back.classList.add('back');
  back.innerText = symbol;
  cardElement.appendChild(front);
  cardElement.appendChild(back);
  cardElement.addEventListener('click', flipCard);
  return cardElement;
}

function flipCard() {
  if (flippedCards.length < 2 && !flippedCards.includes(this) && !this.classList.contains('flipped')) {
    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const symbol1 = card1.dataset.symbol;
  const symbol2 = card2.dataset.symbol;

  if (symbol1 === symbol2) {
    matchedCards.push(card1, card2);
    if (matchedCards.length === cards.length) {
      alert('Congratulations! You won!');
    }
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
  }

  flippedCards = [];
}

function initGame() {
  const shuffledCards = shuffle(cards);
  const cardContainer = document.getElementById('cardContainer');

  shuffledCards.forEach(symbol => {
    const card = createCard(symbol);
    cardContainer.appendChild(card);
  });
}

initGame();
