const [rock, paper, scissors] = ["rock", "paper", "scissors"];
const validHands = [rock, paper, scissors];
const [win, lose, tie] = ["win", "lose", "tie"];
const validDirectives = [win, lose, tie];

/**
 * Validator object for the Rock Paper Scissors, but Different game.
 * Validates and provides valid hands and directives.
 */
export const Validator = {
  /**
   * Validates a hand.
   * @param {string} hand
   * @returns {bool}
   */
  isValidHand: (hand) => validHands.includes(hand),
  /**
   * Validates a directive.
   * @param {string} dir
   * @returns {bool}
   */
  isValidDirective: (dir) => validDirectives.includes(dir),
  /**
   * @returns {string[]} Array of valid hand strings.
   */
  get validHands() {
    return [...validHands];
  },
  /**
   * @returns {string[]} Array of valid directive strings.
   */
  get validDirectives() {
    return [...validDirectives];
  },

  /**
   * @returns {string} rock as a string
   */
  get rock() {
    return rock;
  },

  /**
   * @returns {string} paper as a string
   */
  get paper() {
    return paper;
  },

  /**
   * @returns {string} scissors as a string
   */
  get scissors() {
    return scissors;
  },

  /**
   * @returns {string} win as a string
   */
  get win() {
    return win;
  },

  /**
   * @returns {string} tie as a string
   */
  get tie() {
    return tie;
  },

  /**
   * @returns {string} lose as a string
   */
  get lose() {
    return lose;
  }
};
