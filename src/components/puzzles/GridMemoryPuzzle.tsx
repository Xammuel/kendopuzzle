import { useState, useEffect } from 'react'
import { Button } from '@progress/kendo-react-buttons'
import type { PuzzleProps } from '../../types'

interface GridCell {
  id: number
  row: number
  col: number
  isActive: boolean
  isPlayerActive: boolean
}

type GamePhase = 'showing' | 'input' | 'success' | 'failed'

const GridMemoryPuzzle: React.FC<PuzzleProps> = ({ onComplete, isCompleted }) => {
  const [grid, setGrid] = useState<GridCell[]>([])
  const [gamePhase, setGamePhase] = useState<GamePhase>('showing')
  const [level, setLevel] = useState<number>(1)
  const [showTime, setShowTime] = useState<number>(3000) // Time to show pattern in ms
  const [targetPattern, setTargetPattern] = useState<number[]>([])
  const [playerPattern, setPlayerPattern] = useState<number[]>([])
  const [lives, setLives] = useState<number>(3)
  const [showLifeLost, setShowLifeLost] = useState<boolean>(false)

  // Initialize 6x6 grid
  const initializeGrid = (): GridCell[] => {
    const newGrid: GridCell[] = []
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 6; col++) {
        newGrid.push({
          id: row * 6 + col,
          row,
          col,
          isActive: false,
          isPlayerActive: false
        })
      }
    }
    return newGrid
  }

  // Generate random pattern based on level
  const generatePattern = (level: number): number[] => {
    const patternLength = 3 + level // Level 1 = 4 cells, Level 2 = 5 cells, etc.
    const pattern: number[] = []
    const usedCells = new Set<number>()

    while (pattern.length < patternLength) {
      const randomCell = Math.floor(Math.random() * 36) // 6x6 grid = 36 cells
      if (!usedCells.has(randomCell)) {
        pattern.push(randomCell)
        usedCells.add(randomCell)
      }
    }
    
    return pattern
  }

  // Start new level
  const startLevel = () => {
    const newGrid = initializeGrid()
    const pattern = generatePattern(level)
    
    // Show pattern
    const gridWithPattern = newGrid.map(cell => ({
      ...cell,
      isActive: pattern.includes(cell.id),
      isPlayerActive: false
    }))
    
    setGrid(gridWithPattern)
    setTargetPattern(pattern)
    setPlayerPattern([])
    setGamePhase('showing')
    
    // Hide pattern after show time
    setTimeout(() => {
      const gridWithoutPattern = newGrid.map(cell => ({
        ...cell,
        isActive: false,
        isPlayerActive: false
      }))
      setGrid(gridWithoutPattern)
      setGamePhase('input')
    }, showTime)
  }

  // Retry the same level with the same pattern
  const retryLevel = () => {
    const newGrid = initializeGrid()
    
    // Show the existing pattern again (don't generate new one)
    const gridWithPattern = newGrid.map(cell => ({
      ...cell,
      isActive: targetPattern.includes(cell.id),
      isPlayerActive: false
    }))
    
    setGrid(gridWithPattern)
    setPlayerPattern([])
    setGamePhase('showing')
    
    // Hide pattern after show time
    setTimeout(() => {
      const gridWithoutPattern = newGrid.map(cell => ({
        ...cell,
        isActive: false,
        isPlayerActive: false
      }))
      setGrid(gridWithoutPattern)
      setGamePhase('input')
    }, showTime)
  }

  // Restart game from level 1
  const restartGame = () => {
    setLevel(1)
    setShowTime(3000)
    setLives(3)
    
    const newGrid = initializeGrid()
    const pattern = generatePattern(1) // Force level 1 pattern (4 cells)
    
    // Show pattern
    const gridWithPattern = newGrid.map(cell => ({
      ...cell,
      isActive: pattern.includes(cell.id),
      isPlayerActive: false
    }))
    
    setGrid(gridWithPattern)
    setTargetPattern(pattern)
    setPlayerPattern([])
    setGamePhase('showing')
    
    // Hide pattern after show time
    setTimeout(() => {
      const gridWithoutPattern = newGrid.map(cell => ({
        ...cell,
        isActive: false,
        isPlayerActive: false
      }))
      setGrid(gridWithoutPattern)
      setGamePhase('input')
    }, 3000)
  }

  // Handle cell click during input phase
  const handleCellClick = (cellId: number) => {
    if (gamePhase !== 'input' || isCompleted) return

    const newPlayerPattern = [...playerPattern]
    const cellIndex = newPlayerPattern.indexOf(cellId)
    
    if (cellIndex >= 0) {
      // Cell already selected, remove it
      newPlayerPattern.splice(cellIndex, 1)
    } else {
      // Add cell to pattern
      newPlayerPattern.push(cellId)
    }
    
    setPlayerPattern(newPlayerPattern)
    
    // Update grid visualization
    setGrid(prevGrid => 
      prevGrid.map(cell => ({
        ...cell,
        isPlayerActive: newPlayerPattern.includes(cell.id)
      }))
    )
  }

  // Submit pattern
  const submitPattern = () => {
    if (gamePhase !== 'input') return

    // Check if patterns match (order doesn't matter)
    const isCorrect = targetPattern.length === playerPattern.length &&
                     targetPattern.every(cell => playerPattern.includes(cell))

    if (isCorrect) {
      setGamePhase('success')
      
      if (level >= 5) {
        // Puzzle completed after 5 levels
        setTimeout(() => {
          onComplete()
        }, 2000)
      } else {
        // Next level
        setTimeout(() => {
          setLevel(prev => prev + 1)
          setShowTime(prev => Math.max(1500, prev - 200)) // Decrease show time
          startLevel()
        }, 2000)
      }
    } else {
      setGamePhase('failed')
      const newLives = lives - 1
      setLives(newLives)
      
      // Show life lost animation
      setShowLifeLost(true)
      setTimeout(() => setShowLifeLost(false), 1000)
      
      if (newLives <= 0) {
        // Game over - restart from level 1
        setTimeout(() => {
          restartGame()
        }, 2000)
      } else {
        // Try again same level with same pattern
        setTimeout(() => {
          retryLevel()
        }, 2000)
      }
    }
  }

  // Clear pattern
  const clearPattern = () => {
    if (gamePhase !== 'input') return
    
    setPlayerPattern([])
    setGrid(prevGrid => 
      prevGrid.map(cell => ({
        ...cell,
        isPlayerActive: false
      }))
    )
  }

  // Initialize puzzle on mount
  useEffect(() => {
    startLevel()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const getPhaseMessage = () => {
    switch (gamePhase) {
      case 'showing':
        return 'Memorize the pattern...'
      case 'input':
        return 'Click the cells to recreate the pattern'
      case 'success':
        return level >= 5 ? '🎉 Puzzle Complete!' : `Level ${level} Complete! Next level...`
      case 'failed':
        return lives <= 0 ? 
               'Game Over! Restarting from Level 1...' : 
               'Wrong pattern! Try again...'
      default:
        return ''
    }
  }

  const getCellClassName = (cell: GridCell) => {
    let className = 'memory-grid-cell'
    
    if (gamePhase === 'showing' && cell.isActive) {
      className += ' active-pattern'
    }
    
    if (gamePhase === 'input' && cell.isPlayerActive) {
      className += ' player-active'
    }
    
    if (gamePhase === 'success') {
      if (targetPattern.includes(cell.id)) {
        className += ' correct-cell'
      }
    }
    
    if (gamePhase === 'failed') {
      if (targetPattern.includes(cell.id)) {
        className += ' should-be-active'
      }
      if (cell.isPlayerActive && !targetPattern.includes(cell.id)) {
        className += ' wrong-selection'
      }
    }
    
    return className
  }

  return (
    <div className="puzzle-container">
      <div className="puzzle-info">
        <h2>Puzzle 7: Grid Memory</h2>
        <div className="game-stats">
          <p>Level: <strong>{level}/5</strong></p>
          <p>Pattern Size: <strong>{targetPattern.length || (3 + level)} cells</strong></p>
          <p>Lives: <strong>{lives}</strong>
            {showLifeLost && <span className="life-lost-animation">-1</span>}
          </p>
          <p className={`phase-message ${gamePhase}`}>{getPhaseMessage()}</p>
        </div>
      </div>

      <div className="memory-grid-container">
        <div className="memory-grid">
          {grid.map((cell) => (
            <Button
              key={cell.id}
              className={getCellClassName(cell)}
              onClick={() => handleCellClick(cell.id)}
              disabled={gamePhase !== 'input' || isCompleted}
              fillMode="flat"
            >
              {/* Empty button for visual effect */}
            </Button>
          ))}
        </div>
      </div>

      <div className="game-controls">
        <div className="control-buttons">
          <Button
            className="submit-button"
            onClick={submitPattern}
            disabled={gamePhase !== 'input' || playerPattern.length === 0 || isCompleted}
            themeColor="primary"
          >
            Submit Pattern ({playerPattern.length} selected)
          </Button>
          
          <Button
            className="clear-button"
            onClick={clearPattern}
            disabled={gamePhase !== 'input' || playerPattern.length === 0 || isCompleted}
            fillMode="outline"
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GridMemoryPuzzle