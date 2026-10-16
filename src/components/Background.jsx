import { useEffect, useRef } from 'react'
import { initGlobe } from '../lib/globe'

export default function Background() {
  const ref = useRef(null)
  useEffect(() => {
    let dispose = () => {}
    try {
      dispose = initGlobe(ref.current)
    } catch (e) {
      // No WebGL: the page still works on plain black.
      console.warn('Globe disabled:', e)
    }
    return dispose
  }, [])
  return (
    <div className="bg" aria-hidden="true">
      <canvas ref={ref} />
    </div>
  )
}
