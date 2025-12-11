import './App.css';
import { useState } from 'react';
import BoardElement from './BoardElement';

function App() {

  const [game, setGame] = useState("　");
  const [nowTurn, setnowTurn] = useState(1);
    const handleClickGame = () => {
      setnowTurn(nowTurn + 1);
      if (nowTurn % 2 === 1) {
        setGame("X");
      } else {
        setGame("O");
      }
    };

  return (
    <div className="App">
      <div class="left-contents">
        <a>Next player: </a>
        <p>now turn count is {nowTurn}</p>
        <div class="game-ground">
          <BoardElement boardNumber='0'/>
          <BoardElement boardNumber="1"/>
          <BoardElement boardNumber="2"/>
          <br/>
          <BoardElement boardNumber="3"/>
          <BoardElement boardNumber="4"/>
          <BoardElement boardNumber="5"/>
          <br/>
          <BoardElement boardNumber="6"/>
          <BoardElement boardNumber="7"/>
          <BoardElement boardNumber="8"/>
        </div>
      </div>
      <div class="right-contents">
        <a>1. </a><button>Go to game start</button>
      </div>
    </div>
  );
}

export default App;