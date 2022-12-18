import "./App.css";
import Die from "./components/Die";
import React from "react";
import { nanoid } from "nanoid";
  
function App() {
  const [dice, setDice] = React.useState(allNewDice());
   
  {/*holdDice function to check which dice was pressed  */}
  function holdDice(id) {
    setDice(oldDice => oldDice.map(die =>{

      return die.id === id? 
      {...die, isHeld: !die.isHeld} :die
    }))
  }
  {/* function to generate random number */}
  function generateNewDie(){
   return{
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }
  
  }
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++){
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  { /* function to reset random number button */}
  function rollDice() {
    setDice(oldDice => oldDice.map(die =>{
      { /* hold pressed die and only reset unpressed die*/}
      return die.isHeld ? 
       die :generateNewDie()
    }))
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
      <main>
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same.
             Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {/*render mapped die element here from the Die.js components */}
          {diceElements}
          </div>
        <button className="roll-dice" onClick={rollDice}>
          Roll dice
        </button>
      </main>
    </div>
  );
}

export default App;
