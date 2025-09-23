import { useState, useEffect } from 'react'
import { Button } from '@progress/kendo-react-buttons';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import './App.css'

interface GridButton {
  id: number
  number: number
  position: number
}

interface Puzzle {
  id: number
  title: string
  description: string
  component: React.ReactNode
}

function App() {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState<number>(0)
  const [completedPuzzles, setCompletedPuzzles] = useState<number[]>([])
  
  // Puzzle 1 states
  const [buttons, setButtons] = useState<GridButton[]>([])
  const [currentSequence, setCurrentSequence] = useState<number[]>([])
  const [nextExpected, setNextExpected] = useState<number>(1)
  const [gameWon, setGameWon] = useState<boolean>(false)

  // Puzzle 2 states
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [puzzle2Won, setPuzzle2Won] = useState<boolean>(false)

  // Shuffle function to randomize button positions
  const shuffleArray = (array: number[]): number[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Initialize or reset puzzle 1
  const initializePuzzle1 = () => {
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
    setGameWon(false)
  }

  const skipPuzzle = () => {
    setGameWon(true)
    setCompletedPuzzles(prev => [...prev, 0])
    setTimeout(() => {
      setCurrentPuzzleIndex(1)
    }, 500)
  }

  // Handle date change for puzzle 2
  const handleDateChange = (event: { value: Date | null }) => {
    const date = event.value
    setSelectedDate(date)
    
    if (date) {
      // Check if the selected date is January 1st, 1990
      const targetDate = new Date(1990, 0, 1) // Month is 0-indexed (0 = January)
      
      if (date.getFullYear() === targetDate.getFullYear() &&
          date.getMonth() === targetDate.getMonth() &&
          date.getDate() === targetDate.getDate()) {
        setPuzzle2Won(true)
        setCompletedPuzzles(prev => [...prev, 1])
        
        // Auto-advance to next puzzle after 2 seconds (or show completion)
        setTimeout(() => {
          // For now, just show completion. Later you can add more puzzles
          console.log('All puzzles completed!')
        }, 2000)
      } else {
        setPuzzle2Won(false)
      }
    } else {
      setPuzzle2Won(false)
    }
  }

  // Handle button click for puzzle 1
  const handleButtonClick = (button: GridButton) => {
    if (gameWon) return

    if (button.number === nextExpected) {
      // Correct button pressed
      const newSequence = [...currentSequence, button.number]
      setCurrentSequence(newSequence)
      setNextExpected(nextExpected + 1)
      
      // Check if game is won
      if (newSequence.length === 9) {
        setGameWon(true)
        setCompletedPuzzles(prev => [...prev, 0])
        
        // Auto-advance to next puzzle after 2 seconds
        setTimeout(() => {
          setCurrentPuzzleIndex(1)
        }, 2000)
      }
    } else {
      // Wrong button pressed - restart sequence
      setCurrentSequence([])
      setNextExpected(1)
    }
  }

  // Puzzle 1 Component
  const Puzzle1 = () => (
    <div className="puzzle-container">
      <div className="puzzle-info">
        <p>Let's keep this simple to start..</p>
      </div>

      <div className="grid-container">
        {buttons.map((button) => (
          <Button
            key={button.id}
            className={`grid-button ${
              currentSequence.includes(button.number) ? 'pressed' : ''
            }`}
            onClick={() => handleButtonClick(button)}
            disabled={gameWon}
          >
            {button.number}
          </Button>
        ))}
      </div>

      <div className="game-controls">
        <Button
          className="reset-button"
          onClick={initializePuzzle1}
        >
          Reset Puzzle
        </Button>
        <Button onClick={skipPuzzle}>Skip Puzzle</Button>
      </div>
    </div>
  )

  // Puzzle 2 Component (DatePicker puzzle)
  const Puzzle2 = () => (
    <div className="puzzle-container">
      <div className="puzzle-info">
        <h2>Puzzle 2: Date Mystery</h2>
        <p>Select the correct date to unlock the next puzzle!</p>
      </div>
      
      <div className="datepicker-container">
        <div className="datepicker-wrapper">
          <label htmlFor="date-picker" className="datepicker-label">
            Select the mystery date:
          </label>
          <DatePicker
            id="date-picker"
            value={selectedDate}
            onChange={handleDateChange}
            className="mystery-datepicker"
            disabled={puzzle2Won}
            format="dd/MM/yyyy"
          />
        </div>
      </div>

      <div className="game-controls">
        <Button
          className="nav-button"
          onClick={() => setCurrentPuzzleIndex(0)}
        >
          Back to Puzzle 1
        </Button>
      </div>
    </div>
  )

  // Define all puzzles
  const puzzles: Puzzle[] = [
    {
      id: 0,
      title: "Number Sequence",
      description: "Press buttons 1-9 in order",
      component: <Puzzle1 />
    },
    {
      id: 1,
      title: "Mystery Puzzle",
      description: "Coming soon!",
      component: <Puzzle2 />
    }
  ]

  // Initialize puzzle 1 on component mount
  useEffect(() => {
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
    setGameWon(false)
  }, [])

  return (
    <div className="app">
      <header className="header">
        <h1>KendoPuzzle</h1>
        <p>Can you solve all the puzzles hidden in each KendoReact component?</p>
        
        <div className="puzzle-progress">
          <p>Puzzle {currentPuzzleIndex + 1} of {puzzles.length}</p>
          <div className="progress-dots">
            {puzzles.map((_, index) => (
              <span 
                key={index}
                className={`dot ${index === currentPuzzleIndex ? 'active' : ''} ${completedPuzzles.includes(index) ? 'completed' : ''}`}
              />
            ))}
          </div>
        </div>
      </header>

      <main className="main">
        {puzzles[currentPuzzleIndex].component}
      </main>

      <footer className="footer">
        <p>Built with KendoReact Component library</p>
      </footer>
    </div>
  )
}

export default App
