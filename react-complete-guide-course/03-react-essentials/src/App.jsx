import { useState } from 'react'
import Header from './components/Header/Header'
import { userData } from './data'
import CoreConcepts from './components/CoreConcepts'
import Examples from './components/Examples'

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
    return (
        <>
            <Header />
            <main>
                <CoreConcepts />
                <Examples />
            </main>
            {/* <MainGoal title="Learn React" description="in-depth" /> */}
            {/* <MainGoal title="Practice" description="practice working with react" /> */}
            {/* <User {...userData} /> */}
        </>
    )
}

export default App
