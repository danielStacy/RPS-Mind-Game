import { GameCard } from "./GameCard.js";

const handSelectEvent = "handSelect";

/**
 * The GameBoard class manages cards for the Rock Paper Scissors, but Different
 * game.
 */
export class GameBoard {
  #cards = [];
  #buttons = [];
  #currentIndex = 0;
  #boardElement;

  /**
   * Constructor for the Gameboard class.
   * @param {HTMLElement} boardElement HTML element for the game board.
   * @param {NodeList} buttonsNodeList Node list for the HTML button node list.
   */
  constructor(boardElement, buttonsNodeList) {
    this.#boardElement = boardElement;
    // Confusing. Rewrite. Maybe modularise.
    this.#buttons = Array.from(buttonsNodeList).map((btn) => {
      const handler = (event) => {
        this.#boardElement.dispatchEvent(
          new CustomEvent(handSelectEvent, {
            detail: { hand: event.target.dataset.hand },
          })
        );
      };
      btn.addEventListener("click", handler);
      return { element: btn, handler };
    });
  }

  /**
   * Accessor for the hand selection event string.
   * @returns {string} The hand selection event string.
   */
  get handSelectEvent() {
    return handSelectEvent;
  }

  /**
   * Adds a card to the game board.
   * @param {string} hand The rock-paper-scissors hand for the card. `rock`,
   * `paper`, or `scissors`.
   * @param {string} directive The rock-paper-scissors directive for the card.
   * `win`, `lose`, or `tie`.
   */
  addCard(hand, directive) {
    const card = new GameCard(hand, directive);
    this.#cards.push(card);
    this.#boardElement.appendChild(card.element);
  }

  /**
   * Clears the game board.
   */
  clear() {
    this.#boardElement.innerHTML = "";
    this.#cards = [];
    this.#currentIndex = 0;
  }

  /**
   * @returns {HTMLElement} The GameBoard HTMLElement object.
   */
  get boardElement() {
    return this.#boardElement;
  }

  /**
   * Increments card index in the card array.
   * @returns {boolean} True if index was incremented. False if end of array.
   */
  nextCard() {
    if (!(this.#currentIndex < this.#cards.length - 1)) return false;
    this.#currentIndex++;
    return true;
  }

  /**
   * Decrements card index in the card array.
   * @returns {boolean} True if index was decremented. False if start of array.
   */
  prevCard() {
    if (!(this.#currentIndex > 0)) return false;
    this.#currentIndex--;
    return true;
  }

  /**
   * @returns {GameCard} The card at the current index position.
   */
  get card() {
    return this.#cards[this.#currentIndex];
  }

  /**
   * @returns {GameCard[]} The card array.
   */
  get allCards() {
    return this.#cards;
  }

  /**
   * Hides all cards from the DOM on the game board.
   * @returns {any}
   */
  hideCards() {
    for (const card of this.#cards) {
      card.hide();
    }
  }

  /**
   * Shows all cards from the DOM on the game board.
   * @returns {any}
   */
  showCards() {
    for (const card of this.#cards) {
      card.show();
    }
  }

  /**
   * Disables buttons from triggering clickable events.
   * Adds CSS class `disabled` to all buttns.
   */
  disableButtons() {
    this.#buttons.forEach((btn) => {
      btn.element.disabled = true;
      btn.element.classList.remove("enabled");
      btn.element.classList.add("disabled");
    });
  }

  /**
   * Enables buttons from triggering clickable events.
   * Adds CSS class `enabled` to all buttns.
   */
  enableButtons() {
    this.#buttons.forEach((btn) => {
      btn.element.disabled = false;
      btn.element.classList.remove("disabled");
      btn.element.classList.add("enabled");
    });
  }
}
