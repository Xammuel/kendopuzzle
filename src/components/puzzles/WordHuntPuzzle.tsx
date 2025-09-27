import { useState } from 'react'
import { Input } from '@progress/kendo-react-inputs'
import type { PuzzleProps } from '../../types'

const WordHuntPuzzle: React.FC<PuzzleProps> = ({ onComplete, isCompleted }) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [hasFoundWord, setHasFoundWord] = useState<boolean>(false)
  const [showHint, setShowHint] = useState<boolean>(false)
  const [showTooltip, setShowTooltip] = useState<boolean>(false)
  const [failedAttempts, setFailedAttempts] = useState<number>(0)

  // The secret word hidden in the tooltip
  const secretWord = 'REVELATION'
  
  // Handle input change
  const handleInputChange = (event: { value: string }) => {
    const value = event.value.toUpperCase()
    setInputValue(value)
    
    // Check if the entered word matches the secret word
    if (value === secretWord) {
      setTimeout(() => {
        onComplete()
      }, 1000)
    }
  }

  // Handle key down to detect Enter key for failed attempts
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      const currentValue = inputValue.toUpperCase()
      if (currentValue.length > 0 && currentValue !== secretWord) {
        // Count as failed attempt when user presses Enter with wrong answer
        const newFailedAttempts = failedAttempts + 1
        setFailedAttempts(newFailedAttempts)
        
        // Show hint after 5 failed attempts
        if (newFailedAttempts >= 5 && !hasFoundWord) {
          setShowHint(true)
        }
      }
    }
  }

  // Handle tooltip show - this reveals the secret word
  const handleTooltipShow = () => {
    setHasFoundWord(true)
    setShowTooltip(true)
  }

  const handleTooltipHide = () => {
    setShowTooltip(false)
  }



  const isCorrectWord = inputValue.toUpperCase() === secretWord
  const hasIncorrectInput = inputValue.length > 0 && !isCorrectWord && !isCompleted

  return (
    <div className="puzzle-container">
      <div className="puzzle-info">
        <h2>Puzzle 4: The Hidden Word</h2>
        <p>Okay, well done so far! But now things are going to get more difficult from here...</p>
        {showHint && !hasFoundWord && (
          <p className="hint">💡 Hint: Try hovering over words that seem significant or emphasized...</p>
        )}
        {isCompleted && <p className="win-message">🎉 You found the revelation! Well done!</p>}
        {hasIncorrectInput && (
          <p className="wrong-message">❌ That's not quite right. Keep searching the story...</p>
        )}
      </div>
      
      <div className="story-container">
        <div className="story-content">
          <h3>The Hidden Message</h3>
          <p>
            Sarah found an old document about a powerful development framework. The text spoke 
            of components that could reveal hidden information when touched.
          </p>
          <div className="special-paragraph">
            The document explained: "Some secrets are hidden in plain sight, waiting for the{' '}
            <span className="tooltip-container">
              <button 
                type="button"
                className="tooltip-word"
                onMouseEnter={handleTooltipShow}
                onMouseLeave={handleTooltipHide}
                onClick={handleTooltipShow}
                title="Click or hover to reveal"
              >
                enlightenment
              </button>
              {showTooltip && (
                <div className="custom-tooltip">
                  {secretWord}
                </div>
              )}
            </span>{' '}of understanding to be discovered."
          </div>
          <p>
            The seeker who discovers the hidden word shall unlock the next puzzle.
          </p>
          
          <div className="input-section">
            <label htmlFor="secret-word" className="input-label">
              Enter the hidden word:
            </label>
            <Input
              id="secret-word"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type the secret word here..."
              className="secret-input"
              disabled={isCompleted}
            />
            
            <div className="input-info">
              {hasFoundWord && !isCompleted && (
                <p className="found-message">✨ You've found something! Now enter what you discovered...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WordHuntPuzzle