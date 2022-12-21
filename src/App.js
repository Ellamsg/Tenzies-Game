import "./App.css";
import Die from "./components/Die";
import React from "react";
import { nanoid } from "nanoid";

import Confetti from 'react-confetti'


function App() {
  const [dice, setDice] = React.useState(allNewDice());
  /*use state to be used for react use effect*/
  const [tenzies, setTenzies] = React.useState(false);

  { /*use effect */}

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("you won");
    }
  }, [dice]);

  /**
   * Challenge: Check the dice array for these winning conditions:
   * 1. All dice are held, and
   * 2. all dice have the same value
   *
   * If both conditions are true, set `tenzies` to true and log
   * "You won!" to the console
   */

  {
    /*holdDice function to check which dice was pressed  */
  }
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  {
    /* function to generate random number */
  }
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  {
    /* function to reset random number button */
  }
  function rollDice() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        {
          /* hold pressed die and only reset unpressed die*/
        }
        return die.isHeld ? die : generateNewDie();
      })
    );
  }

  {
    /* map over die
     write a function to get unique die id (die.id),
     value(die.id):used to get die number
     isHeld(die.isHeld) : know when a die is pressed or not,
     line 23,if isHeld or not it shows different colors.

    */
  }
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      holdDice={function () {
        holdDice(die.id);
      }}
      value={die.value}
      isHeld={die.isHeld}
      die={die.id}
    />
  ));

  return (
    <div className="App">
      { tenzies ? <Confetti/> :""}
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">
          {/*render mapped die element here from the Die.js components */}
          {diceElements}
        </div>
        <button className="roll-dice" onClick={rollDice}>
          {tenzies ? "start new" : "Roll"}
        </button>
      </main>
    </div>
  );
}

export default App;
