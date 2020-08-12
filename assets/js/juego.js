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

  for (let i = 2; i <= 10; i++) {
    for (ctype of types) {
      deck.push(`${i}${ctype}`)
    }
  }

  for (ctype of types) {
    for (let special of specials) {
      deck.push(`${special}${ctype}`)
    }
  }

  deck = _.shuffle(deck);

  return deck;
}

createDeck();

const takeADeck = () => {
  const deckRandom = deck.pop();
  return deckRandom;
}

const deckValue = ( deck ) => {
  const value = deck.substring(0, deck.length - 1);
  return !isNaN(value) ? parseInt(value) : (value === 'A') ? 11 : 10;
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

  if( pointsPlayer > 21 ){
    console.warn("perdiste")
    buttonTake.disabled = true;
  }

  if( pointsPlayer === 21 ) {
    console.info("GANASTE")
  }

});


