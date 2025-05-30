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
  #element;
  #result;

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
    this.#element = this.#createCard();
  }

  /**
   * @returns {HTMLElement} Div element representing this GameCard instance.
   */
  get element() {
    return this.#element;
  }

  /**
   * @returns {string} The rock-paper-scissors hand for the card object.
   */
  get hand() {
    return this.#hand;
  }

  /**
   * @returns {string} The rock-paper-scissors directive for the card object.
   */
  get directive() {
    return this.#directive;
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

  /**
   * Hides the card from the DOM.
   */
  hide() {
    this.#element.style.visibility = "hidden";
  }

  /**
   * Shows the card within the DOM.
   */
  show() {
    this.#element.style.visibility = "visible";
  }

  /**
   * Adds a correct class to the card element.
   * Allows for css styling to be selected with `.correct`.
   * Removes any incorrect class for the element.
   */
  addCorrectClass() {
    this.#element.classList.remove("incorrect");
    this.#element.classList.add("correct");
  }

  /**
   * Adds an incorrect class to the card element.
   * Allows for css styling to be selected with `.incorrect`.
   * Removes any correct class for the element.
   */
  addIncorrectClass() {
    this.#element.classList.remove("correct");
    this.#element.classList.add("incorrect");
  }
}
