import { useState } from 'react'
import './index.css'
import Logo from './components/Logo.jsx'
import Form from './components/Form.jsx'
import PackingList from './components/PackingList.jsx'
import Stats from './components/Stats.jsx'

// const initialItems = [
//     { id: 1, description: 'Passports', quantity: 2, packed: false },
//     { id: 2, description: 'Socks', quantity: 12, packed: false },
//     { id: 3, description: 'Socks', quantity: 12, packed: true },
// ]

function App() {
    const [items, setItems] = useState([])

    function handleAddItem(item) {
        setItems(items => [...items, item])
    }

    function handleDeleteItem(id) {
        setItems(items => items.filter(item => item.id !== id))
    }

    function handleToggleItem(id) {
        setItems(items => items.map(item => (item.id === id ? { ...item, packed: !item.packed } : item)))
    }

    function handleDeleteList() {
        const confirmed = window.confirm('Are you sure?')
        confirmed && setItems([])
    }

    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleAddItem} />
            <PackingList
                onDeleteList={handleDeleteList}
                onToggleItem={handleToggleItem}
                onDeleteItem={handleDeleteItem}
                items={items}
            />
            <Stats items={items} />
        </div>
    )
}

export default App
