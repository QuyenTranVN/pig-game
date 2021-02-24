"use strict";
// Select Elements
const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const currentScore0 = document.querySelector("#current--0");
const currentScore1 = document.querySelector("#current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

// Starting conditions
let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  currentScore0.textContent = currentScore1.textContent = 0;
  score0El.textContent = score1El.textContent = 0;
  diceEl.classList.add("hidden");
  player0El.classList.remove("play--winner");
  player1El.classList.remove("play--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();
const switchPlayer = function () {
  if (playing) {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
  }
};
btnRoll.addEventListener("click", function () {
  // 1. generating random dice
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);
    console.log(dice);
    //2. display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    //   3. check for roll 1
    if (dice !== 1) {
      currentScore = currentScore + dice;
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore;
      // currentScore0.textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] = scores[activePlayer] + currentScore;

    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 50) {
      playing = false;
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("play--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    }
    switchPlayer();
  }
});
btnNew.addEventListener("click", init);
