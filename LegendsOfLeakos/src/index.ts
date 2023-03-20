
import Constants from "./Constants";

// create and export a class called gamestate
class GameState {
  counter: number;
  constructor() {
    this.counter = 0;
  }
  // create a method called incrementCounter
  incrementCounter() {
    this.counter++;
  }
}

module.exports = {
  GameState: GameState,
  Constants: Constants
}