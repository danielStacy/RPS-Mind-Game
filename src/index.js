import "./style.css";
import { GameBoard } from "./game-logic/GameBoard.js";
import { GameController } from "./game-logic/GameController.js";

const gameBoardElement = document.querySelector(".game-board");
const buttonNodeList = document.querySelectorAll(".btn-hand");

const gameBoard = new GameBoard(gameBoardElement, buttonNodeList);
const gameController = new GameController(gameBoard);

gameController.startGame();
