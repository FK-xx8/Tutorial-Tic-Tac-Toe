import './App.css';
import { useState, useEffect } from 'react';
import BoardElement from './BoardElement';

function App() {
  // マスごとの状態の管理をする
  const [boards, setBoard] = useState(["1","2","3","4","5","6","7","8","9"]);
  // ターンの管理をする
  const [nowTurn, setnowTurn] = useState(0);
  // エラー文の管理をする
  const [error, setError] = useState(null);
  // どちらかが勝利した、あるいは引き分けかの管理をする
  const [gameState, setGameState] = useState(null); 

  // 勝利条件を設定する
  const checkGameState = () => {
    // const victoryConditions = [
    //   [1,2,3],
    //   [4,5,6],
    //   [7,8,9],
    //   [1,4,7],
    //   [2,5,8],
    //   [3,6,9],
    //   [1,5,9],
    //   [3,5,7]
    // ];
    // note: victoryConditions[index]のmapかな？
    // 勝利条件(victoryConditions)と同じindexが全て同じであるかどうか確かめる
    // どちらが勝利したかをgameStateに入れる
  }

  // useEffectで、同期後の結果を見る
  // 勝利条件に合致した場合、ゲームを終了する
  useEffect(() => {
    if (boards[0] == "X" && boards[1] == "X" && boards[2] == "X") {
      setGameState("X");
      console.log("ゲームの状態が変わりました");
    }
  }, [boards]);

  // 9ターン経過しても勝者がいない場合＝引き分けである
  useEffect(() => {
    if (nowTurn === 9) {
      setGameState("draw");
      console.log("ゲームの状態が変わりました");
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



  // 次のプレイヤーが誰かを管理する
  const nextPlayer = nowTurn % 2 === 1 ? "X" : "O";

  return (
    <div className="App">
      <div className="left-contents">
        <a>Next player: {nextPlayer}</a>
        <p>now turn count: {nowTurn}</p>
        <p>winner: {gameState}</p>
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