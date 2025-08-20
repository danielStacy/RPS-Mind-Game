import "./style.css";
import { GameBoard } from "./game-logic/GameBoard.js";
import { GameController } from "./game-logic/GameController.js";

const howToBtn = document.querySelector("#how-to-btn");
const howToModal = document.querySelector(".modal.how-to-play");
const modalCloseBtn = document.querySelector(".close-modal-btn");

const gameBoardElement = document.querySelector(".game-board");
const buttonNodeList = document.querySelectorAll(".btn-hand");

howToBtn.addEventListener("click", () => {
  gameController.disableInput();
  howToModal.style.visibility = "visible";
});

modalCloseBtn.addEventListener("click", () => {
  howToModal.style.visibility = "hidden";
  gameController.enableInput();
})

const gameBoard = new GameBoard(gameBoardElement, buttonNodeList);
const gameController = new GameController(gameBoard);

gameController.startGame();
