import { useState } from 'react'
import { ColorPalette } from '@progress/kendo-react-inputs'
import type { PuzzleProps } from '../../types'

interface ColorEquation {
  id: string
  color1: string
  color1Name: string
  color2: string
  color2Name: string
  correctAnswer: string
  answerName: string
}

const ColorEquationPuzzle: React.FC<PuzzleProps> = ({ onComplete, isCompleted }) => {
  // Define 4 color mixing equations
  const equations: ColorEquation[] = [
    {
      id: 'eq1',
      color1: '#FF0000',
      color1Name: 'Red',
      color2: '#0000FF',
      color2Name: 'Blue',
      correctAnswer: '#800080',
      answerName: 'Purple'
    },
    {
      id: 'eq2',
      color1: '#FFFF00',
      color1Name: 'Yellow',
      color2: '#FF0000',
      color2Name: 'Red',
      correctAnswer: '#FFA500',
      answerName: 'Orange'
    },
    {
      id: 'eq3',
      color1: '#0000FF',
      color1Name: 'Blue',
      color2: '#FFFF00',
      color2Name: 'Yellow',
      correctAnswer: '#008000',
      answerName: 'Green'
    },
    {
      id: 'eq4',
      color1: '#FF0000',
      color1Name: 'Red',
      color2: '#FFFFFF',
      color2Name: 'White',
      correctAnswer: '#FFB6C1',
      answerName: 'Pink'
    }
  ]

  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({
    eq1: '#ffffff',
    eq2: '#ffffff',
    eq3: '#ffffff',
    eq4: '#ffffff'
  })

  const handleColorChange = (equationId: string, color: string) => {
    if (isCompleted) return

    const newColors = { ...selectedColors, [equationId]: color }
    setSelectedColors(newColors)

    // Check if all equations are solved correctly
    const allCorrect = equations.every(eq => {
      const selected = newColors[eq.id].toLowerCase()
      const correct = eq.correctAnswer.toLowerCase()
      return selected === correct
    })

    if (allCorrect) {
      setTimeout(() => {
        onComplete()
      }, 1000)
    }
  }




  // Simple primary color palette - one of each essential color only
  const colorPalette = [
    '#FF0000', // Red
    '#0000FF', // Blue  
    '#FFFF00', // Yellow
    '#008000', // Green
    '#800080', // Purple
    '#FFA500', // Orange
    '#FFB6C1', // Pink
    '#FFFFFF', // White
    '#000000'  // Black
  ]

  return (
    <div className="puzzle-container">
      <div className="puzzle-info">
        <h2>Puzzle 6: Color Equation Solver</h2>
        <p>Solve each color mixing equation by selecting the correct result color.</p>
        <p>Use your knowledge of color theory to mix the colors correctly!</p>
        
        {isCompleted && (
          <p className="win-message">🎨 Excellent! You've mastered color mixing theory!</p>
        )}
      </div>

      <div className="color-equations-container">
        {equations.map((equation) => {
          return (
            <div key={equation.id} className="color-equation">
              <div className="equation-display">
                <div className="color-box-container">
                  <div 
                    className="color-box"
                    style={{ backgroundColor: equation.color1 }}
                  />
                  <span className="color-label">{equation.color1Name}</span>
                </div>
                
                <span className="equation-operator">+</span>
                
                <div className="color-box-container">
                  <div 
                    className="color-box"
                    style={{ backgroundColor: equation.color2 }}
                  />
                  <span className="color-label">{equation.color2Name}</span>
                </div>
                
                <span className="equation-operator">=</span>
                
                <div className="answer-section">
                  <div className="color-palette-wrapper">
                    <ColorPalette
                      value={selectedColors[equation.id]}
                      onChange={(e) => handleColorChange(equation.id, e.value)}
                      palette={colorPalette}
                      tileSize={25}
                      columns={6}
                      disabled={isCompleted}
                      className="color-equation-palette"
                    />
                  </div>
                  
                  <div className="selected-result">
                    <div 
                      className="result-color-box"
                      style={{ backgroundColor: selectedColors[equation.id] }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}

      </div>
    </div>
  )
}

export default ColorEquationPuzzle