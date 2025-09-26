import type { PuzzleConfig } from '../types'
import NumberSequencePuzzle from '../components/puzzles/NumberSequencePuzzle'
import DatePickerPuzzle from '../components/puzzles/DatePickerPuzzle'
import MultiSelectPuzzle from '../components/puzzles/MultiSelectPuzzle'
import WordHuntPuzzle from '../components/puzzles/WordHuntPuzzle'
import RiddleSlidersPuzzle from '../components/puzzles/RiddleSlidersPuzzle'
import ColorEquationPuzzle from '../components/puzzles/ColorEquationPuzzle'
import GridMemoryPuzzle from '../components/puzzles/GridMemoryPuzzle'
import ContextMenuPuzzle from '../components/puzzles/ContextMenuPuzzle'
import SwitchNetworkPuzzle from '../components/puzzles/SwitchNetworkPuzzle'
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
    title: "Technology Selection",
    description: "Select the right technologies",
    component: MultiSelectPuzzle
  },
  {
    id: 3,
    title: "The Hidden Word",
    description: "Find the secret word in the story",
    component: WordHuntPuzzle
  },
  {
    id: 4,
    title: "The Cipher of Three",
    description: "Solve the riddles with precision",
    component: RiddleSlidersPuzzle
  },
  {
    id: 5,
    title: "Color Equation Solver",
    description: "Mix colors using color theory",
    component: ColorEquationPuzzle
  },
  {
    id: 6,
    title: "Grid Memory",
    description: "Memorize and recreate the pattern",
    component: GridMemoryPuzzle
  },
  {
    id: 7,
    title: "The Treasure Mystery",
    description: "Right-click to interact with characters and solve the mystery",
    component: ContextMenuPuzzle
  },
  {
    id: 8,
    title: "The Switch Network Challenge",
    description: "Activate all switches simultaneously to power up the system",
    component: SwitchNetworkPuzzle
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