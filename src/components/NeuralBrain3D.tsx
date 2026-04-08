import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Real 3D Neural Brain — Three.js / WebGL
 *
 * Strong depth separation:
 *   Z spread: -3.5 to +3.5  (wide)
 *   Camera FOV 70, z=4.5 (close)
 *   3 explicit layers: back / mid / front
 *   Front nodes 4-6x bigger than back nodes
 *   Parallax: front moves 3x more than back
 *   Back nodes dim & blurred, front bright & sharp
 */

interface BrainNode {
  pos: THREE.Vector3
  depth: number   // 0=far back, 1=near front
  layer: 0 | 1 | 2
}

function generateBrainNodes(count: number): BrainNode[] {
  const nodes: BrainNode[] = []
  let attempts = 0

  while (nodes.length < count && attempts < 30000) {
    attempts++
    const x = (Math.random() - 0.5) * 5.0
    const y = (Math.random() - 0.5) * 4.0
    const z = (Math.random() - 0.5) * 7.0  // wide Z spread

    // Brain shape: compound ellipsoids
    const mainBrain = (x * x) / 5.5 + (y * y) / 3.5 + (z * z) / 3.0
    const lx = x + 1.3, ly = y + 0.15
    const leftLobe = (lx * lx) / 1.8 + (ly * ly) / 2.2 + (z * z) / 2.2
    const rx = x - 1.3, ry = y + 0.15
    const rightLobe = (rx * rx) / 1.8 + (ry * ry) / 2.2 + (z * z) / 2.2
    const stemR = Math.sqrt(x * x + z * z)
    const isStem = stemR < 0.4 && y < -1.2 && y > -2.2
    const cx2 = x, cy2 = y + 1.4, cz2 = z - 0.5
    const cerebellum = (cx2 * cx2) / 1.2 + (cy2 * cy2) / 0.7 + (cz2 * cz2) / 1.0

    if (mainBrain < 1.0 || leftLobe < 1.0 || rightLobe < 1.0 || isStem || cerebellum < 1.0) {
      // depth: map z from [-3.5, 3.5] → [0, 1] where 1 = closest to camera
      const depth = (z + 3.5) / 7.0
      const layer: 0 | 1 | 2 = depth < 0.33 ? 0 : depth < 0.66 ? 1 : 2
      nodes.push({ pos: new THREE.Vector3(x, y, z), depth, layer })
    }
  }
  return nodes
}

export default function NeuralBrain3D() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    let W = el.clientWidth
    let H = el.clientHeight

    // Scene
    const scene = new THREE.Scene()

    // Camera: FOV 70, close
    const camera = new THREE.PerspectiveCamera(70, W / H, 0.1, 100)
    camera.position.set(0, 0, 4.5)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    // Parallax groups: 3 separate groups that move at different speeds
    const backGroup = new THREE.Group()
    const midGroup = new THREE.Group()
    const frontGroup = new THREE.Group()
    const brainPivot = new THREE.Group()
    brainPivot.add(backGroup, midGroup, frontGroup)
    scene.add(brainPivot)

    // Generate
    const NODES = 220
    const nodes = generateBrainNodes(NODES)
    const LINK_DIST_BACK = 1.1
    const LINK_DIST_MID = 0.95
    const LINK_DIST_FRONT = 0.8

    // ---- BUILD EACH LAYER ----
    function buildLayer(
      group: THREE.Group,
      layerNodes: BrainNode[],
      sizeMin: number, sizeMax: number,
      alphaMin: number, alphaMax: number,
      linkDist: number,
      colorFar: THREE.Color, colorNear: THREE.Color
    ) {
      if (layerNodes.length === 0) return

      // Points
      const geo = new THREE.BufferGeometry()
      const pos = new Float32Array(layerNodes.length * 3)
      const sizes = new Float32Array(layerNodes.length)
      const alphas = new Float32Array(layerNodes.length)
      const depths = new Float32Array(layerNodes.length)

      layerNodes.forEach((n, i) => {
        pos[i * 3] = n.pos.x
        pos[i * 3 + 1] = n.pos.y
        pos[i * 3 + 2] = n.pos.z
        sizes[i] = sizeMin + n.depth * (sizeMax - sizeMin)
        alphas[i] = alphaMin + n.depth * (alphaMax - alphaMin)
        depths[i] = n.depth
      })

      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
      geo.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1))
      geo.setAttribute('aDepth', new THREE.BufferAttribute(depths, 1))

      const cFar = `vec3(${colorFar.r.toFixed(3)}, ${colorFar.g.toFixed(3)}, ${colorFar.b.toFixed(3)})`
      const cNear = `vec3(${colorNear.r.toFixed(3)}, ${colorNear.g.toFixed(3)}, ${colorNear.b.toFixed(3)})`

      const mat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 }, uPR: { value: renderer.getPixelRatio() } },
        vertexShader: `
          attribute float aSize;
          attribute float aAlpha;
          attribute float aDepth;
          varying float vAlpha;
          varying float vDepth;
          uniform float uTime;
          uniform float uPR;
          void main() {
            vAlpha = aAlpha;
            vDepth = aDepth;
            vec3 p = position;
            p += sin(uTime * 0.7 + p.x * 2.0 + p.y * 1.5 + p.z) * 0.03;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = aSize * 420.0 * uPR * (1.0 / -mv.z);
          }
        `,
        fragmentShader: `
          varying float vAlpha;
          varying float vDepth;
          void main() {
            float d = length(gl_PointCoord - 0.5) * 2.0;
            if (d > 1.0) discard;
            float core = smoothstep(0.5, 0.0, d);
            float glow = pow(1.0 - d, 2.0) * 0.4;
            float strength = core + glow;
            vec3 col = mix(${cFar}, ${cNear}, vDepth);
            gl_FragColor = vec4(col, strength * vAlpha);
          }
        `,
      })

      group.add(new THREE.Points(geo, mat))

      // Lines
      const lPos: number[] = []
      const lAlpha: number[] = []
      for (let i = 0; i < layerNodes.length; i++) {
        for (let j = i + 1; j < layerNodes.length; j++) {
          const dist = layerNodes[i].pos.distanceTo(layerNodes[j].pos)
          if (dist < linkDist) {
            lPos.push(
              layerNodes[i].pos.x, layerNodes[i].pos.y, layerNodes[i].pos.z,
              layerNodes[j].pos.x, layerNodes[j].pos.y, layerNodes[j].pos.z
            )
            const avg = (layerNodes[i].depth + layerNodes[j].depth) / 2
            const a = (1 - dist / linkDist) * (alphaMin + avg * (alphaMax - alphaMin)) * 0.6
            lAlpha.push(a, a)
          }
        }
      }

      if (lPos.length > 0) {
        const lGeo = new THREE.BufferGeometry()
        lGeo.setAttribute('position', new THREE.Float32BufferAttribute(lPos, 3))
        lGeo.setAttribute('aAlpha', new THREE.Float32BufferAttribute(lAlpha, 1))

        const lMat = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          uniforms: { uTime: { value: 0 } },
          vertexShader: `
            attribute float aAlpha;
            varying float vA;
            uniform float uTime;
            void main() {
              vA = aAlpha;
              vec3 p = position;
              p += sin(uTime * 0.5 + p.x * 3.0) * 0.02;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
            }
          `,
          fragmentShader: `
            varying float vA;
            void main() {
              gl_FragColor = vec4(0.0, 0.7, 1.0, vA);
            }
          `,
        })

        group.add(new THREE.LineSegments(lGeo, lMat))
      }
    }

    const backNodes = nodes.filter(n => n.layer === 0)
    const midNodes = nodes.filter(n => n.layer === 1)
    const frontNodes = nodes.filter(n => n.layer === 2)

    // Back: small, dim, blue-purple
    buildLayer(
      backGroup, backNodes,
      0.015, 0.035,    // size: tiny
      0.12, 0.25,      // alpha: very dim
      LINK_DIST_BACK,
      new THREE.Color(0.15, 0.2, 0.6),   // dark blue
      new THREE.Color(0.2, 0.35, 0.8)    // medium blue
    )

    // Mid: medium, moderate
    buildLayer(
      midGroup, midNodes,
      0.035, 0.065,
      0.3, 0.6,
      LINK_DIST_MID,
      new THREE.Color(0.1, 0.45, 0.85),
      new THREE.Color(0.0, 0.65, 1.0)
    )

    // Front: large, bright, cyan-white
    buildLayer(
      frontGroup, frontNodes,
      0.06, 0.12,       // size: large
      0.6, 1.0,         // alpha: bright
      LINK_DIST_FRONT,
      new THREE.Color(0.0, 0.7, 1.0),
      new THREE.Color(0.4, 0.9, 1.0)     // near white-cyan
    )

    // Cross-layer connections (sparse, mid↔front only)
    const crossPos: number[] = []
    const crossAlpha: number[] = []
    for (const m of midNodes) {
      for (const f of frontNodes) {
        const d = m.pos.distanceTo(f.pos)
        if (d < 0.9 && Math.random() < 0.3) {
          crossPos.push(m.pos.x, m.pos.y, m.pos.z, f.pos.x, f.pos.y, f.pos.z)
          const a = (1 - d / 0.9) * 0.15
          crossAlpha.push(a, a)
        }
      }
    }
    if (crossPos.length > 0) {
      const cGeo = new THREE.BufferGeometry()
      cGeo.setAttribute('position', new THREE.Float32BufferAttribute(crossPos, 3))
      cGeo.setAttribute('aAlpha', new THREE.Float32BufferAttribute(crossAlpha, 1))
      const cMat = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          attribute float aAlpha;
          varying float vA;
          void main() {
            vA = aAlpha;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying float vA;
          void main() { gl_FragColor = vec4(0.0, 0.75, 1.0, vA); }
        `,
      })
      midGroup.add(new THREE.LineSegments(cGeo, cMat))
    }

    // Central glow (subtle, not flattening)
    const glowCanvas = document.createElement('canvas')
    glowCanvas.width = 256
    glowCanvas.height = 256
    const gCtx = glowCanvas.getContext('2d')!
    const grad = gCtx.createRadialGradient(128, 128, 0, 128, 128, 128)
    grad.addColorStop(0, 'rgba(0,160,255,0.08)')
    grad.addColorStop(0.4, 'rgba(30,60,180,0.03)')
    grad.addColorStop(1, 'rgba(0,0,0,0)')
    gCtx.fillStyle = grad
    gCtx.fillRect(0, 0, 256, 256)
    const glowTex = new THREE.CanvasTexture(glowCanvas)
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    }))
    sprite.scale.set(7, 7, 1)
    sprite.position.set(0, -0.1, 0)
    midGroup.add(sprite)

    // Mouse
    let tgtRX = 0, tgtRY = 0
    let curRX = 0, curRY = 0
    let mx = 0, my = 0
    const onMouse = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      mx = ((e.clientX - rect.left) / W - 0.5) * 2
      my = ((e.clientY - rect.top) / H - 0.5) * 2
      tgtRY = mx * 0.35
      tgtRX = -my * 0.25
    }
    window.addEventListener('mousemove', onMouse)

    // Resize
    const onResize = () => {
      W = el.clientWidth
      H = el.clientHeight
      camera.aspect = W / H
      camera.updateProjectionMatrix()
      renderer.setSize(W, H)
    }
    window.addEventListener('resize', onResize)

    // Animate
    let time = 0
    const clock = new THREE.Clock()

    const animate = () => {
      const dt = clock.getDelta()
      time += dt

      // Update all shader uniforms
      ;[backGroup, midGroup, frontGroup].forEach(g => {
        g.children.forEach(child => {
          if ((child as any).material?.uniforms?.uTime) {
            (child as any).material.uniforms.uTime.value = time
          }
        })
      })

      // Smooth mouse interpolation
      curRX += (tgtRX - curRX) * 0.04
      curRY += (tgtRY - curRY) * 0.04

      // Global slow rotation
      brainPivot.rotation.y = time * 0.05 + curRY
      brainPivot.rotation.x = Math.sin(time * 0.12) * 0.04 + curRX
      brainPivot.rotation.z = Math.sin(time * 0.08) * 0.015

      // PARALLAX: each layer shifts differently based on mouse
      // Back moves least, front moves most → creates depth perception
      backGroup.position.x = mx * 0.05
      backGroup.position.y = -my * 0.03

      midGroup.position.x = mx * 0.15
      midGroup.position.y = -my * 0.1

      frontGroup.position.x = mx * 0.35
      frontGroup.position.y = -my * 0.25

      // Breathing
      const breathe = 1.0 + Math.sin(time * 0.4) * 0.012
      brainPivot.scale.setScalar(breathe)

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  )
}
