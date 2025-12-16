import './App.css';
import { useState } from 'react';
import BoardElement from './BoardElement';

function App() {
  // マスごとの状態の管理をする
  const [boards, setBoard] = useState(["1","2","3","4","5","6","7","8","9"]);
  // ターンの管理をする
  const [nowTurn, setnowTurn] = useState(1);

  const handleClickMasu = (index) => {
    setBoard(prev => {
      const spreadBoard = [...prev];
      spreadBoard[index] = nowTurn % 2 === 1 ? "X" : "O";
      return spreadBoard;
    });
      setnowTurn(turn => turn + 1);
  };

  return (
    <div className="App">
      <div className="left-contents">
        <a>Next player: </a>
        <p>now turn count is {nowTurn}</p>
        <div className="game-ground">
          {/* ここで繰り返し処理 */}
            {boards.map((board, index) => (
                <BoardElement
                  key={index}
                  onClick={() => handleClickMasu(index)}
                  value={board} />
            ))}
        </div>
      </div>
      
      <div className="right-contents">
        <p className="logs">LOGS</p>
        <a>1. </a><button>Go to game start</button>
      </div>
    </div>
  );
}

export default App;