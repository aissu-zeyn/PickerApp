import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './DiceRoller.css'

const DICE_DOTS = {
  1: [[4]], // center
  2: [[2, 6]], // top-left, bottom-right
  3: [[2, 4, 6]], // top-left, center, bottom-right
  4: [[0, 2, 6, 8]], // all corners
  5: [[0, 2, 4, 6, 8]], // all corners + center
  6: [[0, 2, 3, 5, 6, 8]], // all corners + middle sides
}

function DiceRoller() {
  const [isRolling, setIsRolling] = useState(false)
  const [result, setResult] = useState(null)
  const [diceCount, setDiceCount] = useState(1)
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 })

  const rollDice = () => {
    if (isRolling) return

    setIsRolling(true)
    setResult(null)

    // Generate random rotation for 3D effect
    const newRotation = {
      x: Math.random() * 360,
      y: Math.random() * 360,
      z: Math.random() * 360
    }
    setRotation(newRotation)

    // Simulate rolling animation
    setTimeout(() => {
      const results = Array.from({ length: diceCount }, () => 
        Math.floor(Math.random() * 6) + 1
      )
      setResult(results)
      setIsRolling(false)
    }, 1000)
  }

  const renderDiceFace = (value) => {
    const dots = DICE_DOTS[value] || []
    return (
      <div className="die-face">
        {dots.map((position, index) => (
          <div
            key={index}
            className="dot"
            data-position={position}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="dice-roller">
      <div className="dice-controls">
        <div className="control-group">
          <label>Number of Dice:</label>
          <input
            type="number"
            min="1"
            max="10"
            value={diceCount}
            onChange={(e) => setDiceCount(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
            className="number-input"
          />
        </div>
      </div>

      <div className="dice-container">
        <AnimatePresence mode="wait">
          {isRolling ? (
            <motion.div
              key="rolling"
              className="dice"
              initial={{ rotateX: 0, rotateY: 0, rotateZ: 0 }}
              animate={{
                rotateX: [0, 360, 720, 1080],
                rotateY: [0, 360, 720, 1080],
                rotateZ: [0, 360, 720, 1080]
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              {Array.from({ length: diceCount }).map((_, i) => (
                <div key={i} className="die">
                  <div className="die-inner">
                    {Array.from({ length: 6 }).map((_, face) => (
                      <div key={face} className="die-face">
                        {renderDiceFace(face + 1)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          ) : result && (
            <motion.div
              key="result"
              className="dice"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                rotateX: rotation.x,
                rotateY: rotation.y,
                rotateZ: rotation.z
              }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              {result.map((value, i) => (
                <div key={i} className="die">
                  <div className="die-inner">
                    {Array.from({ length: 6 }).map((_, face) => (
                      <div key={face} className="die-face">
                        {renderDiceFace(face + 1)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="picker-section">
        <button
          onClick={rollDice}
          disabled={isRolling}
          className={`roll-button ${isRolling ? 'rolling' : ''}`}
        >
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </button>

        {result && (
          <motion.div
            className="result-summary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3>Results:</h3>
            <p className="result-numbers">{result.join(' + ')}</p>
            {diceCount > 1 && (
              <p className="result-total">Total: {result.reduce((a, b) => a + b, 0)}</p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default DiceRoller 