import React, { useState } from 'react'
import type { PuzzleProps } from '../../types'

interface PuzzleItem {
  id: number
  title: string
  component: string
  description: string
  order: number
}

const PuzzleOrderChallenge: React.FC<PuzzleProps> = ({ onComplete, isCompleted }) => {
  // All puzzles in random order initially
  const [puzzleItems, setPuzzleItems] = useState<PuzzleItem[]>([
    { id: 8, title: "The Switch Network Challenge", component: "Switch", description: "Activate all switches simultaneously", order: 8 },
    { id: 2, title: "Technology Selection", component: "MultiSelect", description: "Select the right technologies", order: 2 },
    { id: 6, title: "Grid Memory", component: "Button Grid", description: "Memorize and recreate the pattern", order: 6 },
    { id: 0, title: "Number Sequence", component: "Button", description: "Press buttons 1-9 in order", order: 0 },
    { id: 4, title: "The Cipher of Three", component: "Slider", description: "Solve the riddles with precision", order: 4 },
    { id: 7, title: "The Treasure Mystery", component: "ContextMenu", description: "Right-click to interact with characters", order: 7 },
    { id: 3, title: "The Hidden Word", component: "TextBox", description: "Find the secret word in the story", order: 3 },
    { id: 1, title: "Date Mystery", component: "DatePicker", description: "Find the correct date", order: 1 },
    { id: 5, title: "Color Equation Solver", component: "ColorPicker", description: "Mix colors using color theory", order: 5 }
  ].sort(() => Math.random() - 0.5)) // Shuffle initially

  const [message, setMessage] = useState("Drag and drop the puzzles to arrange them in the order you encountered them (1st to 9th)!")
  const [attempts, setAttempts] = useState(0)

  // Correct order (0-8 representing puzzles 1-9)
  const correctOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  const [draggedItem, setDraggedItem] = useState<number | null>(null)

  const checkOrder = () => {
    const currentOrder = puzzleItems.map(item => item.order)
    const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(correctOrder)
    
    setAttempts(prev => prev + 1)
    
    if (isCorrect) {
      setMessage("🎉 Perfect! You've mastered the complete KendoReact puzzle journey! Congratulations!")
      setTimeout(() => onComplete(), 2000)
      return
    }
    
    // Give hints based on attempts
    if (attempts === 0) {
      setMessage("Not quite right. Think about which puzzle you solved first, second, third, etc...")
    } else if (attempts === 1) {
      setMessage("Remember: Number Sequence was #1, Date Mystery was #2, Technology Selection was #3...")
    } else if (attempts === 2) {
      setMessage("Hint: The order goes Button → DatePicker → MultiSelect → TextBox → Slider → ColorPicker → Grid → ContextMenu → Switch")
    } else {
      setMessage("Almost there! Think chronologically about your puzzle-solving journey through this app!")
    }
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItem(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedItem === null) return
    
    const newItems = [...puzzleItems]
    const draggedItemData = newItems[draggedItem]
    newItems.splice(draggedItem, 1)
    newItems.splice(dropIndex, 0, draggedItemData)
    
    setPuzzleItems(newItems)
    setDraggedItem(null)
  }

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...puzzleItems]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    if (targetIndex >= 0 && targetIndex < newItems.length) {
      [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]]
      setPuzzleItems(newItems)
    }
  }

  const getComponentColor = (component: string) => {
    const colors: { [key: string]: string } = {
      'Button': '#007bff',
      'DatePicker': '#28a745', 
      'MultiSelect': '#17a2b8',
      'TextBox': '#ffc107',
      'Slider': '#fd7e14',
      'ColorPicker': '#e83e8c',
      'Button Grid': '#6610f2',
      'ContextMenu': '#6f42c1',
      'Switch': '#20c997'
    }
    return colors[component] || '#6c757d'
  }

  return (
    <div className="puzzle-container">
      <div className="puzzle-info">
        <h2>The Grand Finale: Puzzle Journey</h2>
        <p>Arrange all the puzzles in the order you encountered them</p>
        {isCompleted && <p className="win-message">🎉 Journey Complete!</p>}
      </div>

      <div style={{ 
        padding: '20px', 
        minHeight: '500px', 
        border: '2px solid #ddd', 
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
      }}>
        {/* Instructions */}
        <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#fff', borderRadius: '4px' }}>
          <strong>Instructions:</strong> {message}
          <br />
          <small>Attempts: {attempts} | Progress: {puzzleItems.filter((item, index) => item.order === index).length}/9 correct positions</small>
        </div>

        {/* Drag and Drop List */}
        <div style={{ marginBottom: '20px' }}>
          {puzzleItems.map((item, index) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              style={{
                padding: '15px',
                margin: '8px 0',
                backgroundColor: draggedItem === index ? '#e6f3ff' : '#fff',
                border: `3px solid ${getComponentColor(item.component)}`,
                borderRadius: '8px',
                cursor: 'move',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Position Number */}
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: getComponentColor(item.component),
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '18px'
              }}>
                {index + 1}
              </div>

              {/* Component Badge */}
              <div style={{
                padding: '4px 12px',
                backgroundColor: getComponentColor(item.component),
                color: 'white',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold',
                minWidth: '100px',
                textAlign: 'center'
              }}>
                {item.component}
              </div>

              {/* Puzzle Info */}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>
                  {item.title}
                </div>
                <div style={{ color: '#666', fontSize: '14px' }}>
                  {item.description}
                </div>
              </div>

              {/* Move Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <button
                  onClick={() => moveItem(index, 'up')}
                  disabled={index === 0}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: index === 0 ? '#ccc' : '#007acc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: index === 0 ? 'not-allowed' : 'pointer',
                    fontSize: '12px'
                  }}
                >
                  ↑
                </button>
                <button
                  onClick={() => moveItem(index, 'down')}
                  disabled={index === puzzleItems.length - 1}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: index === puzzleItems.length - 1 ? '#ccc' : '#007acc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: index === puzzleItems.length - 1 ? 'not-allowed' : 'pointer',
                    fontSize: '12px'
                  }}
                >
                  ↓
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Check Button */}
        {!isCompleted && (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={checkOrder}
              style={{
                padding: '12px 30px',
                backgroundColor: '#007acc',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              Check Order
            </button>
          </div>
        )}

        {/* Legend */}
        <div style={{ 
          marginTop: '20px', 
          padding: '10px', 
          backgroundColor: '#e6f3ff', 
          borderRadius: '4px',
          fontSize: '12px',
          color: '#666'
        }}>
          💡 <strong>Tip:</strong> Drag the puzzle cards to reorder them. Each color represents a different KendoReact component type used in that puzzle!
        </div>
      </div>
    </div>
  )
}

export default PuzzleOrderChallenge