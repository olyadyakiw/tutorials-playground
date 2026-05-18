import { useState } from 'react'
import Header from './components/Header'
import Table from './components/Table'
import UserInputs from './components/UserInputs'

function App() {
    const [investments, setInvestments] = useState({
        initialInvestment: 0,
        annualInvestment: 0,
        expectedReturn: 0,
        duration: 0,
    })

    const isInputValid = investments.duration >= 1

    return (
        <>
            <Header />
            <UserInputs investments={investments} onInvestments={setInvestments} />
            {!isInputValid && <p className="center">Please type duration that bigger than 0</p>}
            {isInputValid && <Table investments={investments} />}
        </>
    )
}

export default App
