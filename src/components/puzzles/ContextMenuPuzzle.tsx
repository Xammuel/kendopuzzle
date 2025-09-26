import React, { useState } from 'react'
import { ContextMenu } from '@progress/kendo-react-layout'
import type { PuzzleProps } from '../../types'

interface GameState {
  talkedToGuard: boolean
  gotKey: boolean
  openedChest: boolean
  foundClue: boolean
  petCat: boolean
  consultedLibrarian: boolean
}

interface MenuSelectEvent {
  item: {
    data?: {
      action: string
    }
  }
}

const ContextMenuPuzzle: React.FC<PuzzleProps> = ({ onComplete, isCompleted }) => {
  const [gameState, setGameState] = useState<GameState>({
    talkedToGuard: false,
    gotKey: false,
    openedChest: false,
    foundClue: false,
    petCat: false,
    consultedLibrarian: false
  })
  
  const [message, setMessage] = useState("A mysterious treasure awaits... Right-click on characters and objects to uncover their secrets.")
  const [showContextMenu, setShowContextMenu] = useState(false)
  const [contextMenuTarget, setContextMenuTarget] = useState<string>('')
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
  
  // Create randomized order of characters/objects using Fisher-Yates shuffle
  const [characterOrder] = useState(() => {
    const characters = ['guard', 'wizard', 'chest', 'cat', 'librarian', 'scroll']
    // Fisher-Yates shuffle algorithm
    for (let i = characters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [characters[i], characters[j]] = [characters[j], characters[i]]
    }
    return characters
  })

  const handleContextMenu = (e: React.MouseEvent, target: string) => {
    e.preventDefault()
    const rect = e.currentTarget.getBoundingClientRect()
    setContextMenuTarget(target)
    setMenuPosition({ 
      x: rect.left + rect.width / 2 + window.scrollX, 
      y: rect.bottom + 5 + window.scrollY 
    })
    setShowContextMenu(true)
  }

  const handleGuardAction = (action: string) => {
    if (action === 'talk') {
      if (!gameState.talkedToGuard) {
        setGameState(prev => ({ ...prev, talkedToGuard: true }))
        setMessage("Guard: 'The treasure chest is locked. The wizard might have the key...'")
      } else {
        setMessage("Guard: 'I already told you about the wizard!'")
      }
    }
  }

  const handleWizardAction = (action: string) => {
    if (action === 'ask-key') {
      if (!gameState.gotKey) {
        setGameState(prev => ({ ...prev, gotKey: true }))
        setMessage("Wizard: 'Here's the key! But beware, the chest holds more than treasure...'")
      } else {
        setMessage("Wizard: 'I already gave you the key!'")
      }
    } else if (action === 'talk') {
      setMessage("Wizard: 'I have magical items that might help...'")
    }
  }

  const handleChestAction = (action: string) => {
    if (action === 'open') {
      if (gameState.gotKey && !gameState.openedChest) {
        setGameState(prev => ({ ...prev, openedChest: true }))
        setMessage("You opened the chest! Inside you find a mysterious scroll...")
      } else if (!gameState.gotKey) {
        setMessage("The chest is locked! You need a key.")
      } else {
        setMessage("The chest is already open.")
      }
    } else if (action === 'examine') {
      setMessage("A sturdy wooden chest with an intricate lock.")
    }
  }

  const handleScrollAction = (action: string) => {
    if (action === 'read') {
      if (!gameState.openedChest) {
        setMessage("The scroll is sealed inside the chest. You need to open it first!")
      } else if (!gameState.foundClue) {
        setGameState(prev => ({ ...prev, foundClue: true }))
        setMessage("The scroll reads: 'Congratulations! You've solved the mystery!' 🎉")
        setTimeout(() => onComplete(), 1500)
      } else {
        setMessage("You've already read the scroll!")
      }
    }
  }

  const handleCatAction = (action: string) => {
    if (action === 'pet') {
      if (!gameState.petCat) {
        setGameState(prev => ({ ...prev, petCat: true }))
        setMessage("Cat: 'Purr... The librarian knows ancient secrets about treasure chests...'")
      } else {
        setMessage("Cat: 'Meow... I already told you about the librarian!'")
      }
    } else if (action === 'talk') {
      setMessage("Cat: 'Meow meow... Pet me for a hint!'")
    }
  }

  const handleLibrarianAction = (action: string) => {
    if (action === 'consult') {
      if (!gameState.consultedLibrarian) {
        setGameState(prev => ({ ...prev, consultedLibrarian: true }))
        setMessage("Librarian: 'Ancient chests often contain more than gold... look for scrolls!'")
      } else {
        setMessage("Librarian: 'I already shared the ancient wisdom with you!'")
      }
    } else if (action === 'talk') {
      setMessage("Librarian: 'These old books hold many secrets...'")
    }
  }

  const handleMenuSelect = (event: MenuSelectEvent) => {
    const action = event.item.data?.action
    setShowContextMenu(false)
    
    if (!action) return

    switch (contextMenuTarget) {
      case 'guard':
        handleGuardAction(action)
        break
      case 'wizard':
        handleWizardAction(action)
        break
      case 'chest':
        handleChestAction(action)
        break
      case 'scroll':
        handleScrollAction(action)
        break
      case 'cat':
        handleCatAction(action)
        break
      case 'librarian':
        handleLibrarianAction(action)
        break
    }
  }



  const getMenuItems = (target: string) => {
    switch (target) {
      case 'guard':
        return [{ text: 'Talk to Guard', data: { action: 'talk' } }]
      case 'wizard':
        return [
          { text: 'Talk to Wizard', data: { action: 'talk' } },
          { text: 'Ask for Key', data: { action: 'ask-key' } }
        ]
      case 'chest':
        return [
          { text: 'Examine Chest', data: { action: 'examine' } },
          { text: 'Open Chest', data: { action: 'open' } }
        ]
      case 'scroll':
        return [{ text: 'Read Scroll', data: { action: 'read' } }]
      case 'cat':
        return [
          { text: 'Talk to Cat', data: { action: 'talk' } },
          { text: 'Pet Cat', data: { action: 'pet' } }
        ]
      case 'librarian':
        return [
          { text: 'Talk to Librarian', data: { action: 'talk' } },
          { text: 'Consult about Treasures', data: { action: 'consult' } }
        ]
      default:
        return []
    }
  }

  const renderCharacter = (characterType: string) => {
    const characterData = {
      guard: { emoji: '🛡️', name: 'Guard' },
      wizard: { emoji: '🧙‍♂️', name: 'Wizard' },
      chest: { emoji: gameState.openedChest ? '📖' : '📦', name: 'Chest' },
      cat: { emoji: '🐱', name: 'Cat' },
      librarian: { emoji: '👩‍🏫', name: 'Librarian' },
      scroll: { emoji: '📜', name: 'Scroll' }
    }

    const data = characterData[characterType as keyof typeof characterData]
    if (!data) return null

    return (
      <button
        key={characterType}
        onContextMenu={(e) => handleContextMenu(e, characterType)}
        style={{
          padding: '20px',
          border: 'none',
          borderRadius: '8px',
          backgroundColor: 'transparent',
          cursor: 'context-menu',
          textAlign: 'center',
          minWidth: '120px'
        }}
      >
        <div style={{ fontSize: '50px' }}>{data.emoji}</div>
        <div><strong>{data.name}</strong></div>
      </button>
    )
  }

  return (
    <div className="puzzle-container">
      <div className="puzzle-info">
        <h2>The Treasure Mystery</h2>
        <p>Help solve the mystery by talking to characters and examining objects!</p>
        {isCompleted && <p className="win-message">🎉 Mystery Solved!</p>}
      </div>

      <div style={{ 
        padding: '20px', 
        minHeight: '300px', 
        border: '2px solid #ddd', 
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        position: 'relative'
      }}>
        <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#fff', borderRadius: '4px' }}>
          <strong>Message:</strong> {message}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-around' }}>
          {characterOrder.map(characterType => renderCharacter(characterType))}
        </div>

        {showContextMenu && (
          <ContextMenu
            show={showContextMenu}
            offset={{ left: menuPosition.x, top: menuPosition.y }}
            onSelect={handleMenuSelect}
            onClose={() => setShowContextMenu(false)}
            items={getMenuItems(contextMenuTarget)}
          />
        )}
      </div>
    </div>
  )
}

export default ContextMenuPuzzle