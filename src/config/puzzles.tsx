import type { PuzzleConfig } from '../types'
import NumberSequencePuzzle from '../components/puzzles/NumberSequencePuzzle'
import DatePickerPuzzle from '../components/puzzles/DatePickerPuzzle'
import BlankPuzzle from '../components/puzzles/BlankPuzzle'

// Create puzzle configurations
export const puzzleConfigs: PuzzleConfig[] = [
  {
    id: 0,
    title: "Number Sequence",
    description: "Press buttons 1-9 in order",
    component: NumberSequencePuzzle
  },
  {
    id: 1,
    title: "Date Mystery",
    description: "Find the correct date",
    component: DatePickerPuzzle
  },
  {
    id: 2,
    title: "Puzzle 3",
    description: "Coming soon!",
    component: (props) => <BlankPuzzle {...props} puzzleNumber={3} />
  },
  {
    id: 3,
    title: "Puzzle 4", 
    description: "Coming soon!",
    component: (props) => <BlankPuzzle {...props} puzzleNumber={4} />
  },
  {
    id: 4,
    title: "Puzzle 5",
    description: "Coming soon!",
    component: (props) => <BlankPuzzle {...props} puzzleNumber={5} />
  },
  {
    id: 5,
    title: "Puzzle 6",
    description: "Coming soon!", 
    component: (props) => <BlankPuzzle {...props} puzzleNumber={6} />
  },
  {
    id: 6,
    title: "Puzzle 7",
    description: "Coming soon!",
    component: (props) => <BlankPuzzle {...props} puzzleNumber={7} />
  },
  {
    id: 7,
    title: "Puzzle 8",
    description: "Coming soon!",
    component: (props) => <BlankPuzzle {...props} puzzleNumber={8} />
  },
  {
    id: 8,
    title: "Puzzle 9",
    description: "Coming soon!",
    component: (props) => <BlankPuzzle {...props} puzzleNumber={9} />
  },
  {
    id: 9,
    title: "Puzzle 10",
    description: "Coming soon!",
    component: (props) => <BlankPuzzle {...props} puzzleNumber={10} />
  }
]

export const getTotalPuzzles = () => puzzleConfigs.length

export const getPuzzleConfig = (index: number) => puzzleConfigs[index]

export const isValidPuzzleIndex = (index: number) => 
  index >= 0 && index < puzzleConfigs.length