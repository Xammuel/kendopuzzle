import { useState } from 'react'
import { Slider } from '@progress/kendo-react-inputs'
import type { PuzzleProps } from '../../types'

interface RiddleSlider {
  id: number
  riddle: string
  correctValue: number
}

const RiddleSlidersPuzzle: React.FC<PuzzleProps> = ({ onComplete, isCompleted }) => {
  // Difficult riddles with answers 1-10
  const riddles: RiddleSlider[] = [
    {
      id: 0,
      riddle: "The loneliest number, yet the foundation of all counting systems.",
      correctValue: 1
    },
    {
      id: 1,
      riddle: "In binary, I am 11. In Roman numerals, I am III. In prime factorization, I am myself.",
      correctValue: 3
    },
    {
      id: 2,
      riddle: "The largest single digit, and the number of planets in our solar system if you exclude the dwarf planet.",
      correctValue: 8
    }
  ]

  const [sliderValues, setSliderValues] = useState<number[]>([5, 5, 5])
  const [hasAttempted, setHasAttempted] = useState<boolean>(false)

  const handleSliderChange = (index: number, value: number) => {
    if (isCompleted) return
    
    // Ensure we always work with integers
    const integerValue = Math.round(value)
    
    const newValues = [...sliderValues]
    newValues[index] = integerValue
    setSliderValues(newValues)
    setHasAttempted(true)
    
    // Check if all values are correct
    const isCorrect = riddles.every((riddle, idx) => newValues[idx] === riddle.correctValue)
    
    if (isCorrect) {
      setTimeout(() => {
        onComplete()
      }, 1000)
    }
  }

  const getCurrentState = () => {
    if (isCompleted) return 'completed'
    if (!hasAttempted) return 'initial'
    
    const correctCount = riddles.filter((riddle, idx) => sliderValues[idx] === riddle.correctValue).length
    if (correctCount === 0) return 'all-wrong'
    if (correctCount === riddles.length) return 'completed'
    return 'partial'
  }

  const currentState = getCurrentState()

  const getCipherStatus = () => {
    if (currentState === 'completed') return '🔓 UNLOCKED'
    return '🔒 LOCKED'
  }

  return (
    <div className="puzzle-container">
      <div className="puzzle-info">
        <h2>Puzzle 5: The Cipher of Three</h2>
        <p>Solve each riddle and set the corresponding slider to the correct number (1-10).</p>
        
        {currentState === 'completed' && (
          <p className="win-message">🎉 The cipher is broken! You have proven your mathematical wisdom!</p>
        )}
      </div>

      <div className="cipher-status">
        <p>Cipher Status: {getCipherStatus()}</p>
      </div>

      <div className="riddle-sliders-container">
        {riddles.map((riddle, index) => {
          return (
            <div key={riddle.id} className="riddle-slider-item">
              <div className="riddle-text">
                <span className="riddle-number">#{index + 1}</span>
                <p>{riddle.riddle}</p>
              </div>
              
              <div className="slider-container">
                <Slider
                  value={Math.round(sliderValues[index])}
                  onChange={(e) => handleSliderChange(index, e.value)}
                  min={1}
                  max={10}
                  step={1}
                  vertical={true}
                  className="riddle-slider"
                  disabled={isCompleted}
                />
                <div className="value-display">
                  <span className="current-value">
                    {Math.round(sliderValues[index])}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RiddleSlidersPuzzle