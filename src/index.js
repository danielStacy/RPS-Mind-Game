import "./style.css";
import { GameCard } from "./game-logic/GameCard.js";
import { Validator } from "./game-logic/Validator.js";
import { RPSRound } from "./game-logic/RPSRound.js";
import {
  getRandomHand,
  getRandomDirective,
  matchResultDirective,
} from "./game-logic/helpers.js";

let playerHand, computerHand, directive, card, round, result;

const gameBoard = document.querySelector(".game-board");
const btnNodeList = document.querySelectorAll(".btn-hand");
btnNodeList.forEach((btn) => {
  btn.addEventListener("click", () => {
    playerHand = btn.textContent;
    playRound();
  });
});

setupRound();

function setupRound() {
  gameBoard.innerHTML = "";
  computerHand = getRandomHand();
  directive = getRandomDirective();
  card = new GameCard(computerHand, directive);
  gameBoard.appendChild(card.card);
}

function playRound() {
  round = new RPSRound(playerHand, computerHand);
  result = matchResultDirective(round.result, directive);
  disableButtons(true);
  result
    ? (card.card.style.backgroundColor = "lightgreen")
    : (card.card.style.backgroundColor = "red");
  setTimeout(() => {
    setupRound();
    disableButtons(false);
  }, 1000);
}

function disableButtons(disabled = true) {
  btnNodeList.forEach((btn) => (btn.disabled = disabled));
}
