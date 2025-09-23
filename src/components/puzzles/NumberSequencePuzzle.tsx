import { useState, useEffect } from 'react'
import { Button } from '@progress/kendo-react-buttons'
import type { PuzzleProps, GridButton } from '../../types'

const NumberSequencePuzzle: React.FC<PuzzleProps> = ({ onComplete, isCompleted }) => {
  const [buttons, setButtons] = useState<GridButton[]>([])
  const [currentSequence, setCurrentSequence] = useState<number[]>([])
  const [nextExpected, setNextExpected] = useState<number>(1)

  // Shuffle function to randomize button positions
  const shuffleArray = (array: number[]): number[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Initialize or reset puzzle
  const initializePuzzle = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const shuffledNumbers = shuffleArray(numbers)
    
    const newButtons: GridButton[] = shuffledNumbers.map((number, index) => ({
      id: index,
      number: number,
      position: index
    }))
    
    setButtons(newButtons)
    setCurrentSequence([])
    setNextExpected(1)
  }

  // Handle button click
  const handleButtonClick = (button: GridButton) => {
    if (isCompleted) return

    if (button.number === nextExpected) {
      // Correct button pressed
      const newSequence = [...currentSequence, button.number]
      setCurrentSequence(newSequence)
      setNextExpected(nextExpected + 1)
      
      // Check if puzzle is complete
      if (newSequence.length === 9) {
        setTimeout(() => {
          onComplete()
        }, 1000)
      }
    } else {
      // Wrong button pressed - restart sequence
      setCurrentSequence([])
      setNextExpected(1)
    }
  }

  // Initialize puzzle on mount
  useEffect(() => {
    initializePuzzle()
  }, [])

  return (
    <div className="puzzle-container">
      <div className="puzzle-info">
        <h2>Puzzle 1: Number Sequence</h2>
        <div className="game-stats">
          <p>Next number: <strong>{isCompleted ? 'Complete!' : nextExpected}</strong></p>
          <p>Progress: {currentSequence.length}/9</p>
          {isCompleted && <p className="win-message">🎉 Puzzle Complete!</p>}
        </div>
      </div>

      <div className="grid-container">
        {buttons.map((button) => (
          <Button
            key={button.id}
            className={`grid-button ${
              currentSequence.includes(button.number) ? 'pressed' : ''
            } ${button.number === nextExpected ? 'next' : ''}`}
            onClick={() => handleButtonClick(button)}
            disabled={isCompleted}
          >
            {button.number}
          </Button>
        ))}
      </div>

      <div className="game-controls">
        <Button
          className="reset-button"
          onClick={initializePuzzle}
          disabled={isCompleted}
        >
          Reset Puzzle
        </Button>
      </div>
    </div>
  )
}

export default NumberSequencePuzzle