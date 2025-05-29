import { Validator } from "./Validator";

import rockImg from "../img/rock.svg";
import paperImg from "../img/paper.svg";
import scissorsImg from "../img/scissors.svg";

/**
 * GameCard class used to create DOM elements representing one single question
 * in the Rock Paper Scissors, but Different game.
 */
export class GameCard {
  #hand;
  #directive;
  #card;

  /**
   * Constructor for a GameCard object.
   * @param {string} hand The computer's hand for the GameCard object
   * @param {string} directive The directive for the GameCard object
   */
  constructor(hand, directive) {
    if (!Validator.isValidHand(hand.toLowerCase())) {
      throw new Error("Invalid hand.");
    }
    if (!Validator.isValidDirective(directive.toLowerCase())) {
      throw new Error("Invalid directive.");
    }
    this.#hand = hand.toLowerCase();
    this.#directive = directive.toLowerCase();
    this.#card = this.#createCard();
  }

  /**
   * @returns {HTMLElement} Div element representing this GameCard instance.
   */
  get card() {
    return this.#card;
  }

  /**
   * Creates the DOM element for the GameCard object.
   * Creates the game card div, image container, image content, directive
   * container, and directive text.
   * All appended to the game card div.
   *
   * Class names: "game-card", "img-container", "dir-container".
   * "game-card" contains both "img-container" and "dir-container" divs.
   * "img-container" contains an img element for the played hand.
   * "dir-container" contains a p element for the directive.
   *
   * @return {HTMLDivElement} The div representing the GameCard.
   */
  #createCard() {
    const gameCard = document.createElement("div");
    gameCard.className = "game-card";
    // Image container
    const imgContainer = document.createElement("div");
    imgContainer.className = "img-container";
    imgContainer.appendChild(this.#createHandImg());
    // Directive Container
    const dirContainer = document.createElement("div");
    dirContainer.className = "dir-container";
    const dirText = document.createElement("p");
    dirText.textContent = this.#directive.toUpperCase();
    dirContainer.appendChild(dirText);
    // Assemble
    gameCard.appendChild(imgContainer);
    gameCard.appendChild(dirContainer);

    return gameCard;
  }

  /**
   * Matches and create the appropriate SVG image for the hand.
   * @returns {HTMLElement} The img element representing the GameCard
   * object's hand.
   */
  #createHandImg() {
    const img = document.createElement("img");
    img.alt = this.#hand;
    switch (this.#hand) {
      case "rock":
        img.src = rockImg;
        break;
      case "paper":
        img.src = paperImg;
        break;
      case "scissors":
        img.src = scissorsImg;
        break;
      default:
        // Should never default (due to Validator in constructor).
        throw new Error("Invalid hand.");
    }
    return img;
  }
}
