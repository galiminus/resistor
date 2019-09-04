import React, { useState } from 'react';
import injectSheet from 'react-jss';
import { useWindowSize } from 'react-use';
import Resistor from './Resistor';

const MAX_WIDTH = 600;
const MAX_RESISTOR_WIDTH = 600;
const RESISTOR_PADDING = 24;

const multiplerValues = [
  1,
  10,
  100,
  1000,
  10000,
  100000,
  10000000,
  10000000,
  0.1,
  0.01,
]

function pickResistorValue() {
  return (Math.floor(Math.random() * 990) + 10);
}

function pickResistorMultiplier() {
  return (multiplerValues[Math.floor(Math.random() * multiplerValues.length)])
}

function guessAndValueEqual(guess, value, mulitplier) {
  console.log(guess, value * mulitplier)
  return (parseInt(guess) === value * mulitplier);
}

function Game({ classes }) {
  const [value, setValue] = useState(pickResistorValue());
  const [mulitplier, setMultiplier] = useState(pickResistorMultiplier());
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Guess the resistor value.");
  const [success, setSuccess] = useState(0);

  let { width: resistorWidth } = useWindowSize();
  if (resistorWidth > MAX_RESISTOR_WIDTH) {
    resistorWidth = MAX_RESISTOR_WIDTH;
  }
  resistorWidth -= RESISTOR_PADDING * 2;

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>The <u>Resistor</u> Game</h1>
      <div className={classes.resistorContainer}>
        <Resistor width={resistorWidth} value={value} multiplier={mulitplier} stripeWidth={resistorWidth / 20} stripeGap={resistorWidth / 20} />
      </div>
      <p className={classes.message}>{message}</p>
      <form
        className={classes.inputContainer}
        onSubmit={(e) => {
          e.preventDefault();

          if (guessAndValueEqual(guess, value, mulitplier)) {
            setSuccess(success + 1);

            if (success === 0) {
              setMessage(`One resistor value found.`);
            } else {
              setMessage(`${success + 1} resistor values found.`);
            }
            setValue(pickResistorValue());
            setMultiplier(pickResistorMultiplier());
          } else {
            setMessage("Wrong answer.");
          }
          setGuess("");
        }}
      >
        <input
          autoFocus
          className={classes.input}
          value={guess}
          onChange={(e) => {
            if (e.target.value.match(/^[0-9.]*$/) && e.target.value.length < 11) {
              setGuess(e.target.value);
            }
          }}
        />
        <span className={classes.unit}>Ω</span>
      </form>
    </div>
  )
}

const styles =  (theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    maxWidth: MAX_WIDTH,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    fontFamily: theme.fontFamily,
    fontSize: 40,
    textAlign: 'center',
  },
  message: {
    fontFamily: theme.fontFamily,
    fontSize: 20,
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: MAX_WIDTH,
  },
  unit: {
    fontSize: 48,
    display: 'inline-block',
    marginLeft: 12
  },
  input: {
    width: '100%',
    maxWidth: 180,
    padding: 12,
    borderRadius: 4,
    border: '2px solid #333',
    fontSize: 24,
    outline: 'none',
    fontFamily: theme.fontFamily,
  },
  resistorContainer: {
    marginTop: 48,
    marginBottom: 76,
  }
});

export default injectSheet(styles)(Game);
