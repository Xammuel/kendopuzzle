import { useState } from 'react'
import { Input } from '@progress/kendo-react-inputs'
import type { PuzzleProps } from '../../types'

const WordHuntPuzzle: React.FC<PuzzleProps> = ({ onComplete, isCompleted }) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [hasFoundWord, setHasFoundWord] = useState<boolean>(false)
  const [showHint, setShowHint] = useState<boolean>(false)
  const [showTooltip, setShowTooltip] = useState<boolean>(false)

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

  // Handle tooltip show - this reveals the secret word
  const handleTooltipShow = () => {
    setHasFoundWord(true)
    setShowTooltip(true)
  }

  const handleTooltipHide = () => {
    setShowTooltip(false)
  }

  // Show hint after 30 seconds or if user seems stuck
  setTimeout(() => {
    if (!hasFoundWord && !isCompleted) {
      setShowHint(true)
    }
  }, 30000)

  const isCorrectWord = inputValue.toUpperCase() === secretWord
  const hasIncorrectInput = inputValue.length > 0 && !isCorrectWord && !isCompleted

  return (
    <div className="puzzle-container">
      <div className="puzzle-info">
        <h2>Puzzle 4: The Hidden Word</h2>
        <p>Read the story carefully and find the hidden word. Enter it below to unlock the next puzzle!</p>
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
          <h3>The Digital Quest</h3>
          <p>
            In the depths of the ancient library, Sarah discovered a mysterious manuscript. 
            The parchment spoke of a legendary framework, known to bring <strong>harmony</strong> between 
            design and functionality. Many developers had sought this <em>treasure</em>, but few 
            understood its true power.
          </p>
          <p>
            The manuscript contained cryptic instructions: "Seek the component that reveals{' '}
            <span className="important-word">truth</span>{' '}when darkness falls upon it. In the 
            realm of user interfaces, where interactions dance like shadows, one must find 
            the element that shows knowledge upon a gentle touch."
          </p>
          <div className="special-paragraph">
            As Sarah pondered these words, she realized the <strong>solution</strong> lay not 
            in complex algorithms, but in simple gestures. The ancient text continued: "The 
            wise developer knows that some secrets are hidden in plain sight, waiting for the{' '}
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
            </span>{' '}of understanding."
          </div>
          <p>
            With this <em>knowledge</em>, she understood that the path forward required both 
            patience and curiosity. The manuscript's final words echoed in her mind: "The 
            seeker who discovers the hidden word shall unlock the next chapter of their journey."
          </p>
        </div>
      </div>

      <div className="input-container">
        <div className="input-wrapper">
          <label htmlFor="secret-word" className="input-label">
            Enter the hidden word:
          </label>
          <Input
            id="secret-word"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type the secret word here..."
            className="secret-input"
            disabled={isCompleted}
          />
          
          <div className="input-info">
            {hasFoundWord && !isCompleted && (
              <p className="found-message">✨ You've found something! Now enter what you discovered...</p>
            )}
            {inputValue.length > 0 && (
              <p className="char-count">Characters: {inputValue.length}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WordHuntPuzzle