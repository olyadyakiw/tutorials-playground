import { useEffect } from 'react'
import Header from './Header.jsx'
import Loader from './Loader.jsx'
import Error from './Error.jsx'
import Question from './Question.jsx'
import StartScreen from './StartScreen.jsx'
import MainSection from './MainSection.jsx'
import { useReducer } from 'react'

const initialState = {
    questions: [],
    status: 'loading',
    index: 0,
}

function reducer(state, action) {
    switch (action.type) {
        case 'dataReceived':
            return {
                ...state,
                questions: action.payload,
                status: 'ready',
            }
        case 'dataFailed':
            return {
                ...state,
                status: 'error',
            }
        case 'start':
            return {
                ...state,
                status: 'active',
            }
        default:
            throw new Error('Action unknown')
    }
}

function App() {
    const [{ questions, status, index }, dispatch] = useReducer(reducer, initialState)

    const numQuestions = questions.length

    useEffect(function () {
        fetch('http://localhost:8000/questions')
            .then(res => res.json())
            .then(data => dispatch({ type: 'dataReceived', payload: data }))
            .catch(() => dispatch({ type: 'dataFailed' }))
    }, [])

    return (
        <div className="app">
            <Header />
            <MainSection>
                {status === 'loading' && <Loader />}
                {status === 'error' && <Error />}
                {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
                {status === 'active' && <Question question={questions[index]} />}
            </MainSection>
        </div>
    )
}

export default App
