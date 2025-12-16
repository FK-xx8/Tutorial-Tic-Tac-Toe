import './App.css';

export default function BoardElement({value, onClick}) {
    return (
        <button
            className="game-masu"
            onClick={onClick}>
                {value}
        </button>
    );
}