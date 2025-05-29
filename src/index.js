import "./style.css";
import { GameCard } from "./game-logic/GameCard.js";

const gameCard = new GameCard("rock", "win");

const main = document.querySelector(".game-board");
main.appendChild(gameCard.card);
