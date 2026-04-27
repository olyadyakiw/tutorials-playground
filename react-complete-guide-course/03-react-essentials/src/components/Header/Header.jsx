const reactDescriptions = ['Fundamental', 'Crucial', 'Core']
import reactImg from '../../assets/react-core-concepts.png'

function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1))
}

function Header() {
    const descripton = reactDescriptions[getRandomInt(reactDescriptions.length - 1)]
    return (
        <header>
            <img src={reactImg} alt="Stylized atom" />
            <h1>React Essentials</h1>
            <p>{descripton} React concepts you will need for almost any app you are going to build!</p>
        </header>
    )
}

export default Header
