import { RPSRound } from "../game-logic/RPSRound.js";
import { InvalidHandError } from "../game-logic/InvalidHandError.js";

describe("Testing constructor. Checking for throwing errors.", () => {
  test("InvalidHandError thrown for hand state 1.", () => {
    expect(() => {
      const testObj = new RPSRound("r0ck", "rock");
    }).toThrow(InvalidHandError);
  });

  test("InvalidHandError thrown for hand state 2.", () => {
    expect(() => {
      const testObj = new RPSRound("rock", "r0ck");
    }).toThrow(InvalidHandError);
  });

  test("No error thrown for valid state: 'rock'.", () => {
    expect(() => {
      const testObj = new RPSRound("rock", "rock");
    }).not.toThrow();
  });

  test("No error thrown for valid state: 'paper'.", () => {
    expect(() => {
      const testObj = new RPSRound("paper", "paper");
    }).not.toThrow();
  });

  test("No error thrown for valid state: 'scissors'.", () => {
    expect(() => {
      const testObj = new RPSRound("scissors", "scissors");
    }).not.toThrow();
  });
});

describe("Testing round results, with each hand combination", () => {
  // consider all permutations
  test("Player1 win with rock against scissors", () => {
    const testObj = new RPSRound("rock", "scissors");
    expect(testObj.result).toBe("player1");
  });

  test("Player2 win with rock against scissors", () => {
    const testObj = new RPSRound("scissors", "rock");
    expect(testObj.result).toBe("player2");
  });

  test("Tie lose with rock against rock", () => {
    const testObj = new RPSRound("rock", "rock");
    expect(testObj.result).toBe("tie");
  });

  test("Player1 win with paper against rock", () => {
    const testObj = new RPSRound("paper", "rock");
    expect(testObj.result).toBe("player1");
  });

  test("Player1 lose with paper against scissors", () => {
    const testObj = new RPSRound("paper", "scissors");
    expect(testObj.result).toBe("player2");
  });

  test("Tie lose with paper against paper", () => {
    const testObj = new RPSRound("paper", "paper");
    expect(testObj.result).toBe("tie");
  });

  test("Player1 win with scissors against paper", () => {
    const testObj = new RPSRound("scissors", "paper");
    expect(testObj.result).toBe("player1");
  });

  test("Player1 lose with scissors against rock", () => {
    const testObj = new RPSRound("scissors", "rock");
    expect(testObj.result).toBe("player2");
  });

  test("Tie lose with scissors against scissors", () => {
    const testObj = new RPSRound("scissors", "scissors");
    expect(testObj.result).toBe("tie");
  });
});

describe("Hand states.", () => {
  test("Player1 rock. Lowercase.", () => {
    const testObj = new RPSRound("rock", "rock");
    expect(testObj.player1Hand).toBe("rock");
  });

  test("Player1 rock. Uppercase.", () => {
    const testObj = new RPSRound("ROCK", "rock");
    expect(testObj.player1Hand).toBe("rock");
  });

  test("Player2 rock. Lowercase.", () => {
    const testObj = new RPSRound("rock", "rock");
    expect(testObj.player2Hand).toBe("rock");
  });

  test("Player2 rock. Uppercase.", () => {
    const testObj = new RPSRound("rock", "ROCK");
    expect(testObj.player2Hand).toBe("rock");
  });

  test("Player1 paper. Lowercase.", () => {
    const testObj = new RPSRound("paper", "paper");
    expect(testObj.player1Hand).toBe("paper");
  });

  test("Player1 paper. Uppercase.", () => {
    const testObj = new RPSRound("PAPER", "paper");
    expect(testObj.player1Hand).toBe("paper");
  });

  test("Player2 paper. Lowercase.", () => {
    const testObj = new RPSRound("paper", "paper");
    expect(testObj.player2Hand).toBe("paper");
  });

  test("Player2 paper. Uppercase.", () => {
    const testObj = new RPSRound("paper", "PAPER");
    expect(testObj.player2Hand).toBe("paper");
  });

  test("Player1 scissors. Lowercase.", () => {
    const testObj = new RPSRound("scissors", "scissors");
    expect(testObj.player1Hand).toBe("scissors");
  });

  test("Player1 scissors. Uppercase.", () => {
    const testObj = new RPSRound("SCISSORS", "scissors");
    expect(testObj.player1Hand).toBe("scissors");
  });

  test("Player2 scissors. Lowercase.", () => {
    const testObj = new RPSRound("scissors", "scissors");
    expect(testObj.player2Hand).toBe("scissors");
  });

  test("Player2 scissors. Uppercase.", () => {
    const testObj = new RPSRound("scissors", "SCISSORS");
    expect(testObj.player2Hand).toBe("scissors");
  });
});
