import { useState, useEffect } from 'react'
import './tooltip.scss'

const FloatingTooltip = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX + 10, y: e.clientY + 10 })
      setVisible(true)
    }

    const handleMouseLeave = () => {
      setVisible(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      className={`tooltip ${visible ? 'visible' : 'hidden'}`}
      style={{ left: position.x, top: position.y }}
    >
      click
    </div>
  )
}

export default FloatingTooltip
