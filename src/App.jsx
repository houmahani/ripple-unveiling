import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Plane from './components/Plane/Plane.jsx'
import FloatingTooltip from './components/Tooltip/FloatingTooltip.jsx'

const App = () => {
  return (
    <>
      <Canvas
        style={{ height: '100vh' }}
        camera={{ position: [0, 0, 1], fov: 75 }}
      >
        <Suspense fallback={null}>
          <Plane />
        </Suspense>
      </Canvas>

      <FloatingTooltip />

      <footer>
        <div className="wrapper-footer">
          <div className="container">
            <div className="about">
              <ul>
                <li>
                  <a
                    href="https://houmahanikane.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Houmahani Kane
                  </a>
                </li>

                <li>
                  <a
                    href="https://x.com/houm_kn"
                    target="_blank"
                    rel="noreferrer"
                  >
                    X
                  </a>{' '}
                  {' / '}
                  <a
                    href="https://bsky.app/profile/houm.bsky.social"
                    target="_blank"
                    rel="noreferrer"
                  >
                    BlueSky
                  </a>{' '}
                </li>

                <li>
                  <a href="mailto:houm.kane@gmail.com">houm.kane@gmail.com</a>
                </li>
              </ul>
            </div>

            <div className="ressources">
              <div>
                <ul>
                  <li>
                    <a
                      href="https://www.baytalfann.com/post/spectacular-mosque-ceilings-across-the-world"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Shah Mosque in Tehran, Iran
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://threejs.org/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>three.js</span>
                    </a>
                    {'/'}
                    <a
                      href="https://threejs-journey.com/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>Threejs Journey</span>
                    </a>

                    {'/'}

                    <a
                      href="https://thebookofshaders.com/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>Book Of Shaders</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
