import { Button } from '@progress/kendo-react-buttons'
import { usePuzzleManager } from './hooks/usePuzzleManager'
import { getPuzzleConfig } from './config/puzzles'
import ProgressIndicator from './components/ProgressIndicator'
import './App.css'

function App() {
  const {
    currentPuzzleIndex,
    completedPuzzles,
    totalPuzzles,
    completePuzzle,
    navigateToPuzzle,
    isPuzzleCompleted,
    resetProgress,
    getProgress
  } = usePuzzleManager()

  const currentPuzzle = getPuzzleConfig(currentPuzzleIndex)
  const progress = getProgress()

  const handlePuzzleComplete = () => {
    completePuzzle(currentPuzzleIndex)
  }

  const handleNavigateBack = () => {
    if (currentPuzzleIndex > 0) {
      navigateToPuzzle(currentPuzzleIndex - 1)
    }
  }

  const handleNavigateForward = () => {
    if (currentPuzzleIndex < totalPuzzles - 1) {
      navigateToPuzzle(currentPuzzleIndex + 1)
    }
  }

  const PuzzleComponent = currentPuzzle.component

  return (
    <div className="app">
      <header className="header">
        <h1>KendoPuzzle</h1>
        <p>Can you solve all {totalPuzzles} puzzles hidden in each KendoReact component?</p>
        
        <ProgressIndicator
          current={progress.current}
          total={progress.total}
          completedPuzzles={completedPuzzles}
          currentPuzzleIndex={currentPuzzleIndex}
        />
      </header>

      <main className="main">
        <PuzzleComponent
          onComplete={handlePuzzleComplete}
          isCompleted={isPuzzleCompleted(currentPuzzleIndex)}
        />

        <div className="navigation-controls">
          <Button
            className="nav-button"
            onClick={handleNavigateBack}
            disabled={currentPuzzleIndex === 0}
          >
            ← Previous
          </Button>
          
          <Button
            className="nav-button"
            onClick={handleNavigateForward}
            disabled={currentPuzzleIndex === totalPuzzles - 1}
          >
            Next →
          </Button>
          
          <Button
            className="reset-button"
            onClick={resetProgress}
          >
            Reset All
          </Button>
        </div>
      </main>

      <footer className="footer">
        <p>Built with KendoReact Component library</p>
        <p>Progress: {progress.completed}/{progress.total} puzzles completed ({progress.completionPercentage}%)</p>
      </footer>
    </div>
  )
}

export default App