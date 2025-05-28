import {
  getRandomDirective,
  getRandomHand,
  matchResultDirective,
} from "../game-logic/helpers.js";

describe("Random hand generation. 100,000 trials.", () => {
  const numTrials = 100000;
  const tolerance = 0.05;

  let rockCount = 0;
  let paperCount = 0;
  let scissorsCount = 0;
  let otherCount = 0;
  let rockProportion = 0;
  let paperProportion = 0;
  let scissorsProportion = 0;

  beforeAll(() => {
    for (let i = 0; i < numTrials; i++) {
      let trialOutcome = getRandomHand();
      switch (trialOutcome) {
        case "rock":
          rockCount++;
          break;
        case "paper":
          paperCount++;
          break;
        case "scissors":
          scissorsCount++;
          break;
        default:
          otherCount++;
      }
    }
    rockProportion = rockCount / numTrials;
    paperProportion = paperCount / numTrials;
    scissorsProportion = scissorsCount / numTrials;
  });

  test("Number of non-valid hands should be zero.", () => {
    expect(otherCount).toBe(0);
  });

  test("Proportion of rock count should be close to 0.33 with 0.05 tolerance.", () => {
    expect(rockProportion).toBeLessThanOrEqual(0.33 + tolerance);
    expect(rockProportion).toBeGreaterThanOrEqual(0.33 - tolerance);
  });

  test("Proportion of paper count should be close to 0.33 with 0.05 tolerance.", () => {
    expect(paperProportion).toBeLessThanOrEqual(0.33 + tolerance);
    expect(paperProportion).toBeGreaterThanOrEqual(0.33 - tolerance);
  });

  test("Proportion of scissors count should be close to 0.33 with 0.05 tolerance.", () => {
    expect(scissorsProportion).toBeLessThanOrEqual(0.33 + tolerance);
    expect(scissorsProportion).toBeGreaterThanOrEqual(0.33 - tolerance);
  });
});

describe("Random directive generation. 100,000 trials.", () => {
  const numTrials = 100000;
  const tolerance = 0.05;

  let winCount = 0;
  let loseCount = 0;
  let tieCount = 0;
  let otherCount = 0;
  let winProportion = 0;
  let loseProportion = 0;
  let tieProportion = 0;

  beforeAll(() => {
    for (let i = 0; i < numTrials; i++) {
      let trialOutcome = getRandomDirective();
      switch (trialOutcome) {
        case "win":
          winCount++;
          break;
        case "lose":
          loseCount++;
          break;
        case "tie":
          tieCount++;
          break;
        default:
          otherCount++;
      }
    }
    winProportion = winCount / numTrials;
    loseProportion = loseCount / numTrials;
    tieProportion = tieCount / numTrials;
  });

  test("Number of non-valid directives should be zero.", () => {
    expect(otherCount).toBe(0);
  });

  test("Proportion of win count should be close to 0.33 with 0.05 tolerance.", () => {
    expect(winProportion).toBeLessThanOrEqual(0.33 + tolerance);
    expect(winProportion).toBeGreaterThanOrEqual(0.33 - tolerance);
  });

  test("Proportion of lose count should be close to 0.33 with 0.05 tolerance.", () => {
    expect(loseProportion).toBeLessThanOrEqual(0.33 + tolerance);
    expect(loseProportion).toBeGreaterThanOrEqual(0.33 - tolerance);
  });

  test("Proportion of tie count should be close to 0.33 with 0.05 tolerance.", () => {
    expect(tieProportion).toBeLessThanOrEqual(0.33 + tolerance);
    expect(tieProportion).toBeGreaterThanOrEqual(0.33 - tolerance);
  });
});

describe("Match result directive testing.", () => {
  test("player1 winner and win directive = true", () => {
    expect(matchResultDirective("player1", "win")).toBe(true);
  });

  test("player1 winner and tie directive = false", () => {
    expect(matchResultDirective("player1", "tie")).toBe(false);
  });

  test("player1 winner and lose directive = false", () => {
    expect(matchResultDirective("player1", "lose")).toBe(false);
  });

  test("player2 winner and lose directive = true", () => {
    expect(matchResultDirective("player2", "lose")).toBe(true);
  });

  test("player2 winner and win directive = false", () => {
    expect(matchResultDirective("player2", "win")).toBe(false);
  });

  test("player2 winner and tie directive = false", () => {
    expect(matchResultDirective("player2", "tie")).toBe(false);
  });

  test("tie and tie directive = true", () => {
    expect(matchResultDirective("tie", "tie")).toBe(true);
  });

  test("tie and win directive = false", () => {
    expect(matchResultDirective("tie", "win")).toBe(false);
  });

  test("tie and lose directive = false", () => {
    expect(matchResultDirective("tie", "lose")).toBe(false);
  });
});
