import { useEffect } from 'react'
import Header from './Header.jsx'
import Loader from './Loader.jsx'
import Error from './Error.jsx'
import NextButton from './NextButton.jsx'
import Question from './Question.jsx'
import StartScreen from './StartScreen.jsx'
import MainSection from './MainSection.jsx'
import Progress from './Progress.jsx'
import FinishScreen from './FinishScreen.jsx'
import Footer from './Footer.jsx'
import Timer from './Timer.jsx'
import { useQuiz } from '../context/QuizContext.jsx'

function App() {
    const { status } = useQuiz()

    return (
        <div className="app">
            <Header />
            <MainSection>
                {status === 'loading' && <Loader />}
                {status === 'error' && <Error />}
                {status === 'ready' && <StartScreen />}
                {status === 'active' && (
                    <>
                        <Progress />
                        <Question />
                        <Footer>
                            <Timer />
                            <NextButton />
                        </Footer>
                    </>
                )}
                {status === 'finished' && <FinishScreen />}
            </MainSection>
        </div>
    )
}

export default App
