import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './WheelSpinner.css'

function WheelSpinner() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [rotation, setRotation] = useState(0)
  const [wheelColors, setWheelColors] = useState([])

  useEffect(() => {
    // Generate colors for wheel segments
    const colors = items.map((_, index) => {
      const hue = (index * 360) / Math.max(items.length, 1)
      return `hsl(${hue}, 70%, 60%)`
    })
    setWheelColors(colors)
  }, [items])

  const addItem = () => {
    if (newItem.trim() && !items.includes(newItem.trim())) {
      setItems([...items, newItem.trim()])
      setNewItem('')
    }
  }

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const spinWheel = () => {
    if (isSpinning || items.length === 0) return

    setIsSpinning(true)
    setSelectedItem(null)

    // Calculate random rotation (5-10 full spins + random angle)
    const spins = 5 + Math.random() * 5
    const extraRotation = Math.random() * 360
    const totalRotation = spins * 360 + extraRotation

    // Calculate which item will be selected
    const segmentAngle = 360 / items.length
    const normalizedRotation = totalRotation % 360
    const selectedIndex = Math.floor(((360 - normalizedRotation) % 360) / segmentAngle)
    const selected = items[selectedIndex]

    setRotation(prev => prev + totalRotation)

    // Show result after animation
    setTimeout(() => {
      setSelectedItem(selected)
      setIsSpinning(false)
    }, 3000)
  }

  const getArcPath = (index) => {
    if (items.length === 0) return ''
    
    const angle = (360 / items.length) * index
    const nextAngle = (360 / items.length) * (index + 1)
    
    const startRad = (angle - 90) * Math.PI / 180
    const endRad = (nextAngle - 90) * Math.PI / 180
    
    const x1 = 50 + 50 * Math.cos(startRad)
    const y1 = 50 + 50 * Math.sin(startRad)
    const x2 = 50 + 50 * Math.cos(endRad)
    const y2 = 50 + 50 * Math.sin(endRad)
    
    const largeArcFlag = nextAngle - angle <= 180 ? 0 : 1
    
    return `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`
  }

  const getTextPosition = (index) => {
    if (items.length === 0) return { x: 50, y: 50 }
    
    const angle = (360 / items.length) * index + (360 / items.length) / 2
    const rad = (angle - 90) * Math.PI / 180
    
    return {
      x: 50 + 35 * Math.cos(rad),
      y: 50 + 35 * Math.sin(rad)
    }
  }

  return (
    <div className="wheel-spinner">
      <div className="picker-section">
<<<<<<< HEAD
        <div className="input-form">
=======
        <div className="input-group">
>>>>>>> d2668f09f45e95ad1823e954f15c4ca55b5fd4cd
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
            placeholder="Add an item"
<<<<<<< HEAD
            className="input-field"
=======
            className="text-input"
>>>>>>> d2668f09f45e95ad1823e954f15c4ca55b5fd4cd
          />
          <button onClick={addItem} className="add-button">
            Add
          </button>
        </div>

        <div className="items-list">
          {items.map((item, index) => (
            <div key={index} className="item">
              <span>{item}</span>
              <button
                onClick={() => removeItem(index)}
                className="remove-button"
                title="Remove item"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="wheel-container">
        <svg 
          viewBox="0 0 100 100" 
          className="wheel"
<<<<<<< HEAD
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 3s cubic-bezier(0.17, 0.67, 0.83, 0.67)' : 'none'
          }}
=======
          style={{ transform: `rotate(${rotation}deg)` }}
>>>>>>> d2668f09f45e95ad1823e954f15c4ca55b5fd4cd
        >
          {items.map((item, index) => {
            const pos = getTextPosition(index)
            return (
              <g key={index}>
                <path
                  d={getArcPath(index)}
                  fill={wheelColors[index]}
                  stroke="white"
                  strokeWidth="0.5"
                />
                <text
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="4"
                  fontWeight="bold"
                  transform={`rotate(${90 + (360 / items.length) * index}, ${pos.x}, ${pos.y})`}
                >
                  {item}
                </text>
              </g>
            )
          })}
        </svg>
<<<<<<< HEAD
        <div className="spinner"></div>
=======
        <div className="wheel-pointer"></div>
>>>>>>> d2668f09f45e95ad1823e954f15c4ca55b5fd4cd
      </div>

      <div className="picker-section">
        <button
          onClick={spinWheel}
          disabled={isSpinning || items.length === 0}
<<<<<<< HEAD
          className="add-button"
=======
          className={`spin-button ${isSpinning ? 'spinning' : ''}`}
>>>>>>> d2668f09f45e95ad1823e954f15c4ca55b5fd4cd
        >
          {isSpinning ? 'Spinning...' : 'Spin Wheel'}
        </button>

        <AnimatePresence mode="wait">
          {selectedItem && (
            <motion.div
<<<<<<< HEAD
              className="picked-item"
=======
              className="selected-item"
>>>>>>> d2668f09f45e95ad1823e954f15c4ca55b5fd4cd
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h3>Selected:</h3>
              <p>{selectedItem}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default WheelSpinner 