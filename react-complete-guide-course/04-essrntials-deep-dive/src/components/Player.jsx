import { useState } from 'react'

function Player({ initialName, symbol, isActive, onChangeName }) {
    const [isEditing, setIsEditing] = useState(false)
    const [playerName, setPlayerName] = useState(initialName)

    function handleEditClick() {
        setIsEditing(s => !s)
        if (isEditing) {
            onChangeName(symbol, playerName)
        }
    }

    function handleInputChange(e) {
        setPlayerName(e.target.value)
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {isEditing ? (
                    <input onChange={handleInputChange} value={playerName} type="text" required />
                ) : (
                    <span className="player-name">{playerName}</span>
                )}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}

export default Player
