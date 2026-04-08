import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/*
 * Real 3D Neural Brain using Three.js / WebGL.
 * - Nodes positioned in true 3D space forming a brain silhouette
 * - Lines connecting nearby nodes in 3D
 * - Continuous subtle rotation
 * - Mouse-driven parallax (camera orbit)
 * - Three depth layers with size/opacity variation
 * - Premium, minimal, AI system aesthetic
 */

// Brain-shaped point distribution in 3D
function brainPoints(count: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = []
  let attempts = 0

  while (pts.length < count && attempts < 20000) {
    attempts++

    // Random point in a box
    const x = (Math.random() - 0.5) * 4.0
    const y = (Math.random() - 0.5) * 3.2
    const z = (Math.random() - 0.5) * 2.8

    // Brain silhouette test (3D ellipsoid with two lobes)
    // Main cerebrum ellipsoid
    const mainEllipsoid = (x * x) / 4.0 + (y * y) / 2.8 + (z * z) / 2.0

    // Left lobe (shifted left and slightly forward)
    const lx = x + 1.1
    const ly = y + 0.2
    const lz = z
    const leftLobe = (lx * lx) / 1.4 + (ly * ly) / 1.8 + (lz * lz) / 1.5

    // Right lobe (shifted right and slightly forward)
    const rx = x - 1.1
    const ry = y + 0.2
    const rz = z
    const rightLobe = (rx * rx) / 1.4 + (ry * ry) / 1.8 + (rz * rz) / 1.5

    // Brain stem (cylinder going down)
    const stemR = Math.sqrt(x * x + z * z)
    const isStem = stemR < 0.35 && y < -1.0 && y > -1.8

    // Cerebellum (back-bottom)
    const cx = x
    const cy = y + 1.2
    const cz = z - 0.6
    const cerebellum = (cx * cx) / 1.0 + (cy * cy) / 0.6 + (cz * cz) / 0.8

    if (mainEllipsoid < 1.0 || leftLobe < 1.0 || rightLobe < 1.0 || isStem || cerebellum < 1.0) {
      pts.push(new THREE.Vector3(x, y, z))
    }
  }

  return pts
}

export default function NeuralBrain3D() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const W = container.clientWidth
    const H = container.clientHeight

    // --- Scene ---
    const scene = new THREE.Scene()

    // --- Camera ---
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100)
    camera.position.set(0, 0, 7)

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // --- Brain group (for rotation) ---
    const brainGroup = new THREE.Group()
    scene.add(brainGroup)

    // --- Generate brain nodes ---
    const NODE_COUNT = 200
    const positions = brainPoints(NODE_COUNT)

    // Node sizes based on depth (z)
    const nodeSizes = positions.map(p => {
      const depth = (p.z + 1.4) / 2.8 // 0=back, 1=front
      return 0.03 + depth * 0.06
    })

    // --- Node points (THREE.Points) ---
    const nodeGeometry = new THREE.BufferGeometry()
    const posArray = new Float32Array(positions.length * 3)
    const sizeArray = new Float32Array(positions.length)
    const alphaArray = new Float32Array(positions.length)

    positions.forEach((p, i) => {
      posArray[i * 3] = p.x
      posArray[i * 3 + 1] = p.y
      posArray[i * 3 + 2] = p.z
      sizeArray[i] = nodeSizes[i]
      const depth = (p.z + 1.4) / 2.8
      alphaArray[i] = 0.25 + depth * 0.75
    })

    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    nodeGeometry.setAttribute('aSize', new THREE.BufferAttribute(sizeArray, 1))
    nodeGeometry.setAttribute('aAlpha', new THREE.BufferAttribute(alphaArray, 1))

    const nodeShader = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
      },
      vertexShader: `
        attribute float aSize;
        attribute float aAlpha;
        varying float vAlpha;
        uniform float uTime;
        uniform float uPixelRatio;

        void main() {
          vAlpha = aAlpha;
          vec3 pos = position;
          // Subtle breathing
          pos += normal * sin(uTime * 0.8 + position.x * 2.0 + position.y * 1.5) * 0.02;

          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPos;

          // Size attenuation
          float size = aSize * 300.0 * uPixelRatio;
          gl_PointSize = size * (1.0 / -mvPos.z);
        }
      `,
      fragmentShader: `
        varying float vAlpha;

        void main() {
          float d = length(gl_PointCoord - 0.5) * 2.0;
          if (d > 1.0) discard;

          // Soft glow falloff
          float strength = 1.0 - d;
          strength = pow(strength, 1.5);

          // Cyan-blue color
          vec3 color = mix(vec3(0.3, 0.5, 1.0), vec3(0.0, 0.82, 1.0), vAlpha);

          // Core brightness + outer glow
          float core = smoothstep(0.6, 0.0, d) * 0.8;
          float glow = strength * 0.5;

          gl_FragColor = vec4(color, (core + glow) * vAlpha);
        }
      `,
    })

    const nodePoints = new THREE.Points(nodeGeometry, nodeShader)
    brainGroup.add(nodePoints)

    // --- Connections (LineSegments) ---
    const LINK_DIST = 0.85
    const linePositions: number[] = []
    const lineAlphas: number[] = []

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const d = positions[i].distanceTo(positions[j])
        if (d < LINK_DIST) {
          linePositions.push(
            positions[i].x, positions[i].y, positions[i].z,
            positions[j].x, positions[j].y, positions[j].z
          )
          const avgDepth = ((positions[i].z + positions[j].z) / 2 + 1.4) / 2.8
          const strength = (1 - d / LINK_DIST) * (0.1 + avgDepth * 0.25)
          lineAlphas.push(strength, strength)
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
    lineGeometry.setAttribute('aAlpha', new THREE.Float32BufferAttribute(lineAlphas, 1))

    const lineShader = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute float aAlpha;
        varying float vAlpha;
        uniform float uTime;

        void main() {
          vAlpha = aAlpha;
          vec3 pos = position;
          pos += sin(uTime * 0.6 + position.x * 3.0) * 0.015;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying float vAlpha;

        void main() {
          vec3 color = mix(vec3(0.2, 0.4, 0.9), vec3(0.0, 0.78, 1.0), vAlpha * 3.0);
          gl_FragColor = vec4(color, vAlpha * 0.7);
        }
      `,
    })

    const lines = new THREE.LineSegments(lineGeometry, lineShader)
    brainGroup.add(lines)

    // --- Central glow sprite ---
    const glowTexture = (() => {
      const size = 256
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')!
      const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
      gradient.addColorStop(0, 'rgba(0,180,255,0.15)')
      gradient.addColorStop(0.3, 'rgba(40,80,200,0.06)')
      gradient.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, size, size)
      const tex = new THREE.CanvasTexture(canvas)
      return tex
    })()

    const glowSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    )
    glowSprite.scale.set(8, 8, 1)
    glowSprite.position.set(0, -0.1, 0)
    brainGroup.add(glowSprite)

    // --- Mouse tracking ---
    let targetRotX = 0
    let targetRotY = 0
    let currentRotX = 0
    let currentRotY = 0

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const mx = ((e.clientX - rect.left) / W - 0.5) * 2
      const my = ((e.clientY - rect.top) / H - 0.5) * 2
      targetRotY = mx * 0.3
      targetRotX = -my * 0.2
    }

    window.addEventListener('mousemove', onMouseMove)

    // --- Resize ---
    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // --- Animation loop ---
    let time = 0
    const clock = new THREE.Clock()

    const animate = () => {
      const delta = clock.getDelta()
      time += delta

      // Update uniforms
      nodeShader.uniforms.uTime.value = time
      lineShader.uniforms.uTime.value = time

      // Smooth mouse follow
      currentRotX += (targetRotX - currentRotX) * 0.03
      currentRotY += (targetRotY - currentRotY) * 0.03

      // Continuous slow rotation + mouse parallax
      brainGroup.rotation.y = time * 0.06 + currentRotY
      brainGroup.rotation.x = Math.sin(time * 0.15) * 0.05 + currentRotX
      brainGroup.rotation.z = Math.sin(time * 0.1) * 0.02

      // Subtle breathing scale
      const breathe = 1.0 + Math.sin(time * 0.5) * 0.015
      brainGroup.scale.setScalar(breathe)

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    // --- Cleanup ---
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      nodeGeometry.dispose()
      nodeShader.dispose()
      lineGeometry.dispose()
      lineShader.dispose()
      glowTexture.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
    />
  )
}
