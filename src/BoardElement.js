import './App.css';
import { useState } from 'react';

export default function BoardElement(boardNumber) {
    const toString = Object.values(boardNumber);
    const indexNumber = Number(toString);
    const [board, setBoard] = useState([1,2,3,4,5,6,7,8,9]);
    console.log(indexNumber);
    return (
        <button class="game-masu" boardNumber={boardNumber}>{board[indexNumber]}</button>
    );
}