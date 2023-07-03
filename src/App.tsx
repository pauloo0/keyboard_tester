import React, { useEffect, useState } from 'react'
import keyboardUtil from './utils/keyboard.utils'

const App: React.FC = () => {
  const [keyboard, setKeyboard] = useState(keyboardUtil)

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      const key = e.key.toUpperCase()

      console.log(key)

      const newKeyboard = keyboardUtil
      newKeyboard.TKL.forEach((row) => {
        row.forEach((k) => {
          if (k.key === key) {
            k.active = true
          }
        })
      })
      setKeyboard(newKeyboard)
    })
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
