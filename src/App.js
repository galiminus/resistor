import React from 'react';
import injectSheet, { ThemeProvider } from 'react-jss'
import Game from './Game';

const theme = {
  fontFamily: "'Major Mono Display', monospace",
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Game />
    </ThemeProvider>
  );
}

export default App;
