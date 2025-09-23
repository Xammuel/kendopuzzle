import React from 'react'

interface ProgressIndicatorProps {
  current: number
  total: number
  completedPuzzles: Set<number>
  currentPuzzleIndex: number
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  current, 
  total, 
  completedPuzzles, 
  currentPuzzleIndex 
}) => {
  return (
    <div className="puzzle-progress">
      <p>Puzzle {current} of {total}</p>
      <div className="progress-stats">
        <span>Completed: {completedPuzzles.size}/{total}</span>
        <span>Progress: {Math.round((completedPuzzles.size / total) * 100)}%</span>
      </div>
      <div className="progress-dots">
        {Array.from({ length: total }, (_, index) => (
          <span 
            key={`puzzle-${index}`}
            className={`dot ${
              index === currentPuzzleIndex ? 'active' : ''
            } ${
              completedPuzzles.has(index) ? 'completed' : ''
            }`}
            title={`Puzzle ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ProgressIndicator