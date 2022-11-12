'use strict';
let currentPointsPlayer = 0;
let holdPointsPlayerOne = 0;
let holdPointsPlayerTwo = 0;

const holdPoints = document.querySelector('.btn--hold');
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
const diceImage = document.getElementById('img');
const btnRollDice = document.querySelector('.btn--roll');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const setCurrentPoints = function () {
  playerOne.classList.contains('player--active')
    ? (document.querySelector('#current--0').textContent = currentPointsPlayer)
    : (document.querySelector('#current--1').textContent = currentPointsPlayer);
};

const setHoldPoints = function (currentPointsPlayer) {
  playerOne.classList.contains('player--active')
    ?(holdPointsPlayerOne += currentPointsPlayer) && (document.querySelector('#score--0').textContent = holdPointsPlayerOne) 
    : (holdPointsPlayerTwo += currentPointsPlayer) && (document.querySelector('#score--1').textContent = holdPointsPlayerTwo);
};

const changeDiceImage = function (number) {
  diceImage.src = `dice-${number}.png`;
};

const changePlayer = function () {
  playerOne.classList.toggle('player--active');
  playerTwo.classList.toggle('player--active');
};

let rollDice = function () {
  diceImage.classList.remove('hidden');
  let number = Math.trunc(Math.random() * 6) + 1;
  if (number === 1) {
    changeDiceImage(number);
    currentPointsPlayer = 0;
    setCurrentPoints();
    changePlayer();
  } else {
    changeDiceImage(number);
    currentPointsPlayer += number;
    setCurrentPoints();
  }
};

btnRollDice.addEventListener('click', rollDice);

const holdPointsFunction = function () {

  setHoldPoints(currentPointsPlayer);
  currentPointsPlayer = 0;
  setCurrentPoints();
  changePlayer();

  if (holdPointsPlayerOne >= 100) {
    playerOne.classList.add('player--winner');
    btnRollDice.classList.add('hidden');
    holdPoints.classList.add('hidden');
    openModal();
    const hOne = document.getElementById('h1');

    hOne.textContent += `Congratulations to the player number 1 🎉🎉🎉  Your score is: ${holdPointsPlayerOne}`;
  } else if (holdPointsPlayerTwo >= 100) {
    playerTwo.classList.add('player--winner');
    btnRollDice.classList.add('hidden');
    holdPoints.classList.add('hidden');
    openModal();
    const hOne = document.getElementById('h1');

    hOne.textContent += `Congratulations to the player number 2 🎉🎉🎉  Your score is: ${holdPointsPlayerTwo}`;
  }
};

holdPoints.addEventListener('click', holdPointsFunction);

//Reload Page after New Game pressed
const btnNewGame = document.querySelector('.btn--new');
const reloadPage = function () {
  location.reload();
};
btnNewGame.addEventListener('click', reloadPage);
