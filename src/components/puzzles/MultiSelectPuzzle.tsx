import { useState } from 'react'
import { MultiSelect } from '@progress/kendo-react-dropdowns'
import type { PuzzleProps } from '../../types'

interface SelectOption {
  text: string
  value: string
}

const MultiSelectPuzzle: React.FC<PuzzleProps> = ({ onComplete, isCompleted }) => {
  const [selectedValues, setSelectedValues] = useState<SelectOption[]>([])

  // Options with correct answers and distractors
  const options: SelectOption[] = [
    { text: 'angular', value: 'angular' },
    { text: 'vue', value: 'vue' },
    { text: 'svelte', value: 'svelte' },
    { text: 'react', value: 'react' },
    { text: 'ember', value: 'ember' },
    { text: 'backbone', value: 'backbone' },
    { text: 'jquery', value: 'jquery' },
    { text: 'polymer', value: 'polymer' },
    { text: 'kendo', value: 'kendo' },
    { text: 'lit', value: 'lit' },
    { text: 'alpine', value: 'alpine' },
    { text: 'stimulus', value: 'stimulus' }
  ]

  // Handle selection change
  const handleSelectionChange = (event: { value: SelectOption[] }) => {
    const newValues = event.value
    setSelectedValues(newValues)

    // Check if both 'kendo' and 'react' are selected (and only those two)
    const selectedTexts = newValues.map(item => item.value).sort((a, b) => a.localeCompare(b))
    const correctAnswers = ['kendo', 'react'].sort((a, b) => a.localeCompare(b))
    
    const isCorrect = selectedTexts.length === 2 && 
                     selectedTexts.every((val, index) => val === correctAnswers[index])

    if (isCorrect) {
      setTimeout(() => {
        onComplete()
      }, 1000)
    }
  }

  // Check if current selection is correct
  const selectedTexts = selectedValues.map(item => item.value).sort((a, b) => a.localeCompare(b))
  const correctAnswers = ['kendo', 'react'].sort((a, b) => a.localeCompare(b))
  const isCorrectSelection = selectedTexts.length === 2 && 
                            selectedTexts.every((val, index) => val === correctAnswers[index])

  // Check if user has made a selection but it's wrong
  const hasWrongSelection = selectedValues.length > 0 && !isCorrectSelection && !isCompleted

  return (
    <div className="puzzle-container">
      <div className="puzzle-info">
        <h2>Puzzle 3: Technology Selection</h2>
        <p>Select words to create the technology that powers this application!</p>
        {isCompleted && <p className="win-message">🎉 Perfect! KendoReact it is!</p>}
        {hasWrongSelection && (
          <p className="wrong-message">❌ Not quite right. Maybe there's a hint somewhere on this page..</p>
        )}
      </div>
      
      <div className="multiselect-container">
        <div className="multiselect-wrapper">
          <label htmlFor="tech-selector" className="multiselect-label">
            Choose the technologies (select exactly 2):
          </label>
          <MultiSelect
            id="tech-selector"
            data={options}
            value={selectedValues}
            onChange={handleSelectionChange}
            textField="text"
            dataItemKey="value"
            placeholder="Select technologies..."
            className="tech-multiselect"
            disabled={isCompleted}
          />
          
          <div className="selection-info">
            <p>Selected: {selectedValues.length}/2</p>
            {selectedValues.length > 0 && (
              <div className="selected-items">
                Current selection: {selectedValues.map(item => item.text).join(', ')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MultiSelectPuzzle