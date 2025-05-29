const validHands = ["rock", "paper", "scissors"];
const validDirectives = ["win", "lose", "tie"];

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
};
