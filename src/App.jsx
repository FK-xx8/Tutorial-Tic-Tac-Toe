import './App.css';
import { useState } from 'react';
import BoardElement from './BoardElement';

function App() {
  // マスごとの状態の管理をする
  const [boards, setBoard] = useState(["1","2","3","4","5","6","7","8","9"]);
  // ターンの管理をする
  const [nowTurn, setnowTurn] = useState(0);
  // エラー文の管理をする
  const [error, setError] = useState(null);

  // マスを押したときの処理
  const handleClickMasu = (index) => {
    // 最大ターン数以上処理をしないようにする
    if (nowTurn === 9) {
      setError("ゲームは終了しています！");
      return;
    }

    // マスが既に押されている場合は、以降の処理を行わないようにする
    if (boards[index] == "X" || boards[index] == "O") {
      setError("ズルはよくない！");
      console.log("既に押下済み！");
      return;
    }

    // ボードにXかOを出す
    setBoard(prev => {
      const spreadBoard = [...prev];
      // マスがまだ押されていない場合に処理を行なう
      spreadBoard[index] = nowTurn % 2 === 1 ? "X" : "O";
      return spreadBoard;
    });

    console.log("しっかり処理できた！")

    // 経過ターン数を増やす
    setnowTurn(turn => turn + 1);
    // エラー文を削除する
    setError("");
  };

  // 次のプレイヤーが誰かを管理する
  const nextPlayer = nowTurn % 2 === 1 ? "X" : "O";

  return (
    <div className="App">
      <div className="left-contents">
        <a>Next player: {nextPlayer}</a>
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
        <p className="error">{error}</p>
      </div>
      
      <div className="right-contents">
        <p className="logs">LOGS</p>
        <a>1. </a><button>Go to game start</button>
      </div>
    </div>
  );
}

export default App;