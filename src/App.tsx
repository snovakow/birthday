import { useEffect, useState, useSyncExternalStore } from 'react'
import { ageAt } from './age.ts'

const NAME = 'Raya Papaya'
const BIRTH = new Date('2013-07-18T12:38:00.000-04:00')

// The width the page is laid out for; narrower windows scale it down to fit
const LAYOUT_WIDTH = 576

const UNITS = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'] as const

const born = `Born ${BIRTH.toLocaleString(undefined, {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
})}`

function subscribeToResize(onChange: () => void) {
  window.addEventListener('resize', onChange)
  return () => window.removeEventListener('resize', onChange)
}

// The current time, updated every animation frame
function useNow() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    let frame = 0
    const step = () => {
      setNow(new Date())
      frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [])
  return now
}

export default function App() {
  const age = ageAt(BIRTH, useNow())
  const width = useSyncExternalStore(subscribeToResize, () => window.innerWidth)
  const transform = width < LAYOUT_WIDTH ? `translateX(-50%) scale(${width / LAYOUT_WIDTH})` : undefined

  return (
    <div className="mainBacking">
      <div className="mainContainer" style={{ transform }}>
        <div className="titleBacking">
          <span className="title">{NAME}</span>
        </div>
        <div className="subtitle">{born}</div>
        <div className="statsBacking">
          <div className="stats">
            {UNITS.map((unit) => (
              <div className="stat" key={unit}>
                {`${NAME} is... `}
                <span className="number">{age[unit].toLocaleString()}</span>
                {` ${unit} old`}
              </div>
            ))}
          </div>
        </div>
        <div className="exactAgeContainer">
          <div className="exactAge">{age.exact.toFixed(8)}</div>
          <span className="exactAgeSub">years old!!!</span>
        </div>
      </div>
    </div>
  )
}
