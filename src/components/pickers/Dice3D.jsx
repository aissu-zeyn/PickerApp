import React, { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import diceModel from '../../assets/dice.glb'

export function Dice3D({ isRolling, result, position = [0, 0, 0] }) {
  const diceRef = useRef()
  const [error, setError] = useState(null)
  const [mounted, setMounted] = useState(false)
  
  // Load the GLB model from assets
  const { nodes, materials } = useGLTF(diceModel, undefined, (err) => {
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
      // Corrected rotation mapping for each number
      const rotations = {
        1: { x: 0, y: 0, z: 0 },                     // 1 on top
        2: { x: -Math.PI / 2, y: 0, z: 0 },          // 2 on top
        3: { x: 0, y: Math.PI / 2, z: 0 },           // 3 on top
        4: { x: 0, y: -Math.PI / 2, z: 0 },          // 4 on top
        5: { x: Math.PI / 2, y: 0, z: 0 },           // 5 on top
        6: { x: Math.PI, y: 0, z: 0 }                // 6 on top
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