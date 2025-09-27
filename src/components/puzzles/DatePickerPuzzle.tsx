import { useState } from 'react'
import { DatePicker } from '@progress/kendo-react-dateinputs'
import type { PuzzleProps } from '../../types'

const DatePickerPuzzle: React.FC<PuzzleProps> = ({ onComplete, isCompleted }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Handle date change
  const handleDateChange = (event: { value: Date | null }) => {
    const date = event.value
    setSelectedDate(date)
    
    if (date) {
      // Check if the selected date is July 20th, 1969
      const targetDate = new Date(1969, 6, 20) // Month is 0-indexed (6 = July)
      
      if (date.getFullYear() === targetDate.getFullYear() &&
          date.getMonth() === targetDate.getMonth() &&
          date.getDate() === targetDate.getDate()) {
        
        setTimeout(() => {
          onComplete()
        }, 1000)
      }
    }
  }

  const isCorrectDate = selectedDate && 
    selectedDate.getFullYear() === 1969 &&
    selectedDate.getMonth() === 6 &&
    selectedDate.getDate() === 20

  return (
    <div className="puzzle-container">
      <div className="puzzle-info">
        <h2>Puzzle 2: Date Mystery</h2>
        <p className="hint">"That's one small step for man, one giant leap for mankind."</p>
        {isCompleted && <p className="win-message">🎉 Correct date! Well done!</p>}
        {selectedDate && !isCorrectDate && !isCompleted && (
          <p className="wrong-message">❌ Not quite right. Try a different date!</p>
        )}
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
            disabled={isCompleted}
            format="dd/MM/yyyy"
          />
        </div>
      </div>
    </div>
  )
}

export default DatePickerPuzzle