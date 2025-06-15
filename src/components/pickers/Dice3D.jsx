import React, { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function Dice3D({ isRolling, result, position = [0, 0, 0] }) {
  const diceRef = useRef()
  const [error, setError] = useState(null)
  const [mounted, setMounted] = useState(false)
  
  // Load the GLB model with the correct base path
  const { nodes, materials } = useGLTF('/picker-app/dice.glb', undefined, (err) => {
    console.error('Error loading model:', err)
    setError(err)
  })

  // Log the model structure to help with debugging
  useEffect(() => {
    if (nodes) {
      console.log('Available nodes:', Object.keys(nodes))
    }
    if (materials) {
      console.log('Available materials:', Object.keys(materials))
    }
  }, [nodes, materials])

  useEffect(() => {
    console.log('Dice3D mounted')
    setMounted(true)
    return () => {
      console.log('Dice3D unmounted')
      setMounted(false)
    }
  }, [])

  // Animation
  useFrame((state, delta) => {
    if (!mounted || !diceRef.current) return

    if (isRolling) {
      diceRef.current.rotation.x += delta * 5
      diceRef.current.rotation.y += delta * 5
      diceRef.current.rotation.z += delta * 5
    } else if (result) {
      // Updated rotation mapping based on observed behavior
      const rotations = {
        1: { x: Math.PI, y: 0, z: 0 },               // When 6 shows, 1 is picked
        2: { x: Math.PI, y: 0, z: 0 },               // When 6 shows, 2 is picked
        3: { x: 0, y: 0, z: -Math.PI / 2 },          // When 2 shows, 3 is picked
        4: { x: 0, y: 0, z: 0 },                     // When 1 shows, 4 is picked
        5: { x: 0, y: 0, z: 0 },                     // When 5 shows, 5 is picked
        6: { x: 0, y: 0, z: 0 }                      // When 6 shows, 6 is picked
      }
      
      const targetRotation = rotations[result]
      diceRef.current.rotation.x = THREE.MathUtils.lerp(diceRef.current.rotation.x, targetRotation.x, 0.1)
      diceRef.current.rotation.y = THREE.MathUtils.lerp(diceRef.current.rotation.y, targetRotation.y, 0.1)
      diceRef.current.rotation.z = THREE.MathUtils.lerp(diceRef.current.rotation.z, targetRotation.z, 0.1)
    }
  })

  if (!mounted) {
    return null
  }

  if (error) {
    console.error('Dice3D Error:', error)
    return <mesh ref={diceRef} position={position}><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="red" /></mesh>
  }

  return (
    <group ref={diceRef} position={position} scale={10}>
      <primitive object={nodes.Scene || nodes.dice || Object.values(nodes)[0]} />
    </group>
  )
} 