import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

var GAME_STATE = {
  "awaitingInput": false,
  pattern: []
}

function showSquares(ids) {
  if (ids.length === 0) {
    GAME_STATE.awaitingInput = true;
    return;
  };
  let el = document.getElementById(ids[0]);
  el.classList.add("highlight");
  setTimeout(() => {
    el.classList.remove("highlight");
    if(ids.length > 1) showSquares(ids.slice(1))
  }, 1000);
}

function pickKRandomSquares(k) {
  let squares = [];
  for(let i = 0; i < k; i++) {
    squares.push(Math.floor(Math.random() * this.state.n * this.state.n));
  }
  return squares;
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export {GAME_STATE, showSquares, pickK}