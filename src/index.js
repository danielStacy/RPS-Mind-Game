import "./style.css";
import { GameBoard } from "./game-logic/GameBoard.js";
import { GameController } from "./game-logic/GameController.js";

const howToBtn = document.querySelector("#how-to-btn");
const hotToModal = document.querySelector(".modal.how-to-play");
const modalCloseBtn = document.querySelector(".close-modal");

const gameBoardElement = document.querySelector(".game-board");
const buttonNodeList = document.querySelectorAll(".btn-hand");

howToBtn.addEventListener("click", () => {
  hotToModal.style.visibility = "visible";
});

modalCloseBtn.addEventListener("click", () => {
  hotToModal.style.visibility = "hidden";
})

const gameBoard = new GameBoard(gameBoardElement, buttonNodeList);
const gameController = new GameController(gameBoard);

gameController.startGame();
