import type { PuzzleProps } from '../../types'

interface BlankPuzzleProps extends PuzzleProps {
  puzzleNumber: number
}

const BlankPuzzle: React.FC<BlankPuzzleProps> = ({ puzzleNumber, onComplete, isCompleted }) => {
  const handleComplete = () => {
    // Simulate puzzle completion for now
    setTimeout(() => {
      onComplete()
    }, 1000)
  }

  return (
    <div className="puzzle-container">
      <div className="puzzle-info">
        <h2>Puzzle {puzzleNumber}: Coming Soon</h2>
        <p>This puzzle is under construction. More challenges await!</p>
        {isCompleted && <p className="win-message">🎉 Puzzle Complete!</p>}
      </div>
      
      <div className="placeholder-puzzle">
        <div className="placeholder-content">
          <h3>🚧 Puzzle {puzzleNumber} Placeholder 🚧</h3>
          <p>This will be your next challenge!</p>
          <p>Stay tuned for more exciting puzzles.</p>
          
          {!isCompleted && (
            <button 
              className="complete-button"
              onClick={handleComplete}
            >
              Complete Puzzle (Demo)
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlankPuzzle