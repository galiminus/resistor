import React, { useState } from 'react';
import injectSheet from 'react-jss';
import { useWindowSize } from 'react-use';
import Resistor from './Resistor';

const MAX_WIDTH = 600;
const MAX_RESISTOR_WIDTH = 400;
const RESISTOR_PADDING = 24;

function pickResistorValue() {
  return (220);
}

function Game({ classes }) {
  const [value, setValue] = useState(pickResistorValue());
  const [guess, setGuess] = useState("");

  let { width: resistorWidth } = useWindowSize();
  if (resistorWidth > MAX_RESISTOR_WIDTH) {
    resistorWidth = MAX_RESISTOR_WIDTH;
  }
  resistorWidth -= RESISTOR_PADDING * 2;

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>The <u>Resistor</u> Game</h1>
      <div className={classes.resistorContainer}>
        <Resistor width={resistorWidth} value={value} stripeWidth={resistorWidth / 16} stripeGap={resistorWidth / 16} />
      </div>
      <form
        className={classes.inputContainer}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          autoFocus
          className={classes.input}
          value={guess}
          onChange={(e) => {
            if (e.target.value.match(/^[0-9.]*$/) && e.target.value.length < 8) {
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
    maxWidth: 126,
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
