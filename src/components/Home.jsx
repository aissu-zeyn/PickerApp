import { Link } from 'react-router-dom'
import './Home.css'

const pickerTypes = [
  {
    id: 'list',
    title: 'List Picker',
    description: 'Add items and randomly select one',
    icon: '📋'
  },
  {
    id: 'wheel',
    title: 'Wheel Spinner',
    description: 'Visual spinning wheel with your options',
    icon: '🎡'
  },
  {
    id: 'dice',
    title: 'Dice Roller',
    description: 'Roll 1-6 sided dice',
    icon: '🎲'
  },
  {
    id: 'coin',
    title: 'Coin Flip',
    description: 'Heads or tails',
    icon: '🪙'
  },
  {
    id: 'number',
    title: 'Number Generator',
    description: 'Pick random number in a range',
    icon: '🔢'
  }
]

function Home() {
  return (
    <div className="home">
      <h1>Random Picker</h1>
      <div className="picker-grid">
        {pickerTypes.map((picker) => (
          <Link to={`/picker/${picker.id}`} key={picker.id} className="picker-card">
            <div className="picker-icon">{picker.icon}</div>
            <h2>{picker.title}</h2>
            <p>{picker.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home 