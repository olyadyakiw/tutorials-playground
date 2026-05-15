function GameBoard({ onSelectSquare, board }) {
    // const [gameBoard, setGameBoard] = useState(initialGameBoard)

    // function handleSelectSquare(rowIndex, colIndex) {
    //     setGameBoard(prev => {
    //         const updated = [...prev.map(innerArray => [...innerArray])]
    //         updated[rowIndex][colIndex] = activePlayerSymbol
    //         return updated
    //     })

    //     onSelectSquare()
    // }

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button disabled={playerSymbol} onClick={() => onSelectSquare(rowIndex, colIndex)}>
                                    {playerSymbol}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}

export default GameBoard
