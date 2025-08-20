# Rock Paper Scissors, but Different

A single-player rock-paper-scissors mind game.

This project was a short learning experience predominantly utilising vanilla Javascript.

## How to play

Play a round of rock-paper-scissors against the computer. 
However, each card specifies a condition stating whether you need to *win*, 
*lose*, or *tie* against your opponent's hand.

The difficulty ramps up with timed-disappearing cards and simultaneous cards on each round.

## Skills Showcase

### 1. Object-oriented Javascript design

Game logic and flow was encapsulated into various classes with their associated behaviours and properties.

Classes:
  - `GameBoard`
  - `GameCard`
  - `GameController`
  - `Round` - representing one round of rock paper scissors
  - `Validator` - an object rather than an entire class

### 2. DOM manipulation through JS

The source file `template.html`, contains minimal markup. All the markup is added dynamically through the abstractions provided by the above JS classes. 

Cards to play against are generated through the helper functions `getRandomHand()` and `getRandomDirective()` which are fed into the `GameCard` constructor to generate the associated markup with that card.

### 3. Asynchronous JS

The `GameController` class controls the flow of the game using the JS features, `async` and `await` to pause the program execution during game specific wait times. I.e., to prevent the user repeatedly selecting hands between rounds, or during later difficulty levels where the user needs to wait for the card to disappear before inputting their choice.

### 4. Others

To quickly rapid-fire list some technologies used:

- Testing suite: Jest
- Bundler: Webpack with manual config
- Version control: Git (CLI) + Github
- HTML + CSS (minimal)
- JSDOC

## Statement on the use of AI

At no point during the development of this project was any AI/LLM used.

All design and code was created by me, Daniel Stacy. 

All errors and bugs were both created and fixed by me, Daniel Stacy, through
the use of a debugger (and embarrassingly, sometimes the use of a console.log), 
or by consulting the docs.