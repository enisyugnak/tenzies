import React from 'react';
import { nanoid } from 'nanoid';
import './style.css';
import Confetti from 'react-confetti';
import Dice from './components/Dice';

/**
 * Extra Credit Challenge:
 *
 *  -> CSS to show dice dots instead of numbers
 *  + -> count how many times player roll the dice
 *  + -> track time
 *  -> store score on localStorage
 *  -> best time vs.
 *
 */

function App() {
  const diceCount = 9;
  const [rollCount, setRollCount] = React.useState(0);
  const [timerOn, setTimerOn] = React.useState(false);
  const [timer, setTimer] = React.useState(0);
  const [random, setRandom] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  /**
   *
   * Check if all the dice are hold
   * and check if all the dices are the same
   * if so, show confetti
   *
   */

  React.useEffect(() => {
    let allHeld = random.every((die) => die.isHeld);
    if (allHeld) {
      let firstValue = random[0].value;
      let allSame = random.every((die) => firstValue === die.value);
      if (allSame) {
        setTimerOn(false);
        setTenzies(true);
      }
    }
  }, [random]);

  /** GAME TIMER */

  React.useEffect(() => {
    let counter = null;
    if (timerOn) {
      counter = setTimeout(() => setTimer((prevTime) => prevTime + 1), 1000);
    } else {
      if (timer !== 0) {
        clearTimeout(counter);
      }
    }

    return () => clearTimeout(counter);
  }, [timer, timerOn]);

  /** returns a dice object with random number and uniqID */

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      id: nanoid(),
      isHeld: false,
    };
  }

  /**
   * ROLL the Dice
   * just the ones which are not held
   */

  function rollDice() {
    if (tenzies) {
      setRollCount(0);
      setTenzies(false);
      setRandom(allNewDice());
      setTimer(0);
    } else {
      !timerOn && setTimerOn(true);
      setRollCount((prevCount) => prevCount + 1);
      setRandom((oldRandom) =>
        oldRandom.map((item) => {
          return item.isHeld ? item : generateNewDie();
        })
      );
    }
  }

  /** HOLD or RELEASE the Dice */

  function dieClicked(id) {
    if (!tenzies) {
      !timerOn && setTimerOn(true);
      setRandom((oldRandom) =>
        oldRandom.map((item) => {
          return item.id === id ? { ...item, isHeld: !item.isHeld } : item;
        })
      );
    }
  }

  /** create dices with random numbers */

  function allNewDice() {
    return Array.from({ length: diceCount }).map(() => generateNewDie());
  }

  /** SETUP - put the dice components on the stage */

  const elements = random.map((dice) => (
    <Dice
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
      dieClicked={() => dieClicked(dice.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}

      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same.
        <br />
        Click each die to freeze it at its current value between rolls.
      </p>
      <div className="dice--holder"> {elements} </div>
      <p className="roll-count">
        Rolled {rollCount} times in {timer} seconds
      </p>
      <button className="roll--btn" onClick={rollDice}>
        {tenzies ? 'NEW GAME' : 'ROLL'}
      </button>
    </main>
  );
}

export default App;
