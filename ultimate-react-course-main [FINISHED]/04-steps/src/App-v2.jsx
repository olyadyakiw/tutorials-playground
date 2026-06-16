import { useState } from 'react'
import './index.css'

const messages = ['Learn React ⚛️', 'Apply for jobs 💼', 'Invest your new income 🤑']

function App() {
    return (
        <>
            <Steps />
            {/* <Steps /> */}
            <StepMessage step={1}>
                <p>Pass in content</p>
            </StepMessage>
            <StepMessage step={2}>
                <p>Pass in content</p>
            </StepMessage>
        </>
    )
}

function Steps() {
    const [step, setStep] = useState(1)
    const [isOpen, setIsOpen] = useState(true)

    function handlePrev() {
        if (step > 1) setStep(step => step - 1)
    }

    function handleNext() {
        if (step < messages.length) setStep(step => step + 1)
    }

    return (
        <div>
            <button onClick={() => setIsOpen(isOpen => !isOpen)} className="close">
                &times;
            </button>
            {isOpen && (
                <div className="steps">
                    <div className="numbers">
                        <div className={step >= 1 ? 'active' : ''}>1</div>
                        <div className={step >= 2 ? 'active' : ''}>2</div>
                        <div className={step >= 3 ? 'active' : ''}>3</div>
                    </div>

                    <StepMessage step={step}>
                        {messages[step - 1]}

                        <div className="buttons">
                            <Button bgColor="#e7e7e7" textColor="#333">
                                Click here
                            </Button>
                        </div>
                    </StepMessage>

                    <div className="buttons">
                        <Button textColor="#fff" bgColor="#7950f2" handleClick={handlePrev}>
                            <span>👈</span> Previous
                        </Button>
                        <Button textColor="#fff" bgColor="#7950f2" handleClick={handleNext}>
                            Next <span>👉</span>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

function Button({ children, textColor, bgColor, handleClick }) {
    return (
        <button onClick={handleClick} style={{ backgroundColor: bgColor, color: textColor }}>
            <span>{children}</span>
        </button>
    )
}

function StepMessage({ step, children }) {
    return (
        <div className="message">
            <h3>Step {step}: </h3>
            {children}
        </div>
    )
}

export default App
