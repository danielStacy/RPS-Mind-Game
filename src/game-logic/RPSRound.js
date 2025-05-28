import { InvalidHandError } from "./InvalidHandError.js";

/**
 * Class for a single round of rock-paper-scissors.
 */
export class RPSRound {
  #player1Hand;
  #player2Hand;
  #result;

  /**
   * Constructor for the RPSRound class.
   * @param {string} player1Hand The hand string for player 1: "rock", "paper", or "scissors".
   * @param {string} player2Hand The hand string for player 2: "rock", "paper", or "scissors".
   * @throws Error on an invalid hand input. Not case sensitive.
   */
  constructor(player1Hand, player2Hand) {
    const p1 = player1Hand.toLowerCase();
    const p2 = player2Hand.toLowerCase();
    if (!this.#validateHand(p1) || !this.#validateHand(p2)) {
      const errorMsg =
        (!this.#validateHand(p1) && !this.#validateHand(p2)
          ? `Invalid state: '${p1}', '${p2}' are not valid hands.`
          : !this.#validateHand(p1)
          ? `Invalid state: ${p1} is not valid.`
          : `Invalid state: ${p2} is not valid.`) +
        " Valid hands are: 'rock', 'paper', or 'scissors'.";
      throw new InvalidHandError(errorMsg);
    }
    this.#player1Hand = p1;
    this.#player2Hand = p2;
    this.#setResult();
  }

  /**
   * Accessor for the player1 hand state.
   * @returns {string} The hand state for player 1 as a string: "rock", "paper", or "scissors".
   */
  get player1Hand() {
    return this.#player1Hand;
  }

  /**
   * Accessor for the player2 hand state.
   * @returns {string} The hand state for player 2 as a string: "rock", "paper", or "scissors".
   */
  get player2Hand() {
    return this.#player2Hand;
  }

  /**
   * Accessor for the round result state.
   * @returns {string} The result state for the round as a string,
   * indicating the winning player or a tie: "player1", "player2", "tie".
   */
  get result() {
    return this.#result;
  }

  /**
   * State validation method for the player1 and player2 hand state.
   * @param {string} hand The hand to be validated.
   * @returns {boolean} True is the hand  for that player is valid,
   * otherwise false.
   */
  #validateHand(hand) {
    return ["rock", "paper", "scissors"].includes(hand);
  }

  /**
   * Sets the result state for the round as a string,
   * indicating the winning player or a tie: "player1", "player2", "tie".
   */
  #setResult() {
    if (this.#player1Hand === this.#player2Hand) {
      // tie
      this.#result = "tie";
    } else if (
      // player1 wins
      (this.#player1Hand === "rock" && this.#player2Hand === "scissors") ||
      (this.#player1Hand === "paper" && this.#player2Hand === "rock") ||
      (this.#player1Hand === "scissors" && this.#player2Hand === "paper")
    ) {
      this.#result = "player1";
    } else {
      // player2 wins
      this.#result = "player2";
    }
  }
}
