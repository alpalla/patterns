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
    if (!this.props.playerTurn) return;
    this.props.handleSquareClick(this.props.id);
    this.setState({
      show: true
    });
  }
  hideLater(interval) {
    setTimeout(() => {
      this.setState({
        show: false
      });
    }, interval);
  }
  render () {
    const style = {"backgroundColor": this.state.show ? "yellow" : null};
    if (this.state.show) this.hideLater(300);
    return (
      <div id={this.props.id} className="square"
      onClick={() => {this.handleClick()}}
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
    this.state = {n: 3, squares: [], acceptUserInput: false, playerInput: [], gameStarted: false, playerTurn: false};
  }
  resizeBoard(e) {
    if (this.state.gameStarted) return;
    this.setState({
      n: e.target.value
    })
  }
  handleSquareClick(i) {
    if (GAME_STATE.awaitingInput) console.log(i);
  }
  startGame() {
    this.setState({
      gameStarted: true,
      squares: pickKRandomSquares(2),
    }, () => {
      showSquares(this.state.squares);
      this.setState({playerTurn: true});
    });
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
