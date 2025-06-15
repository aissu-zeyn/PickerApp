import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './NumberGenerator.css'

function NumberGenerator() {
  const [min, setMin] = useState(1)
  const [max, setMax] = useState(100)
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])

  const generateNumber = () => {
    if (isGenerating || min >= max) return

    setIsGenerating(true)
    setResult(null)

    // Simulate generation animation
    setTimeout(() => {
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min
      setResult(randomNum)
      setHistory(prev => [randomNum, ...prev].slice(0, 10))
      setIsGenerating(false)
    }, 1000)
  }

  const handleMinChange = (e) => {
    const value = parseInt(e.target.value) || 0
    setMin(value)
    if (value > max) setMax(value)
  }

  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value) || 0
    setMax(value)
    if (value < min) setMin(value)
  }

  return (
    <div className="number-generator">
      <div className="range-controls">
        <div className="range-group">
          <label>Minimum:</label>
          <input
            type="number"
            value={min}
            onChange={handleMinChange}
            className="range-input"
          />
        </div>

        <div className="range-group">
          <label>Maximum:</label>
          <input
            type="number"
            value={max}
            onChange={handleMaxChange}
            className="range-input"
          />
        </div>
      </div>

      <div className="number-display">
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div
              key="generating"
              className="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="loading-dots">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </div>
            </motion.div>
          ) : result !== null && (
            <motion.div
              key="result"
              className="result"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              {result}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="picker-section">
        <button
          onClick={generateNumber}
          disabled={isGenerating || min >= max}
          className={`generate-button ${isGenerating ? 'generating' : ''}`}
        >
          {isGenerating ? 'Generating...' : 'Generate Number'}
        </button>

        {history.length > 0 && (
          <div className="history">
            <h3>Recent Numbers</h3>
            <div className="history-list">
              {history.map((num, index) => (
                <motion.div
                  key={index}
                  className="history-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {num}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NumberGenerator 