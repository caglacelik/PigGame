'use strict';

// Selecting elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');

const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

const buttonNew = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const initialization = () => {

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0Element.textContent = 0;
    score1Element.textContent = 0;

    current0Element.textContent = 0;
    current1Element.textContent = 0;

    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');
    player0Element.classList.add('player--active');
    player1Element.classList.remove('player--active');

    diceElement.classList.add('hidden');
}

initialization();

const switchPlayer = () => {

    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
};

buttonRoll.addEventListener('click', () => {

    if (playing) {

        // generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // display dice
        diceElement.classList.remove('hidden');
        diceElement.src = `dice-${dice}.png`;
        // check for rolled 1: if true, switch to next player
        if (dice !== 1) {
            // add dice to the current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        // switch next player
        else
            switchPlayer();
    }
});

buttonHold.addEventListener('click', () => {

    if (playing) {
        // add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // check if player's score >=100 finish the game
        if (scores[activePlayer] >= 100) {
            playing = false;
            diceElement.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        // switch next player
        else
            switchPlayer();
    }
});

buttonNew.addEventListener('click', initialization);

