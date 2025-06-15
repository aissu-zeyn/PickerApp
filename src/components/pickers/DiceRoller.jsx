import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Dice3D } from './Dice3D'
import './DiceRoller.css'

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error in DiceRoller:', error, errorInfo)
    this.setState({ errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>Something went wrong</h2>
          <details className="error-details">
            <summary>Error Details</summary>
            <p>{this.state.error && this.state.error.toString()}</p>
            <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
          </details>
        </div>
      )
    }

    return this.props.children
  }
}

export function DiceRoller() {
  const [result, setResult] = useState(null)
  const [isRolling, setIsRolling] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    console.log('DiceRoller mounted')
    setMounted(true)
    return () => {
      console.log('DiceRoller unmounted')
      setMounted(false)
    }
  }, [])

  const rollDice = () => {
    setIsRolling(true)
    const newResult = Math.floor(Math.random() * 6) + 1
    setResult(newResult)
    setTimeout(() => setIsRolling(false), 2000)
  }

  if (!mounted) {
    return <div>Loading...</div>
  }

  return (
    <ErrorBoundary>
      <div className="dice-roller">
        <div className="controls">
          <button onClick={rollDice} disabled={isRolling}>
            {isRolling ? 'Rolling...' : 'Roll'}
          </button>
        </div>
        
        <div className="canvas-container">
          <Canvas>
            <color attach="background" args={['#1a1a1a']} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <directionalLight position={[-5, 5, -5]} intensity={0.5} />
            <OrbitControls enablePan={false} />
            <Dice3D
              isRolling={isRolling}
              result={result}
              position={[0, 0, 0]}
            />
          </Canvas>
        </div>
      </div>
    </ErrorBoundary>
  )
} 