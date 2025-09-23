// Common interfaces for the puzzle application

export interface PuzzleProps {
  onComplete: () => void
  isCompleted: boolean
}

export interface PuzzleConfig {
  id: number
  title: string
  description: string
  component: React.ComponentType<PuzzleProps>
}

export interface GridButton {
  id: number
  number: number
  position: number
}