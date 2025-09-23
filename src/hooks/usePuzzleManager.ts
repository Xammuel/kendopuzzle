import { useState, useCallback } from 'react'
import { getTotalPuzzles, isValidPuzzleIndex } from '../config/puzzles'

export const usePuzzleManager = () => {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState<number>(0)
  const [completedPuzzles, setCompletedPuzzles] = useState<Set<number>>(new Set())

  const totalPuzzles = getTotalPuzzles()

  const completePuzzle = useCallback((puzzleIndex: number) => {
    setCompletedPuzzles(prev => new Set([...prev, puzzleIndex]))
    
    // Auto-advance to next puzzle if not the last one
    if (puzzleIndex === currentPuzzleIndex && puzzleIndex < totalPuzzles - 1) {
      setTimeout(() => {
        setCurrentPuzzleIndex(puzzleIndex + 1)
      }, 2000)
    }
  }, [currentPuzzleIndex, totalPuzzles])

  const navigateToPuzzle = useCallback((index: number) => {
    if (isValidPuzzleIndex(index)) {
      setCurrentPuzzleIndex(index)
    }
  }, [])

  const isPuzzleCompleted = useCallback((index: number) => {
    return completedPuzzles.has(index)
  }, [completedPuzzles])

  const resetProgress = useCallback(() => {
    setCurrentPuzzleIndex(0)
    setCompletedPuzzles(new Set())
  }, [])

  const getProgress = useCallback(() => {
    return {
      current: currentPuzzleIndex + 1,
      total: totalPuzzles,
      completed: completedPuzzles.size,
      completionPercentage: Math.round((completedPuzzles.size / totalPuzzles) * 100)
    }
  }, [currentPuzzleIndex, totalPuzzles, completedPuzzles.size])

  return {
    currentPuzzleIndex,
    completedPuzzles,
    totalPuzzles,
    completePuzzle,
    navigateToPuzzle,
    isPuzzleCompleted,
    resetProgress,
    getProgress
  }
}