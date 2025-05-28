/**
 * Error class for an invalid RPSRound object state.
 * @param {string} msg Error message.
 */
export class InvalidHandError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "InvalidHandError";
  }
}
