import React, { useState, useEffect } from 'react'
import type { PuzzleProps } from '../../types'

interface SwitchState {
  id: number
  name: string
  isOn: boolean
  turnsOff: number[]
}

const SwitchNetworkPuzzle: React.FC<PuzzleProps> = ({ onComplete, isCompleted }) => {
  const [switches, setSwitches] = useState<SwitchState[]>([
    { id: 1, name: "Main Power", isOn: false, turnsOff: [2, 4] },
    { id: 2, name: "Auxiliary", isOn: false, turnsOff: [3, 5] },
    { id: 3, name: "Security", isOn: false, turnsOff: [1, 6] },
    { id: 4, name: "Backup", isOn: false, turnsOff: [5] },
    { id: 5, name: "Emergency", isOn: false, turnsOff: [1, 3] },
    { id: 6, name: "Override", isOn: false, turnsOff: [2, 4] }
  ])
  
  const [message, setMessage] = useState("Turn all switches ON simultaneously! But be careful - some switches control others...")
  const [attempts, setAttempts] = useState(0)

  const toggleSwitch = (switchId: number, switches: SwitchState[]): SwitchState[] => {
    return switches.map(switchState => {
      if (switchState.id === switchId) {
        // Toggle the target switch
        const newIsOn = !switchState.isOn
        return { ...switchState, isOn: newIsOn }
      } else {
        // Check if this switch should be turned off by the toggled switch
        const toggledSwitch = switches.find(s => s.id === switchId)
        if (toggledSwitch && !toggledSwitch.isOn && toggledSwitch.turnsOff.includes(switchState.id)) {
          // The toggled switch is being turned ON and it controls this switch, so turn this one OFF
          return { ...switchState, isOn: false }
        }
        return switchState
      }
    })
  }

  const handleSwitchToggle = (switchId: number) => {
    setSwitches(prevSwitches => toggleSwitch(switchId, prevSwitches))
    setAttempts(prev => prev + 1)
  }

  // Check if all switches are on
  useEffect(() => {
    const allOn = switches.every(sw => sw.isOn)
    
    if (allOn) {
      setMessage("🎉 SUCCESS! All systems online! The network is fully operational!")
      setTimeout(() => onComplete(), 1500)
    } else if (attempts > 0) {
      const onCount = switches.filter(sw => sw.isOn).length
      
      if (attempts <= 3) {
        setMessage(`${onCount}/6 switches active. Each switch may control others when turned on...`)
      } else if (attempts <= 6) {
        setMessage(`Strategy tip: Consider the order! Some switches must be turned on last to avoid conflicts.`)
      } else if (attempts <= 10) {
        setMessage(`Hint: Try turning on switches that don't control many others first!`)
      } else {
        setMessage(`Advanced hint: Start with switches 4 and 6, then work backwards!`)
      }
    }
  }, [switches, attempts, onComplete])



  const getSwitchConnections = (switchState: SwitchState) => {
    return switchState.turnsOff.map(id => switches.find(s => s.id === id)?.name).join(', ')
  }

  return (
    <div className="puzzle-container">
      <div className="puzzle-info">
        <h2>The Switch Network Challenge</h2>
        <p>Activate all switches simultaneously to power up the system</p>
        {isCompleted && <p className="win-message">🎉 Network Online!</p>}
      </div>

      <div style={{ 
        padding: '20px', 
        minHeight: '400px', 
        border: '2px solid #ddd', 
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
      }}>
        {/* Status Header */}
        <div style={{ 
          marginBottom: '20px', 
          padding: '10px', 
          backgroundColor: '#fff', 
          borderRadius: '4px'
        }}>
          <div><strong>Status:</strong> {message}</div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
            Active: {switches.filter(s => s.isOn).length}/6 | Attempts: {attempts}
          </div>
        </div>

        {/* Switch Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '15px',
          marginBottom: '20px'
        }}>
          {switches.map((switchState) => (
            <div key={switchState.id} style={{
              padding: '15px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              border: '1px solid #ddd',
              textAlign: 'center'
            }}>
              <h3 style={{ 
                color: '#333', 
                marginBottom: '15px', 
                fontSize: '14px'
              }}>
                {switchState.name}
              </h3>
              
              <div style={{ 
                marginBottom: '15px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                position: 'relative'
              }}>
                {/* Indicator Light - Left side for switches 1, 3, 5 (odd IDs) */}
                {switchState.id % 2 === 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      left: '90px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: switchState.isOn ? '#28a745' : '#dc3545',
                      boxShadow: `0 0 8px ${switchState.isOn ? '#28a745' : '#dc3545'}`,
                      transition: 'all 0.3s ease'
                    }}
                  />
                )}
                
                <button
                  onClick={() => handleSwitchToggle(switchState.id)}
                  style={{
                    width: '80px',
                    height: '40px',
                    borderRadius: '20px',
                    border: 'none',
                    backgroundColor: switchState.isOn ? '#28a745' : '#6c757d',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '2px',
                      left: switchState.isOn ? '42px' : '2px',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'white',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                  />
                </button>

                {/* Indicator Light - Right side for switches 2, 4, 6 (even IDs) */}
                {switchState.id % 2 === 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      left: '90px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: switchState.isOn ? '#28a745' : '#dc3545',
                      boxShadow: `0 0 8px ${switchState.isOn ? '#28a745' : '#dc3545'}`,
                      transition: 'all 0.3s ease'
                    }}
                  />
                )}
              </div>
              
              <div style={{ 
                fontSize: '11px', 
                color: '#666',
                borderTop: '1px solid #eee',
                paddingTop: '8px'
              }}>
                <strong>Turns off:</strong> {getSwitchConnections(switchState) || 'None'}
              </div>
            </div>
          ))}
        </div>

        {/* Dependencies Info */}
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#e6f3ff', 
          borderRadius: '4px',
          fontSize: '12px',
          color: '#666'
        }}>
          💡 <strong>Tip:</strong> When you turn a switch ON, it automatically turns OFF the switches it controls. 
          Find the right sequence to get all switches active simultaneously!
        </div>
      </div>
    </div>
  )
}

export default SwitchNetworkPuzzle