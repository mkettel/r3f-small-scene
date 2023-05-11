import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        camera={ {
            fov: 50,
            near: 0.1,
            far: 700,
            position: [ - 1, 1, 9 ]
        } }

    >
        <color attach="background" args={['skyblue']} />
        <Experience />
    </Canvas>
)
