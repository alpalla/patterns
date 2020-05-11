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

class ProgressBarBlock extends React.Component {
  render() {
    return(
      <div className="progressBarBlock" style={{width: this.props.width}}></div>
    )
  }
}

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {blockWidth: this.props.blockWidth}
  }
  render() {
    return (
      <div id="progressBar" className={"progressBar"}>
        <ProgressBarBlock width={this.props.blockWidth}/>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {n: 3, k: 2, playerMoves: 0, playAnimation: false};
  }
  resizeBoard(e) {
    if (this.state.gameStarted) return;
    this.setState({
      n: e.target.value
    })
  }
  handleSquareClick(i) {
    if (!GAME_STATE.playerTurn) return;

    // Player made wrong move.
    if (i !== GAME_STATE.pattern.shift()) {
      alert('YOU LOSE...');
      reset();
      this.setState({k: 2});
      return;
    }

    if (GAME_STATE.pattern.length === 0) {
      this.setState({playerMoves: this.state.playerMoves + 1}, () => {
        setTimeout(() => {
            this.setState({
              playerMoves: 0,
              k: this.state.k + 1,
            }, () => {
              this.startRound();
            });
        }, 1000, this);
      });
    } else {
      this.setState({playerMoves: this.state.playerMoves + 1});
    }
    this.setState({playAnimation: true});
  }
  startRound() {
    GAME_STATE.playerTurn = false;
    GAME_STATE.patterns = pickKRandomSquares(this.state.n, this.state.k);
    showSquares(GAME_STATE.patterns);
  }
  changeStartingRound(e) {
    this.setState({k: parseInt(e.target.value)});
  }
  render() {
    return (
      <div className="App">
        <div>
        <input type="range" defaultValue={this.state.n} onChange={this.resizeBoard.bind(this)} min={2} max={5}></input>
        {this.state.n} by {this.state.n} board
        </div>
        <div>
          Starting round:
        <input type="number" defaultValue={this.state.k} onChange={this.changeStartingRound.bind(this)} min={1}></input>
        </div>
        <button onClick={this.startRound.bind(this)}>GO</button>
        <div>Squares remaining: {this.state.k - this.state.playerMoves}</div>
        <ProgressBar
          className={this.state.playAnimation ? "animation" : "progressBar"}
          numberOfBlocks={this.state.playerMoves}
          blockWidth={((100 / this.state.k) * this.state.playerMoves).toString() + "%"} />
        <Board n={this.state.n} handleSquareClick={this.handleSquareClick.bind(this)} playerTurn={this.state.playerTurn} />
      </div>
    );
  }
}

export default App;
