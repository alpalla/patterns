import React from 'react';
import './App.css';
import { showSquares, GAME_STATE, pickKRandomSquares } from '.';


class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: false};
  }
  componentDidMount() {
    this.setState({
      show: this.props.show
    })
  }
  handleClick() {
    this.props.handleSquareClick(this.props.id);
  }
  render () {
    const style = {"backgroundColor": this.state.show ? "yellow" : null};
    if (this.state.show) this.hideLater(300);
    return (
      <div id={this.props.id} className="square"
      onClick={() => {this.handleClick()}}
      onMouseDown={() => document.getElementById(this.props.id).classList.add("highlight")}
      onMouseUp={() => document.getElementById(this.props.id).classList.remove("highlight")}
      onMouseLeave={() => document.getElementById(this.props.id).classList.remove("highlight")}
      style={style}/>
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
    this.state = {n: 3, acceptUserInput: false, playerInput: [], gameStarted: false};
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
        return;
      }
      if (GAME_STATE.pattern.length === 0) {
        alert('CORRECT');
        this.startGame();
      }
    }
  }

  startGame() {
    GAME_STATE.patterns = pickKRandomSquares(this.state.n, GAME_STATE.round);
    showSquares(GAME_STATE.patterns);
  }
  render() {
    return (
      <div className="App">
        <input type="number" defaultValue={this.state.n} onChange={this.resizeBoard.bind(this)} min={2} max={5}></input>
        <button onClick={this.startGame.bind(this)}>GO</button>
        <Board n={this.state.n} handleSquareClick={this.handleSquareClick.bind(this)} playerTurn={this.state.playerTurn} />
      </div>
    );
  }
}

export default App;
