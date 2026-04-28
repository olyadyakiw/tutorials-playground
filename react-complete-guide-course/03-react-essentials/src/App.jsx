import { useState } from 'react'
import CoreConcept from './components/CoreConcept'
import Header from './components/Header/Header'
import TabButton from './components/TabButton'
import { CORE_CONCEPTS, EXAMPLES, userData } from './data'

function MainGoal({ title, description }) {
    return (
        <div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    )
}

function User({ firstName, lastName, title }) {
    return (
        <p>
            {firstName} {lastName} - {title}
        </p>
    )
}

function App() {
    const [selectedTopic, setSelectedTopic] = useState()

    function handleClick(selectedButton) {
        setSelectedTopic(selectedButton)
    }

    return (
        <div>
            <Header />
            <main>
                <section id="core-concepts">
                    <h2>Pure concepts</h2>
                    <ul>
                        {CORE_CONCEPTS.map(concept => (
                            <CoreConcept key={concept.title} {...concept} />
                        ))}
                    </ul>
                </section>
                <section id="examples">
                    <h2>Examples</h2>
                    <menu>
                        <TabButton
                            isSelected={selectedTopic === 'components'}
                            onClick={() => handleClick('components')}
                        >
                            Components
                        </TabButton>
                        <TabButton isSelected={selectedTopic === 'jsx'} onClick={() => handleClick('jsx')}>
                            JSX
                        </TabButton>
                        <TabButton isSelected={selectedTopic === 'props'} onClick={() => handleClick('props')}>
                            Props
                        </TabButton>
                        <TabButton isSelected={selectedTopic === 'state'} onClick={() => handleClick('state')}>
                            State
                        </TabButton>
                    </menu>
                    {!selectedTopic ? (
                        <p>Please select a topic</p>
                    ) : (
                        <div id="tab-content">
                            <h3>{EXAMPLES[selectedTopic].title}</h3>
                            <p>{EXAMPLES[selectedTopic].description}</p>
                            <pre>
                                <code>{EXAMPLES[selectedTopic].code}</code>
                            </pre>
                        </div>
                    )}
                </section>
            </main>
            {/* <MainGoal title="Learn React" description="in-depth" /> */}
            {/* <MainGoal title="Practice" description="practice working with react" /> */}
            {/* <User {...userData} /> */}
        </div>
    )
}

export default App
