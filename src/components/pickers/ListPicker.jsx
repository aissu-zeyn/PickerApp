import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ListPicker.css'

function ListPicker() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')
  const [isPicking, setIsPicking] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const addItem = () => {
    if (newItem.trim() && !items.includes(newItem.trim())) {
      setItems([...items, newItem.trim()])
      setNewItem('')
    }
  }

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const pickRandom = () => {
    if (isPicking || items.length === 0) return

    setIsPicking(true)
    setSelectedItem(null)

    // Simulate picking animation
    const pickInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * items.length)
      setSelectedItem(items[randomIndex])
    }, 100)

    // Stop after 2 seconds
    setTimeout(() => {
      clearInterval(pickInterval)
      setIsPicking(false)
    }, 2000)
  }

  return (
    <div className="list-picker">
      <div className="picker-section">
        <div className="input-group">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
            placeholder="Add an item"
            className="text-input"
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

      <div className="picker-section">
        <button
          onClick={pickRandom}
          disabled={isPicking || items.length === 0}
          className={`pick-button ${isPicking ? 'picking' : ''}`}
        >
          {isPicking ? 'Picking...' : 'Pick Random'}
        </button>

        <AnimatePresence mode="wait">
          {selectedItem && (
            <motion.div
              className="selected-item"
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

export default ListPicker 