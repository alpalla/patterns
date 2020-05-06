import React from 'react';
import './App.css';
import { showSquares, GAME_STATE, pickKRandomSquares, reset } from './game.js';


class Square extends React.Component {
  render () {
    return (
      <div id={this.props.id} className="square"
      onClick={() => this.props.handleSquareClick(this.props.id)}
      onMouseDown={() => {if (GAME_STATE.playerTurn) document.getElementById(this.props.id).classList.add("highlight")}}
      onMouseUp={() => {if (GAME_STATE.playerTurn) document.getElementById(this.props.id).classList.remove("highlight")}}
      onMouseLeave={() => {if (GAME_STATE.playerTurn) document.getElementById(this.props.id).classList.remove("highlight")}}
      />
    )
  }
}

class Board extends React.Component {
  createBoardRows() {
    let rows = [];
    let counter = 0;
    for (let i = 0; i < this.props.n; i++) {
      let row = [];
      for (let j = 0; j < this.props.n; j++) {
        row.push(<Square key={counter} handleSquareClick={this.props.handleSquareClick} id={counter} playerTurn={this.props.playerTurn}></Square>)
        counter++;
      }
      rows.push(row);
    }
    return rows;
  }

  render() {
    const rows = this.createBoardRows();
    let board = [];
    for (let i = 0; i < rows.length; i++) {
      board.push(<div key={i} className="boardRow">{rows[i]}</div>);
    }
    return (
      <div>
        <div className="board">{board}</div>
      </div>
      
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {n: 3, squaresRemaining: GAME_STATE.round};
  }
  resizeBoard(e) {
    if (this.state.gameStarted) return;
    this.setState({
      n: e.target.value
    })
  }
  handleSquareClick(i) {
    if (GAME_STATE.playerTurn) {
      if (i !== GAME_STATE.pattern.shift()) {
        alert('YOU LOSE...');
        reset();
        this.setState({
          squaresRemaining: GAME_STATE.round
        });
        return;
      }
      this.setState({
        squaresRemaining: this.state.squaresRemaining - 1
      });
      if (GAME_STATE.pattern.length === 0) {
        alert('CORRECT');
        this.startRound();
      }
    }
  }
  startRound() {
    this.setState({
      squaresRemaining: GAME_STATE.round
    });
    GAME_STATE.playerTurn = false;
    GAME_STATE.patterns = pickKRandomSquares(this.state.n, GAME_STATE.round);
    showSquares(GAME_STATE.patterns);
  }
  render() {
    return (
      <div className="App">
        <input type="number" defaultValue={this.state.n} onChange={this.resizeBoard.bind(this)} min={2} max={5}></input>
        <button onClick={this.startRound.bind(this)}>GO</button>
        <div>Squares remaining: {this.state.squaresRemaining}</div>
        <div class="meter">
          <span style={{"width": "80%;"}}><span class="progress"></span></span>
        </div>
        <Board n={this.state.n} handleSquareClick={this.handleSquareClick.bind(this)} playerTurn={this.state.playerTurn} />
      </div>
    );
  }
}

export default App;
