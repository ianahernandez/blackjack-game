/*
2C: 2 de Clubs (Tréboles)
2D: 2 de Diamonds (Diamantes)
2H: 2 de Hearts (Corazones)
2S: 2 de Spades (Espadas)
*/

/* Variables */
let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];
let pointsPlayer = 0,
  pointsComputer = 0;

/* Funciones */

const createDeck = () => {

  let newDeck = []

  for (let i = 2; i <= 10; i++) {
    for (ctype of types) {
      newDeck.push(`${i}${ctype}`)
    }
  }

  for (ctype of types) {
    for (let special of specials) {
      newDeck.push(`${special}${ctype}`)
    }
  }

  deck = _.shuffle(newDeck);
  return deck;
}

createDeck();

const takeADeck = () => {
  const deckRandom = deck.pop();
  return deckRandom;
}

const deckValue = (deck) => {
  const value = deck.substring(0, deck.length - 1);
  return !isNaN(value) ? parseInt(value) : (value === 'A') ? 11 : 10;
}

const computerTurn = (minPoints) => {
  do {
    const deck = takeADeck();
    pointsComputer = pointsComputer + deckValue(deck);
    labelPoints[1].innerText = pointsComputer;

    const imgDeck = document.createElement('img');
    imgDeck.src = `./assets/cartas/${deck}.png`;
    imgDeck.classList.add('deck');
    computerDecks.append(imgDeck);

    if (minPoints > 21) {
      break;
    }

  } while ((pointsComputer < minPoints) && (minPoints <= 21));

  setTimeout( () => {
    if (pointsComputer === pointsPlayer || (pointsComputer > 21 && pointsPlayer > 21)) {
      alert("Nadie gana :(");
    } else if (pointsComputer < pointsPlayer && pointsComputer <= 21 && (pointsPlayer!=21)) {
      alert("Gana la computadora");
    } else if (pointsPlayer < pointsComputer && pointsPlayer <= 21 && (pointsComputer!=21)) {
      alert("Ganaste");
    }
  },50)
    
}

/* Referencias HTML */

const buttonNew = document.querySelector('#button-new');
const buttonTake = document.querySelector('#button-take');
const buttonStop = document.querySelector('#button-stop');
const labelPoints = document.querySelectorAll('small');
const playerDecks = document.querySelector('#player-decks');
const computerDecks = document.querySelector('#computer-decks');


/* Eventos */
buttonTake.addEventListener('click', () => {
  const deck = takeADeck();
  pointsPlayer = pointsPlayer + deckValue(deck);
  labelPoints[0].innerText = pointsPlayer;

  const imgDeck = document.createElement('img');
  imgDeck.src = `./assets/cartas/${deck}.png`;
  imgDeck.classList.add('deck');
  playerDecks.append(imgDeck);

  if (pointsPlayer >= 21) {
    buttonTake.disabled = true;
    buttonStop.disabled = true;
    computerTurn(pointsPlayer);
  }


});

buttonStop.addEventListener('click', () => {
  buttonTake.disabled = true;
  buttonStop.disabled = true;
  computerTurn(pointsPlayer);
});

buttonNew.addEventListener('click', () => {
  buttonTake.disabled = false;
  buttonStop.disabled = false;

  createDeck();

  playerDecks.innerHTML = "";
  computerDecks.innerHTML = "";

  pointsPlayer = 0;
  pointsComputer = 0;
  labelPoints[0].innerText = 0;
  labelPoints[1].innerText = 0;
});


