import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './components/Home'
import ListPicker from './components/pickers/ListPicker'
import WheelSpinner from './components/pickers/WheelSpinner'
import DiceRoller from './components/pickers/DiceRoller'
import CoinFlip from './components/pickers/CoinFlip'
import NumberGenerator from './components/pickers/NumberGenerator'
import './App.css'

function Navigation() {
  const location = useLocation()
<<<<<<< HEAD
  const isHome = location.pathname === '/'
=======
  const isHome = location.pathname === '/' || location.pathname === '/picker-app/' || location.pathname === '/picker-app'
>>>>>>> d2668f09f45e95ad1823e954f15c4ca55b5fd4cd

  if (isHome) return null

  return (
    <nav className="mobile-nav">
      <Link to="/" className="back-button">
        ← Back
      </Link>
    </nav>
  )
}

function App() {
  return (
    <Router basename="/picker-app">
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/picker/list" element={<ListPicker />} />
            <Route path="/picker/wheel" element={<WheelSpinner />} />
            <Route path="/picker/dice" element={<DiceRoller />} />
            <Route path="/picker/coin" element={<CoinFlip />} />
            <Route path="/picker/number" element={<NumberGenerator />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
