function Options({ question, answer, dispatch }) {
    const hasAnswer = answer !== null

    return (
        <div className="options">
            {question.options.map((option, index) => (
                <button
                    onClick={() => dispatch({ type: 'newAnswer', payload: index })}
                    key={option}
                    disabled={hasAnswer}
                    className={`btn btn-option ${index === answer ? 'answer' : ''} ${
                        hasAnswer ? (index === question.correctOption ? 'correct' : 'wrong') : ''
                    }`}
                >
                    {option}
                </button>
            ))}
        </div>
    )
}

export default Options
