'use strict';

// Selecting elemnets
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); // dont have to specify selectory can write id name directly
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const scores = [0, 0];
//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;

diceEl.classList.add('hidden');

let currentScore = 0;

// player number1 is 0 and player number 2 is 1
let activePlayer = 0;
let playing = true;

function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // generate a random dice role
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // check if the rolled value is 1
    if (dice !== 1) {
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // change later for player 1 and player 2
    } else {
      // switch to next player
      // previouseActivePlayer = document.querySelector(`.player--${activePlayer}`);
      // previouseActivePlayer.classList.remove('.player--active');
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // currentScore = 0;
      // player0El.classList.toggle('player--active'); // toogle will remove class if its already in class list
      // player1El.classList.toggle('player--active'); // if not class in classList toggle will add the class in classList
      // remove is player--active class from class name of current user and add to other player
      // if else from html class name to know which player
      // set current score to 0
      switchPlayer();
    }
    // add score to the current core
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    // adds the current score to the player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // checks the current score of active player if its equal or gerater than 100 player wins and finish the game
    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');

      //finsish the game
    }

    // if score not equals to 100 sets current-score of the player to zero
    // switch the player
    else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;

      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', () => {
  currentScore = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  if (player0El.classList.contains('player--active')) {
  } else {
    player0El.classList.add('player--active');
    activePlayer = 0;
    playing = true;
  }
});
