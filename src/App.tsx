import React, { useEffect, useState } from 'react'
import keyboardUtil from './utils/keyboard.utils'

const App: React.FC = () => {
  const [keyboard, setKeyboard] = useState(keyboardUtil)

  useEffect(() => {
    const handleKeypress = (e: KeyboardEvent) => {
      e.preventDefault()

      const key = e.key.toUpperCase()

      setKeyboard((prev) => {
        const newKeyboard = { ...prev }

        newKeyboard.TKL.forEach((row) => {
          row.forEach((k) => {
            if (k.key.toUpperCase() === key) {
              k.active = true

              k.clicking = true
              setTimeout(() => {
                k.clicking = false
              }, 50)
            }
          })
        })

        return newKeyboard
      })
    }

    document.addEventListener('keydown', (e) => handleKeypress(e))

    return () =>
      document.removeEventListener('keydown', (e) => handleKeypress(e))
  }, [])

  return (
    <div className='grid h-screen overflow-y-hidden place-items-center'>
      {keyboard.TKL.map((row, index) => {
        return (
          <div
            key={index}
            className='flex flex-row items-center justify-around w-10/12'
          >
            {row.map((key, index) => {
              return (
                <div
                  key={index}
                  className={`${key.active ? 'bg-sky-400' : 'bg-gray-400'} p-4`}
                >
                  {key.key}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default App
