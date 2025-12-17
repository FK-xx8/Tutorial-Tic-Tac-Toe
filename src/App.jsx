import './App.css';
import { useState, useEffect } from 'react';
import BoardElement from './BoardElement';

function App() {
  // マスごとの状態の管理をする
  const [boards, setBoard] = useState(["","","","","","","","",""]);
  // ターンの管理をする
  const [nowTurn, setnowTurn] = useState(0);
  // エラー文の管理をする
  const [error, setError] = useState(null);
  // どちらかが勝利した、あるいは引き分けかの管理をする
  const [gameState, setGameState] = useState(null); 

  // 勝利状態の定義
  const victoryConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
    
  let winner = null;

  // どちらかが勝利していれば勝者を返す
  const checkGameState = (a,b,c) => {
    if (boards[a] == "X" && boards[b] == "X" && boards[c] == "X") {
      return winner = "X";
    } else if (boards[a] == "O" && boards[b] == "O" && boards[c] == "O") {
      return winner = "O";
    }
    return null;
  }

  // useEffectで、同期後の結果を見る
  // 勝利条件に合致した場合、ゲームを終了する
  useEffect(() => {
    if (winner) {
      setGameState(winner);
      console.log("勝者あり");
    }
  }, [boards]);

  // 9ターン経過しても勝者がいない場合＝引き分けである
  useEffect(() => {
    if (nowTurn === 9 && !winner) {
      setGameState("draw");
      console.log("引き分け");
    }
  },[nowTurn])

  // マスを押したときの処理
  const handleClickMasu = (index) => {
    // 勝利条件に該当する場合は、以降の処理を行わない様にする
    if (gameState !== null) {
      setError("ゲームは終了しています！");
      return;
    }
    
    // マスが既に押されている場合は、以降の処理を行わないようにする
    if (boards[index] == "X" || boards[index] == "O") {
      setError("ズルはよくない！");
      return;
    }

    // ボードにXかOを出す
    setBoard(prev => {
      const spreadBoard = [...prev];
      // マスがまだ押されていない場合に処理を行なう
      spreadBoard[index] = nowTurn % 2 === 1 ? "X" : "O";
      return spreadBoard;
    });

    // 経過ターン数を増やす
    setnowTurn(turn => turn + 1);
    // エラー文を削除する
    setError("");
  };

  // ここで勝利条件に合致しているかどうかを判定する
  for (const condition of victoryConditions) {
      checkGameState(condition[0],condition[1],condition[2]);
    }

  // 次のプレイヤーが誰かを管理する
  const nextPlayer = nowTurn % 2 === 1 ? "X" : "O";

  return (
    <div className="App">
      <div className="left-contents">
        <a>Next player: {nextPlayer}</a>
        <p>now turn count: {nowTurn}</p>
        <a>winner: </a><a className="gameState">{gameState}</a>
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