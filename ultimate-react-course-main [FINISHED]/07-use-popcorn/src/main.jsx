import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import StarRating from './StarRating.jsx'

// function Test() {
//     const [movie, setMovie] = useState()
//     return (
//         <div>
//             <StarRating color="blue" maxRating={10} onSetRating={setMovie} />
//             <p>This movies was rated {movie} stars</p>
//         </div>
//     )
// }

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
        {/* <StarRating messages={['Terrible', 'Bad', 'Okay', 'Good', 'Perfect']} /> */}
        {/* <StarRating className="stars" size={24} color="red" defaultRating={3} /> */}

        {/* <Test /> */}
    </StrictMode>
)
