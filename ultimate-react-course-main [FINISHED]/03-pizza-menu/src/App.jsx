const pizzaData = [
    {
        name: 'Focaccia',
        ingredients: 'Bread with italian olive oil and rosemary',
        price: 6,
        photoName: 'pizzas/focaccia.jpg',
        soldOut: false,
    },
    {
        name: 'Pizza Margherita',
        ingredients: 'Tomato and mozarella',
        price: 10,
        photoName: 'pizzas/margherita.jpg',
        soldOut: false,
    },
    {
        name: 'Pizza Spinaci',
        ingredients: 'Tomato, mozarella, spinach, and ricotta cheese',
        price: 12,
        photoName: 'pizzas/spinaci.jpg',
        soldOut: false,
    },
    {
        name: 'Pizza Funghi',
        ingredients: 'Tomato, mozarella, mushrooms, and onion',
        price: 12,
        photoName: 'pizzas/funghi.jpg',
        soldOut: false,
    },
    {
        name: 'Pizza Salamino',
        ingredients: 'Tomato, mozarella, and pepperoni',
        price: 15,
        photoName: 'pizzas/salamino.jpg',
        soldOut: true,
    },
    {
        name: 'Pizza Prosciutto',
        ingredients: 'Tomato, mozarella, ham, aragula, and burrata cheese',
        price: 18,
        photoName: 'pizzas/prosciutto.jpg',
        soldOut: false,
    },
]

import './index.css'

function App() {
    return (
        <div className="container">
            <Header />
            <Menu />
            <Footer />
        </div>
    )
}

function Header() {
    // const style = { color: 'red', fontSize: '48px', textTransform: 'uppercase' }
    return (
        <header className="header">
            <h1 className="header">Fast React Pizza Co.</h1>
        </header>
    )
}

function Menu() {
    const pizzas = pizzaData
    // const pizzas = []
    const numPizzas = pizzas.length
    return (
        <main className="menu">
            <h2>Our menu</h2>
            {numPizzas > 0 ? (
                <>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, illo!</p>
                    <ul className="pizzas">
                        {pizzas.map(pizza => {
                            return <Pizza key={pizza.name} pizzaObj={pizza} />
                        })}
                    </ul>
                </>
            ) : (
                <p>We're still working on our menu</p>
            )}
        </main>
    )
}

function Pizza({ pizzaObj }) {
    // if (pizzaObj.soldOut) return null
    return (
        <li className={`pizza ${pizzaObj.soldOut ? 'sold-out' : ''}`}>
            <img src={pizzaObj.photoName} alt={pizzaObj.name} />
            <div>
                <h3>{pizzaObj.name}</h3>
                <p>{pizzaObj.ingredients}</p>
                <span>{pizzaObj.soldOut ? 'SOLD OUT' : pizzaObj.price}</span>
            </div>
        </li>
    )
}

function Footer() {
    const hour = new Date().getHours()
    const openHour = 8
    const closeHour = 21
    const isOpen = hour >= openHour && hour <= closeHour

    // if (hour >= openHour && hour <= closeHour) {
    //     alert("We're currently open")
    // } else {
    //     alert('Sorry, we closed!')
    // }

    // if (!isOpen) return <p>We're happy to see you in {openHour}:00</p>

    return <footer>{isOpen ? <Order closeHour={closeHour} /> : <p>We're happy to see you in {openHour}:00</p>}</footer>
}

function Order({ closeHour }) {
    return (
        <div className="order">
            <p>We're open until {closeHour}:00. Come visit us or order online</p>
            <button className="btn">Order</button>
        </div>
    )
}

export default App
