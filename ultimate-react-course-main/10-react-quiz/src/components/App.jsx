import { useEffect } from 'react'
import Header from './Header.jsx'
import Loader from './Loader.jsx'
import Error from './Error.jsx'
import NextButton from './NextButton.jsx'
import Question from './Question.jsx'
import StartScreen from './StartScreen.jsx'
import MainSection from './MainSection.jsx'
import { useReducer } from 'react'
import Progress from './Progress.jsx'
import FinishScreen from './FinishScreen.jsx'
import Footer from './Footer.jsx'
import Timer from './Timer.jsx'

const SECS_PER_QUESTION = 30

const initialState = {
    questions: [],
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: null,
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
                secondsRemaining: state.questions.length * SECS_PER_QUESTION,
            }
        case 'newAnswer':
            // eslint-disable-next-line no-case-declarations
            const question = state.questions.at(state.index)

            return {
                ...state,
                answer: action.payload,
                points: action.payload === question.correctOption ? state.points + question.points : state.points,
            }
        case 'nextQuestion':
            return {
                ...state,
                index: state.index + 1,
                answer: null,
            }
        case 'finish':
            return {
                ...state,
                status: 'finished',
                highscore: state.points > state.highscore ? state.points : state.highscore,
            }
        case 'restart':
            return {
                ...initialState,
                questions: state.questions,
                status: 'ready',
            }
        case 'tick':
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0 ? 'finished' : state.status,
            }
        default:
            throw new Error('Action unknown')
    }
}

function App() {
    const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(
        reducer,
        initialState
    )

    const numQuestions = questions.length
    const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0)

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
                {status === 'active' && (
                    <>
                        <Progress
                            index={index}
                            numQuestions={numQuestions}
                            points={points}
                            maxPossiblePoints={maxPossiblePoints}
                            answer={answer}
                        />
                        <Question dispatch={dispatch} answer={answer} question={questions[index]} />
                        <Footer>
                            <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
                            <NextButton dispatch={dispatch} answer={answer} numQuestions={numQuestions} index={index} />
                        </Footer>
                    </>
                )}
                {status === 'finished' && (
                    <FinishScreen
                        highscore={highscore}
                        points={points}
                        dispatch={dispatch}
                        maxPossiblePoints={maxPossiblePoints}
                    />
                )}
            </MainSection>
        </div>
    )
}

export default App
