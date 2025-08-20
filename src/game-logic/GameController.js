import { GameCard } from "./GameCard.js";
import { GameBoard } from "./GameBoard.js";
import {
  getRandomHand,
  getRandomDirective,
  matchResultDirective,
} from "./helpers.js";
import { RPSRound } from "./RPSRound.js";

// Times in MS
const startRoundPause = 100;
const endRoundPause = 1000;
const mediumLevelShowCardPause = 1000;
const mediumLevelAfterHideCardPause = 500;
const hardLevelAfterHideCardPause = 500;
const hardLevelShowCardPause = 2000;

/**
 * The GameController class controls the Rock Paper Scissors but Different game.
 */
export class GameController {
  #gameBoard;
  #winCount = 0;
  #loseCount = 0;
  #gameCount = 0;
  #currentLevel = "easy";

  /**
   * Constructor of the GameController class.
   * @param {GameBoard} gameBoard The game board DOM element.
   */
  constructor(gameBoard) {
    this.#gameBoard = gameBoard;
  }

  /**
   * Starts the game.
   */
  startGame() {
    this.#startNextRound();
  }

  /**
   * Cleans up game board, selects the appropriate difficulty level, and starts
   * the next round of the game.
   */
  async #startNextRound() {
    this.#gameBoard.clear();
    this.#determineDifficulty();
    switch (this.#currentLevel) {
      case "easy":
        await this.#playEasyGame();
        break;
      case "medium":
        await this.#playMediumGame();
        break;
      case "hard":
        await this.#playHardGame();
        break;
      default:
        console.warn("Unknown difficulty level!");
        break;
    }
    this.#gameCount++;
    this.#startNextRound();
  }

  /**
   * Plays a round of the easy difficulty level.
   * Easy mode consists of a single game card.
   */
  async #playEasyGame() {
    this.disableInput();
    await this.#pause(startRoundPause);
    this.#gameBoard.addCard(getRandomHand(), getRandomDirective());
    this.enableInput();
    const playerHand = await this.#waitHandSelect();
    const result = await this.#playCard(playerHand, this.#gameBoard.card);
    await this.#pause(endRoundPause);
  }

  /**
   * Plays a round of the medium difficulty level.
   * Medium mode consists of a single, disappearing game card.
   */
  async #playMediumGame() {
    this.disableInput();
    await this.#pause(startRoundPause);
    this.#gameBoard.addCard(getRandomHand(), getRandomDirective());
    await this.#pause(mediumLevelShowCardPause);
    this.#gameBoard.card.hide();
    await this.#pause(mediumLevelAfterHideCardPause);
    this.enableInput();
    const playerHand = await this.#waitHandSelect();
    const result = await this.#playCard(playerHand, this.#gameBoard.card);
    await this.#pause(endRoundPause);
  }

  /**
   * Plays a round of the hard difficulty level.
   * Hard mode consists of three, disappearing game cards.
   */
  async #playHardGame() {
    const nCards = 3;
    this.disableInput();
    await this.#pause(startRoundPause);
    for (let i = 0; i < nCards; i++) {
      this.#gameBoard.addCard(getRandomHand(), getRandomDirective());
    }
    await this.#pause(hardLevelShowCardPause);
    this.#gameBoard.hideCards();
    await this.#pause(hardLevelAfterHideCardPause);
    this.enableInput();
    for (const card of this.#gameBoard.allCards) {
      const playerHand = await this.#waitHandSelect();
      const result = await this.#playCard(playerHand, card);
    }
    await this.#pause(endRoundPause);
  }

  /**
   * Plays a rock-paper-scissors round for a given card.
   * Updates the score and appends a correct/incorrect class to the card DOM
   * element.
   * @param {string} playerHand The player hand string for the
   * rock-paper-scissors round.
   * @param {GameCard} card The game card to play against.
   */
  async #playCard(playerHand, card) {
    const round = new RPSRound(playerHand, card.hand);
    const result = matchResultDirective(round.result, card.directive);
    this.#updateScore(result);
    this.#showResult(result, card);
  }

  /**
   * Updates the score private instance variable upon a round end.
   * @param {string} result The result string of a RPSRound object.
   */
  #updateScore(result) {
    result ? this.#winCount++ : this.#loseCount++;
  }

  /**
   * Displays and appends the correct/incorrect class to a card DOM element.
   * @param {string} result The result string of a RPSRound object.
   * @param {GameCard} card The previously played against game card to be scored.
   */
  #showResult(result, card) {
    card.show();
    result ? card.addCorrectClass() : card.addIncorrectClass();
  }

  /**
   * Determines the difficulty level dependent on the current winCount.
   * winCount 0-2: easy.
   * winCount 3-7: medium.
   * winCount 8+: hard.
   */
  #determineDifficulty() {
    if (this.#winCount < 3) this.#currentLevel = "easy";
    else if (this.#winCount < 8) this.#currentLevel = "medium";
    else this.#currentLevel = "hard";
  }

  /**
   * Pauses execution until a `hardSelect` event is captured.
   * Must use the `await` keyword when invoking this method in an async function.
   */
  #waitHandSelect() {
    return new Promise((resolve) => {
      const handler = (event) => {
        this.#gameBoard.boardElement.removeEventListener(
          this.#gameBoard.handSelectEvent,
          handler
        );
        resolve(event.detail.hand);
      };
      this.#gameBoard.boardElement.addEventListener(
        this.#gameBoard.handSelectEvent,
        handler
      );
    });
  }

  /**
   * Enables input for the game board buttons.
   */
  enableInput() {
    this.#gameBoard.enableButtons();
  }

  /**
   * Disables input for the game board buttons.
   * Allows input to be frozen until needed. Use the enableInput() method to re-
   * enable.
   */
  disableInput() {
    this.#gameBoard.disableButtons();
  }

  /**
   * Pauses execution of the game.
   * Must use `await` keyword within an async function.
   * @param {number} ms Pause time in milliseconds. 1000 ms = 1 s.
   */
  #pause(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
