import { useNavigate } from 'react-router-dom'
import './HomePage.css'

const HomePage = () => {
    const navigate = useNavigate()

    return (
        <div className="homepage-container">
            <header className="header">
                <h1 className="title">🎱 Pool</h1>
            </header>

            <main className="menu-horizontal">
                <button className="menu-btn" onClick={() => navigate('/offline')}>
                    🎮 Play Now
                </button>
            </main>

            <footer className="footer">
                <p>Made by <a href="https://github.com/skrohan0420" target="_blank" rel="noopener noreferrer">Sk Rohan</a></p>
            </footer>
        </div>
    )
}

export default HomePage
