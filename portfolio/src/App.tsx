import { useEffect, useState } from 'react'
import './App.css'
import { LoginScreen } from './screens/LoginScreen'
import { BootScreen } from './screens/BootScreen'
import { DesktopScreen } from './screens/DesktopScreen'

type Screen = 'login' | 'boot' | 'desktop'

function App() {
  const [screen, setScreen] = useState<Screen>('login')
  const [transitioning, setTransitioning] = useState(false)

  const [loginVisible, setLoginVisible] = useState(true)
  const [bootVisible, setBootVisible] = useState(false)
  const [desktopVisible, setDesktopVisible] = useState(false)

  const fadeTo = (next: Screen) => {
    setTransitioning(true)

    if (screen === 'login') setLoginVisible(false)
    if (screen === 'boot') setBootVisible(false)
    if (screen === 'desktop') setDesktopVisible(false)

    window.setTimeout(() => {
      setScreen(next)
      if (next === 'login') setLoginVisible(true)
      if (next === 'boot') setBootVisible(true)
      if (next === 'desktop') setDesktopVisible(true)
      setTransitioning(false)
    }, 400)
  }

  useEffect(() => {
    if (screen !== 'login') return
    const id = window.setTimeout(() => fadeTo('boot'), 5000)
    return () => window.clearTimeout(id)
  }, [screen])

  const handleBootComplete = () => {
    if (screen !== 'boot') return
    fadeTo('desktop')
  }

  return (
    <div className="app-shell">
      <div className="app-inner">
        <section
          aria-label="Login screen"
          className={`screen ${
            screen === 'login' && loginVisible ? 'screen--active' : ''
          } ${transitioning && screen === 'login' ? 'screen--fading' : ''}`}
        >
          <LoginScreen />
        </section>

        <section
          aria-label="Boot screen"
          className={`screen ${
            screen === 'boot' && bootVisible ? 'screen--active' : ''
          } ${transitioning && screen === 'boot' ? 'screen--fading' : ''}`}
        >
          {screen === 'boot' && <BootScreen onComplete={handleBootComplete} />}
        </section>

        <section
          aria-label="Desktop screen"
          className={`screen ${
            screen === 'desktop' && desktopVisible ? 'screen--active' : ''
          } ${transitioning && screen === 'desktop' ? 'screen--fading' : ''}`}
        >
          {screen === 'desktop' && <DesktopScreen />}
        </section>
      </div>
    </div>
  )
}

export default App
