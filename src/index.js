import "./style.css";
import { GameCard } from "./game-logic/GameCard.js";
import { Validator } from "./game-logic/Validator.js";
import { RPSRound } from "./game-logic/RPSRound.js";
import {
  getRandomHand,
  getRandomDirective,
  matchResultDirective,
  getRandomHandVector,
  getRandomDirectiveVector,
} from "./game-logic/helpers.js";

const gameBoard = document.querySelector(".game-board");
const btnNodeList = document.querySelectorAll(".btn-hand");

let playerHand, computerHand, directive, card, round, result;
let winCount = 0;
let loseCount = 0;
let gameCount = 0;
let cardIndex = 0;

setupRound();

function setupRound() {
  clearGameBoard();
  if (winCount < 3) {
    setupEasy();
  } else if (winCount < 8) {
    setupMedium();
  } else {
    if (cardIndex === 0 || cardIndex === 2) {
      setupHard();
    }
  }
  if (cardIndex === 0 || cardIndex === 2) {
    gameCount++;
  }
}

function clearGameBoard() {
  gameBoard.innerHTML = "";
  clearButtons();
  playerHand = null;
  computerHand = null;
  directive = null;
  card = null;
  round = null;
  result = null;
  cardIndex = 0;
}

function setupEasy() {
  computerHand = getRandomHand();
  directive = getRandomDirective();
  card = new GameCard(computerHand, directive);
  gameBoard.appendChild(card.element);
  setupEasyButtons();
}

function setupEasyButtons() {
  btnNodeList.forEach((btn) => {
    btn.addEventListener("click", handleEasyClick);
  });
}

function handleEasyClick(event) {
  playerHand = event.target.textContent;
  playEasyRound();
}

function clearButtons() {
  if (btnNodeList.length === 0) return;
  btnNodeList.forEach((btn) => {
    btn.removeEventListener("click", handleEasyClick);
  });
}

function playEasyRound() {
  round = new RPSRound(playerHand, computerHand);
  result = matchResultDirective(round.result, directive);
  disableButtons(true);
  result
    ? (card.element.style.backgroundColor = "lightgreen")
    : (card.element.style.backgroundColor = "red");
  result ? winCount++ : loseCount++;
  setTimeout(() => {
    setupRound();
    disableButtons(false);
  }, 1000);
}

function disableButtons(disabled = true) {
  btnNodeList.forEach((btn) => (btn.disabled = disabled));
}

function pause(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function setupMedium() {
  disableButtons(true);
  computerHand = getRandomHand();
  directive = getRandomDirective();
  card = new GameCard(computerHand, directive);
  gameBoard.appendChild(card.element);
  setTimeout(card.hide.bind(card), 1000);
  await pause(1000);
  disableButtons(false);
  setupMediumButtons();
}

function setupMediumButtons() {
  btnNodeList.forEach((btn) => {
    btn.addEventListener("click", handleMediumClick);
  });
}

function handleMediumClick(event) {
  playerHand = event.target.textContent;
  playMediumRound();
}

function playMediumRound() {
  round = new RPSRound(playerHand, computerHand);
  card.show();
  result = matchResultDirective(round.result, directive);
  disableButtons(true);
  result
    ? (card.element.style.backgroundColor = "lightgreen")
    : (card.element.style.backgroundColor = "red");
  result ? winCount++ : loseCount++;
  setTimeout(() => {
    setupRound();
    disableButtons(false);
  }, 1000);
}

// hard level - needs a lot of cleaning up

function setupHard() {
  const nHands = 3;
  disableButtons(true);
  card = [];
  for (let i = 0; i < nHands; i++) {
    card.push(new GameCard(getRandomHand(), getRandomDirective()));
    gameBoard.appendChild(card[i].element);
    setTimeout(card[i].hide.bind(card[i]), 2000);
  }
  disableButtons(false);
  setupHardButtons();
}

function setupHardButtons() {
  btnNodeList.forEach((btn) => {
    btn.addEventListener("click", handleHardClick);
  });
}

function handleHardClick(event) {
  playerHand = event.target.textContent;
  playHardRound();
}

function playHardRound() {
  round = new RPSRound(playerHand, card[cardIndex].hand);
  card[cardIndex].show();
  result = matchResultDirective(round.result, card[cardIndex].directive);
  disableButtons(true);
  result
    ? (card[cardIndex].element.style.backgroundColor = "lightgreen")
    : (card[cardIndex].element.style.backgroundColor = "red");
  result ? winCount++ : loseCount++;
  if (cardIndex === 2) {
    setTimeout(() => {
      setupRound();
      disableButtons(false);
    }, 1000);
  } else {
    setTimeout(() => {
      disableButtons(false);
    }, 100);
  }
  cardIndex++;
}
