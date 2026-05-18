function UserInputs({ investments, onInvestments }) {
    console.log(investments)
    return (
        <div id="user-input">
            <div className="input-group">
                <label className="input-group">
                    Initial Investments
                    <input
                        type="number"
                        value={investments.initialInvestment}
                        onChange={e => onInvestments({ ...investments, initialInvestment: +e.target.value })}
                    />
                </label>
                <label className="input-group">
                    Annual Investments
                    <input
                        type="number"
                        value={investments.annualInvestment}
                        onChange={e => onInvestments({ ...investments, annualInvestment: +e.target.value })}
                    />
                </label>
            </div>
            <div className="input-group">
                <label className="input-group">
                    Expected return
                    <input
                        type="number"
                        value={investments.expectedReturn}
                        onChange={e => onInvestments({ ...investments, expectedReturn: +e.target.value })}
                    />
                </label>
                <label className="input-group">
                    Duration
                    <input
                        type="number"
                        value={investments.duration}
                        onChange={e => onInvestments({ ...investments, duration: +e.target.value })}
                    />
                </label>
            </div>
        </div>
    )
}

export default UserInputs
