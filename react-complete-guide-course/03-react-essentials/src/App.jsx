import CoreConcept from './components/CoreConcept'
import Header from './components/Header/Header'
import TabButton from './components/TabButton'
import { CORE_CONCEPTS, EXAMPLES, userData } from './data'

function MainGoal() {
    return <p>My main goal: Learn react from the ground up</p>
}

function User({ firstName, lastName, title }) {
    return (
        <p>
            {firstName} {lastName} - {title}
        </p>
    )
}

function App() {
    return (
        <div>
            <Header />
            <main>
                <section id="core-concepts">
                    <h2>Pure concepts</h2>
                    <ul>
                        <CoreConcept {...CORE_CONCEPTS[0]} />
                        <CoreConcept {...CORE_CONCEPTS[1]} />
                        <CoreConcept {...CORE_CONCEPTS[2]} />
                        <CoreConcept {...CORE_CONCEPTS[3]} />
                    </ul>
                </section>
                <section id="examples">
                    <h2>Examples</h2>
                    <menu>
                        <TabButton>Components</TabButton>
                        <TabButton>JSX</TabButton>
                        <TabButton>Props</TabButton>
                        <TabButton>State</TabButton>
                    </menu>
                </section>
            </main>
            {/* <MainGoal /> */}
            {/* <User {...userData} /> */}
        </div>
    )
}

export default App
