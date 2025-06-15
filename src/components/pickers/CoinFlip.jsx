import { useState } from 'react'
import { motion } from 'framer-motion'
import './CoinFlip.css'

function CoinFlip() {
  const [isFlipping, setIsFlipping] = useState(false)
  const [isHeads, setIsHeads] = useState(true)

  const flipCoin = () => {
    if (isFlipping) return

    setIsFlipping(true)
    
    // Simulate flipping animation
    setTimeout(() => {
      const result = Math.random() < 0.5
      setIsHeads(result)
      setIsFlipping(false)
    }, 1000)
  }

  return (
    <div className="coin-flip">
      <div className="coin-container">
        <motion.div
          className="coin"
          animate={{
            rotateX: isFlipping ? [0, 360, 720, 1080] : isHeads ? 0 : 180
          }}
          transition={{ duration: isFlipping ? 1 : 0.5 }}
        >
          <div className="coin-front">H</div>
          <div className="coin-back">T</div>
        </motion.div>
      </div>

      <div className="picker-section">
        <button
          onClick={flipCoin}
          disabled={isFlipping}
          className={`flip-button ${isFlipping ? 'flipping' : ''}`}
        >
          {isFlipping ? 'Flipping...' : 'Flip Coin'}
        </button>

        {!isFlipping && (
          <div className="result-summary">
            <h3>Result:</h3>
            <p className="result-text">{isHeads ? 'Heads' : 'Tails'}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CoinFlip 