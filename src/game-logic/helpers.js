export const [rock, paper, scissors] = ["rock", "paper", "scissors"];
const hands = [rock, paper, scissors];
export const [win, lose, tie] = ["win", "lose", "tie"];
const directives = [win, lose, tie];

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
  return hands[getRandInt(0, hands.length - 1)];
}

/**
 * Generate a random directive for a rock-paper-scissors round.
 * @returns {string} "win", "lose", or "tie".
 */
export function getRandomDirective() {
  return directives[getRandInt(0, directives.length - 1)];
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
