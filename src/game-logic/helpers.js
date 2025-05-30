import { Validator } from "./Validator";

/**
 * Generate a random integer from a discrete uniform distribution.
 * @param {number} min Minimum result of the discrete distribution.
 * @param {number} max Maximum result of the discrete distribution.
 * @returns {number} Random integer between min and max inclusive.
 */
export function getRandInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

/**
 * Generate a random hand for a rock-paper-scissors round.
 * @returns {string} "rock", "paper", or "scissors".
 */
export function getRandomHand() {
  return Validator.validHands[getRandInt(0, Validator.validHands.length - 1)];
}

/**
 * Generate a random vector of hands for n rock-paper-scissors rounds.
 * @param {number} n Number of random hands.
 * @returns {number[]} Array of random hands.
 */
export function getRandomHandVector(n) {
  if (n <= 0) return [];
  let randomHands = [];
  for (let i = 0; i < n; i++) {
    randomHands.push(getRandomHand());
  }
  return randomHands;
}

/**
 * Generate a random directive for a rock-paper-scissors round.
 * @returns {string} "win", "lose", or "tie".
 */
export function getRandomDirective() {
  return Validator.validDirectives[
    getRandInt(0, Validator.validDirectives.length - 1)
  ];
}

/**
 * Generate a random vector of directives for n rock-paper-scissors rounds.
 * @param {number} n Number of random directives.
 * @returns {number[]} Array of random directives.
 */
export function getRandomDirectiveVector(n) {
  if (n <= 0) return [];
  let randomDirectives = [];
  for (let i = 0; i < n; i++) {
    randomDirectives.push(getRandomDirective());
  }
  return randomDirectives;
}

/**
 * Matches the result and directive for a rock-paper-scissors round to determine
 * a correct/incorrect outcome for the Rock Paper Scissors, but Different game.
 * @param {string} result The result of the rock-paper-scissors round,
 * "player1", "player2", or "tie", indicating a winning player or a tie.
 * @param {string} directive The directive for the Rock Paper Scissors, but
 * Different game, "win", "lose", or "tie".
 * @returns {boolean}
 */
export function matchResultDirective(result, directive) {
  return (
    (result === "player1" && directive === "win") ||
    (result === "tie" && directive === "tie") ||
    (result === "player2" && directive === "lose")
  );
}
