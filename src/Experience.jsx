import { Text3D, MeshReflectorMaterial, Float, Text, Html ,PivotControls ,TransformControls, OrbitControls } from "@react-three/drei"
import { useRef, useState } from "react"
import { DoubleSide } from "three"
import { useFrame, useLoader } from "@react-three/fiber"
import { useSpring, animated, config } from '@react-spring/three'

import { TextureLoader } from 'three/src/loaders/TextureLoader'

export default function Experience()
{

  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
    'Grass001_1K_Color.jpg',
    'Grass001_1K_Displacement.jpg',
    'Grass001_1K_NormalGL.jpg',
    'Grass001_1K_Roughness.jpg',
    'Grass001_1K_AmbientOcclusion.jpg'
  ])

  const [colorMap2, displacementMap2, normalMap2, roughnessMap2, aoMap2] = useLoader(TextureLoader, [
    'PavingStones092_1K_Color.jpg',
    'PavingStones092_1K_Displacement.jpg',
    'PavingStones092_1K_NormalGL.jpg',
    'PavingStones092_1K_Roughness.jpg',
    'PavingStones092_1K_AmbientOcclusion.jpg'
  ])

  const cubeRef = useRef() // getting reference to the cube
  const sphere = useRef() // getting reference to the sphere
  const moon = useRef() // getting reference to the roundCube

  const [active, setActive] = useState(false) // state for the moon
  const { scale } = useSpring({
    scale: active ? 1 : .6,
    config: config.wobbly
  }) // animation for the moon


  // animate the cube
  useFrame((state, delta) => {
    moon.current.rotation.y += 0.01
  })

    return <>
        <OrbitControls makeDefault/>

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        {/* Moon */}
        <animated.mesh position={ [3.7, 4, -3]} ref={moon} scale={scale} onClick={() => setActive(!active)}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="white" />
        </animated.mesh>


          {/* Roof */}
          <mesh
          position={ [0, 1.3, 0] }
          rotation={ [-Math.PI / 2, 0, 0] }
          scale={ [1.4, 1, 1]}
          >
              <cylinderGeometry
                args={[1, 1, 2, 3]}
              />
              <meshStandardMaterial color="#4FBA83" />
          </mesh>


        {/* House Base */}
        <mesh ref={cubeRef} position={ [0, -.2, 0] } scale={ 2 }>
            <boxGeometry />
            <meshStandardMaterial color="#C4FFB2"
            map={colorMap2}
            displacementMap={displacementMap2}
            displacementScale={0.01}
            normalMap={normalMap2}
            roughnessMap={roughnessMap2}
            aoMap={aoMap2}
            />
        </mesh>
        {/* <TransformControls object={ cubeRef } mode="translate" /> */}

        {/* Door */}
        <mesh position={ [0, -0.5, 1.01] } scale={ [0.5, 1, .05] }>
            <boxGeometry />
            <meshStandardMaterial color="#F84AA7" />
        </mesh>

        {/* Window */}
        <mesh position={ [0, 1.3, .91] } scale={ [.2, .2, .25] } rotation={[Math.PI / 2, 0, 0]} >
            <cylinderGeometry />
            <meshStandardMaterial color="#F84AA7" />
        </mesh>

        {/* Mountains */}
        <mesh position={ [-3, -4, -15] } rotation={ [-Math.PI / 2, 0, 0] } scale={ [10, 10, 10] }>
            <coneGeometry args={[1, 2, 3]} />
            <meshStandardMaterial color="#B07C9E" />
        </mesh>

        <mesh position={ [3, -4, -15] } rotation={ [-Math.PI / 2, 0, 0] } scale={ [10, 10, 9] }>
            <coneGeometry args={[1, 2, 3]} />
            <meshStandardMaterial color="#B07C9E" />
        </mesh>

        <mesh position={ [1, -4, -15] } rotation={ [-Math.PI / 2, 0, 0] } scale={ [9, 8, 9] }>
            <coneGeometry args={[1, 2, 3]} />
            <meshStandardMaterial color="#B07C9E" />
        </mesh>

        {/* Floor */}
        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 15} >
            <planeGeometry />
            <meshStandardMaterial
            color={ '#A4AF69' }
            map={colorMap}
            displacementMap={displacementMap}
            displacementScale={0.05}
            normalMap={normalMap}
            roughnessMap={roughnessMap}
            aoMap={aoMap}
            side={DoubleSide}
            />
        </mesh>

        {/* Text */}
        <Float>
          <Text
            font="./bangers-v20-latin-regular.woff"
            // position={ [0, 3, -2] }
            position={ [0, 3, -1] }
            // rotation={ [0, 4.7, 0] }
            outlineBlur={ 0.1 }
            outlineColor={ 'skyblue' }
            color={ '#F84AA7' }
            maxWidth={ 20 }
            textAlign="center"
            >

            I Love Meehow

          </Text>
        </Float>





    </>
}
