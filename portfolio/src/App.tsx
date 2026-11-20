import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import './App.css'
import { DesktopScreen } from './screens/DesktopScreen'

const LoginScreen = lazy(() =>
  import('./screens/LoginScreen').then((m) => ({ default: m.LoginScreen })),
)
const BootScreen = lazy(() =>
  import('./screens/BootScreen').then((m) => ({ default: m.BootScreen })),
)

type Screen = 'login' | 'boot' | 'desktop'

const INTRO_KEY = 'introSeen'

function shouldSkipIntro(): boolean {
  if (typeof window === 'undefined') return false
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
    if (window.location.hash && window.location.hash.length > 1) return true
    if (window.localStorage.getItem(INTRO_KEY) === '1') return true
  } catch {
    // storage may be unavailable
  }
  return false
}

function markIntroSeen(): void {
  try {
    window.localStorage.setItem(INTRO_KEY, '1')
  } catch {
    // ignore
  }
}

function App() {
  const [screen, setScreen] = useState<Screen>(() =>
    shouldSkipIntro() ? 'desktop' : 'login',
  )
  const [transitioning, setTransitioning] = useState(false)

  const [loginVisible, setLoginVisible] = useState(() => !shouldSkipIntro())
  const [bootVisible, setBootVisible] = useState(false)
  const [desktopVisible, setDesktopVisible] = useState(() => shouldSkipIntro())

  const fadeTo = useCallback(
    (next: Screen) => {
      setTransitioning(true)

      if (screen === 'login') setLoginVisible(false)
      if (screen === 'boot') setBootVisible(false)
      if (screen === 'desktop') setDesktopVisible(false)

      const id = window.setTimeout(() => {
        setScreen(next)
        if (next === 'login') setLoginVisible(true)
        if (next === 'boot') setBootVisible(true)
        if (next === 'desktop') {
          setDesktopVisible(true)
          markIntroSeen()
        }
        setTransitioning(false)
      }, 400)

      return id
    },
    [screen],
  )

  const goDesktop = useCallback(() => {
    if (screen === 'desktop') return
    markIntroSeen()
    setTransitioning(false)
    setLoginVisible(false)
    setBootVisible(false)
    setScreen('desktop')
    setDesktopVisible(true)
  }, [screen])

  useEffect(() => {
    if (screen !== 'login') return
    const id = window.setTimeout(() => fadeTo('boot'), 1200)
    return () => window.clearTimeout(id)
  }, [screen, fadeTo])

  useEffect(() => {
    if (screen === 'desktop') return

    const skip = () => goDesktop()
    window.addEventListener('keydown', skip)
    window.addEventListener('pointerdown', skip)
    return () => {
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
    }
  }, [screen, goDesktop])

  const handleBootComplete = useCallback(() => {
    if (screen !== 'boot') return
    fadeTo('desktop')
  }, [screen, fadeTo])

  return (
    <div className="app-shell">
      <div className="app-inner">
        <section
          aria-label="Login screen"
          className={`screen ${
            screen === 'login' && loginVisible ? 'screen--active' : ''
          } ${transitioning && screen === 'login' ? 'screen--fading' : ''}`}
        >
          <Suspense fallback={null}>
            <LoginScreen />
          </Suspense>
        </section>

        <section
          aria-label="Boot screen"
          className={`screen ${
            screen === 'boot' && bootVisible ? 'screen--active' : ''
          } ${transitioning && screen === 'boot' ? 'screen--fading' : ''}`}
        >
          {screen === 'boot' ? (
            <Suspense fallback={null}>
              <BootScreen onComplete={handleBootComplete} />
            </Suspense>
          ) : null}
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
