import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/* ============================================================
   FULL-SCREEN 3D Neural Brain — Three.js WebGL
   
   - Canvas fills entire hero viewport
   - Brain positioned center-right, large scale
   - SDF-based anatomical shape (two hemispheres)
   - 3 depth layers with parallax
   - FOV 70 for strong perspective
   - Foreground: big + bright / Background: small + dim
   - Pulse signals along connections
   - Clean, minimal glow
   ============================================================ */

// ---- SDF helpers ----
function sdEllipsoid(px: number, py: number, pz: number, rx: number, ry: number, rz: number): number {
  const k = Math.sqrt((px * px) / (rx * rx) + (py * py) / (ry * ry) + (pz * pz) / (rz * rz))
  return (k - 1.0) * Math.min(rx, ry, rz)
}

function smoothMin(a: number, b: number, k: number): number {
  const h = Math.max(k - Math.abs(a - b), 0) / k
  return Math.min(a, b) - h * h * h * k / 6
}

// Brain SDF — negative = inside
function brainSDF(x: number, y: number, z: number): number {
  // Two hemispheres
  const rh = sdEllipsoid(x - 0.55, y - 0.05, z + 0.1, 1.2, 1.1, 1.4)
  const lh = sdEllipsoid(x + 0.55, y - 0.05, z + 0.1, 1.2, 1.1, 1.4)
  let d = smoothMin(rh, lh, 0.65)

  // Frontal lobe
  const frontal = sdEllipsoid(x, y + 0.2, z + 1.15, 0.9, 0.75, 0.65)
  d = smoothMin(d, frontal, 0.5)

  // Temporal lobes
  const tempR = sdEllipsoid(x - 1.05, y - 0.5, z + 0.35, 0.6, 0.5, 0.8)
  const tempL = sdEllipsoid(x + 1.05, y - 0.5, z + 0.35, 0.6, 0.5, 0.8)
  d = smoothMin(d, tempR, 0.4)
  d = smoothMin(d, tempL, 0.4)

  // Occipital
  const occipital = sdEllipsoid(x, y + 0.05, z - 1.15, 0.75, 0.7, 0.6)
  d = smoothMin(d, occipital, 0.5)

  // Cerebellum
  const cerebR = sdEllipsoid(x - 0.38, y - 0.9, z - 0.75, 0.6, 0.38, 0.5)
  const cerebL = sdEllipsoid(x + 0.38, y - 0.9, z - 0.75, 0.6, 0.38, 0.5)
  d = smoothMin(d, cerebR, 0.25)
  d = smoothMin(d, cerebL, 0.25)

  // Brain stem
  const stemR = Math.sqrt(x * x + (z + 0.3) * (z + 0.3))
  const stem = Math.max(stemR - 0.22, -(y + 0.7), y + 1.7)
  d = smoothMin(d, stem, 0.3)

  // Interhemispheric fissure
  const fissure = Math.max(-Math.abs(x) + 0.07, -(y - 0.35))
  d = Math.max(d, -fissure * 0.18)

  return d
}

interface BrainNode {
  pos: THREE.Vector3
  depth: number      // 0=far, 1=near
  layer: 0 | 1 | 2  // back, mid, front
  region: number
}

const REGIONS = [
  { c: [0.55, 0.0, 0.1], id: 0 },
  { c: [-0.55, 0.0, 0.1], id: 1 },
  { c: [0.0, 0.2, 1.0], id: 2 },
  { c: [1.05, -0.5, 0.35], id: 3 },
  { c: [-1.05, -0.5, 0.35], id: 4 },
  { c: [0.0, 0.05, -1.1], id: 5 },
  { c: [0.0, -0.9, -0.75], id: 6 },
  { c: [0.0, -1.2, -0.3], id: 7 },
]

function generateNodes(count: number): BrainNode[] {
  const nodes: BrainNode[] = []
  let attempts = 0
  while (nodes.length < count && attempts < 80000) {
    attempts++
    const x = (Math.random() - 0.5) * 4.2
    const y = (Math.random() - 0.5) * 4.2
    const z = (Math.random() - 0.5) * 4.2
    const sdf = brainSDF(x, y, z)
    if (sdf > 0) continue
    // Surface bias: thin out deep interior
    if (Math.abs(sdf) > 0.35 && Math.random() < 0.6) continue

    const depth = Math.max(0, Math.min(1, (z + 2.0) / 4.0))
    const layer: 0 | 1 | 2 = depth < 0.33 ? 0 : depth < 0.66 ? 1 : 2

    let minD = Infinity, region = 0
    for (const r of REGIONS) {
      const d = Math.sqrt((x - r.c[0]) ** 2 + (y - r.c[1]) ** 2 + (z - r.c[2]) ** 2)
      if (d < minD) { minD = d; region = r.id }
    }
    nodes.push({ pos: new THREE.Vector3(x, y, z), depth, layer, region })
  }
  return nodes
}

interface Pulse { connIdx: number; progress: number; speed: number }

export default function NeuralBrain3D() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    let W = el.clientWidth
    let H = el.clientHeight
    if (W === 0 || H === 0) return

    // ---- Scene ----
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(70, W / H, 0.1, 100)
    // Brain center-right: offset camera slightly left so brain appears right-of-center
    camera.position.set(-0.6, 0.15, 4.0)
    camera.lookAt(0.4, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    // ---- Groups ----
    const brainPivot = new THREE.Group()
    // Shift brain to right-center of screen
    brainPivot.position.set(0.8, -0.1, 0)
    // Scale brain up — large and immersive
    brainPivot.scale.setScalar(1.35)

    const backGroup = new THREE.Group()
    const midGroup = new THREE.Group()
    const frontGroup = new THREE.Group()
    brainPivot.add(backGroup, midGroup, frontGroup)
    scene.add(brainPivot)

    // ---- Nodes ----
    const nodes = generateNodes(300)
    const backNodes = nodes.filter(n => n.layer === 0)
    const midNodes = nodes.filter(n => n.layer === 1)
    const frontNodes = nodes.filter(n => n.layer === 2)

    // ---- Build layer function ----
    function buildLayer(
      group: THREE.Group,
      layerNodes: BrainNode[],
      sizeRange: [number, number],
      alphaRange: [number, number],
      linkDist: number,
      colorFar: string,
      colorNear: string,
    ) {
      if (!layerNodes.length) return

      const count = layerNodes.length
      const pos = new Float32Array(count * 3)
      const sizes = new Float32Array(count)
      const alphas = new Float32Array(count)
      const depths = new Float32Array(count)

      layerNodes.forEach((n, i) => {
        pos[i * 3] = n.pos.x; pos[i * 3 + 1] = n.pos.y; pos[i * 3 + 2] = n.pos.z
        sizes[i] = sizeRange[0] + n.depth * (sizeRange[1] - sizeRange[0])
        alphas[i] = alphaRange[0] + n.depth * (alphaRange[1] - alphaRange[0])
        depths[i] = n.depth
      })

      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
      geo.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1))
      geo.setAttribute('aDepth', new THREE.BufferAttribute(depths, 1))

      const mat = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 }, uPR: { value: renderer.getPixelRatio() } },
        vertexShader: `
          attribute float aSize; attribute float aAlpha; attribute float aDepth;
          varying float vAlpha; varying float vDepth;
          uniform float uTime; uniform float uPR;
          void main() {
            vAlpha = aAlpha; vDepth = aDepth;
            vec3 p = position;
            p += sin(uTime * 0.5 + p.x * 2.5 + p.y * 1.8 + p.z * 1.3) * 0.018;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = aSize * 520.0 * uPR * (1.0 / -mv.z);
          }
        `,
        fragmentShader: `
          varying float vAlpha; varying float vDepth;
          void main() {
            float d = length(gl_PointCoord - 0.5) * 2.0;
            if (d > 1.0) discard;
            float core = smoothstep(0.4, 0.0, d);
            float glow = pow(max(1.0 - d, 0.0), 2.8) * 0.25;
            vec3 colFar = ${colorFar};
            vec3 colNear = ${colorNear};
            vec3 col = mix(colFar, colNear, vDepth);
            gl_FragColor = vec4(col, (core + glow) * vAlpha);
          }
        `,
      })
      group.add(new THREE.Points(geo, mat))

      // ---- Connections ----
      const lPos: number[] = []
      const lAlpha: number[] = []
      for (let i = 0; i < layerNodes.length; i++) {
        for (let j = i + 1; j < layerNodes.length; j++) {
          const dist = layerNodes[i].pos.distanceTo(layerNodes[j].pos)
          if (dist > linkDist) continue
          const rDiff = Math.abs(layerNodes[i].region - layerNodes[j].region)
          if (rDiff > 2 && Math.random() > 0.06) continue
          lPos.push(
            layerNodes[i].pos.x, layerNodes[i].pos.y, layerNodes[i].pos.z,
            layerNodes[j].pos.x, layerNodes[j].pos.y, layerNodes[j].pos.z,
          )
          const avg = (layerNodes[i].depth + layerNodes[j].depth) / 2
          const a = (1 - dist / linkDist) * (alphaRange[0] + avg * (alphaRange[1] - alphaRange[0])) * 0.45
          lAlpha.push(a, a)
        }
      }
      if (lPos.length) {
        const lGeo = new THREE.BufferGeometry()
        lGeo.setAttribute('position', new THREE.Float32BufferAttribute(lPos, 3))
        lGeo.setAttribute('aAlpha', new THREE.Float32BufferAttribute(lAlpha, 1))
        const lMat = new THREE.ShaderMaterial({
          transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
          uniforms: { uTime: { value: 0 } },
          vertexShader: `
            attribute float aAlpha; varying float vA; uniform float uTime;
            void main() {
              vA = aAlpha;
              vec3 p = position + sin(uTime * 0.35 + position.x * 3.0) * 0.01;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
            }
          `,
          fragmentShader: `varying float vA; void main() { gl_FragColor = vec4(0.1, 0.7, 1.0, vA); }`,
        })
        group.add(new THREE.LineSegments(lGeo, lMat))
      }
    }

    // Back layer: tiny, dim, deep blue
    buildLayer(backGroup, backNodes,
      [0.01, 0.025], [0.06, 0.18], 1.0,
      'vec3(0.1, 0.12, 0.45)', 'vec3(0.15, 0.25, 0.6)'
    )
    // Mid layer: medium
    buildLayer(midGroup, midNodes,
      [0.028, 0.058], [0.22, 0.5], 0.85,
      'vec3(0.06, 0.35, 0.8)', 'vec3(0.0, 0.55, 1.0)'
    )
    // Front layer: large, bright, cyan-white
    buildLayer(frontGroup, frontNodes,
      [0.05, 0.12], [0.5, 1.0], 0.7,
      'vec3(0.0, 0.6, 1.0)', 'vec3(0.55, 0.95, 1.0)'
    )

    // ---- Cross-layer connections (sparse mid↔front) ----
    const crossPos: number[] = []
    const crossAlpha: number[] = []
    for (const m of midNodes) {
      for (const f of frontNodes) {
        const d = m.pos.distanceTo(f.pos)
        if (d < 0.75 && Math.random() < 0.12) {
          crossPos.push(m.pos.x, m.pos.y, m.pos.z, f.pos.x, f.pos.y, f.pos.z)
          const a = (1 - d / 0.75) * 0.1
          crossAlpha.push(a, a)
        }
      }
    }
    if (crossPos.length) {
      const cGeo = new THREE.BufferGeometry()
      cGeo.setAttribute('position', new THREE.Float32BufferAttribute(crossPos, 3))
      cGeo.setAttribute('aAlpha', new THREE.Float32BufferAttribute(crossAlpha, 1))
      const cMat = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        vertexShader: `attribute float aAlpha; varying float vA; void main() { vA = aAlpha; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `varying float vA; void main() { gl_FragColor = vec4(0.0, 0.7, 1.0, vA); }`,
      })
      midGroup.add(new THREE.LineSegments(cGeo, cMat))
    }

    // ---- PULSE SIGNALS ----
    const allConns: { from: THREE.Vector3; to: THREE.Vector3 }[] = []
    const activeLayers = [...midNodes, ...frontNodes]
    for (let i = 0; i < activeLayers.length; i++) {
      for (let j = i + 1; j < activeLayers.length; j++) {
        if (activeLayers[i].pos.distanceTo(activeLayers[j].pos) < 0.9) {
          allConns.push({ from: activeLayers[i].pos, to: activeLayers[j].pos })
        }
      }
    }

    const NUM_PULSES = 22
    const pulses: Pulse[] = []
    for (let i = 0; i < NUM_PULSES; i++) {
      pulses.push({
        connIdx: Math.floor(Math.random() * Math.max(1, allConns.length)),
        progress: Math.random(),
        speed: 0.25 + Math.random() * 0.55,
      })
    }

    const pulseGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(NUM_PULSES * 3)
    const pAlpha = new Float32Array(NUM_PULSES)
    pulseGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    pulseGeo.setAttribute('aAlpha', new THREE.BufferAttribute(pAlpha, 1))

    const pulseMat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uPR: { value: renderer.getPixelRatio() } },
      vertexShader: `
        attribute float aAlpha; varying float vA; uniform float uPR;
        void main() {
          vA = aAlpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = 7.0 * uPR * (1.0 / -mv.z);
        }
      `,
      fragmentShader: `
        varying float vA;
        void main() {
          float d = length(gl_PointCoord - 0.5) * 2.0;
          if (d > 1.0) discard;
          float s = pow(1.0 - d, 3.0);
          gl_FragColor = vec4(0.45, 0.95, 1.0, s * vA);
        }
      `,
    })
    frontGroup.add(new THREE.Points(pulseGeo, pulseMat))

    // ---- Subtle ambient glow (very low) ----
    const gc = document.createElement('canvas')
    gc.width = 128; gc.height = 128
    const gx = gc.getContext('2d')!
    const grad = gx.createRadialGradient(64, 64, 0, 64, 64, 64)
    grad.addColorStop(0, 'rgba(0,140,255,0.045)')
    grad.addColorStop(0.5, 'rgba(25,40,150,0.015)')
    grad.addColorStop(1, 'rgba(0,0,0,0)')
    gx.fillStyle = grad
    gx.fillRect(0, 0, 128, 128)
    const glowTex = new THREE.CanvasTexture(gc)
    const glowSprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    }))
    glowSprite.scale.set(7, 6, 1)
    glowSprite.position.set(0, -0.1, 0)
    midGroup.add(glowSprite)

    // ---- Mouse tracking ----
    let tgtRX = 0, tgtRY = 0, curRX = 0, curRY = 0, mx = 0, my = 0
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
      tgtRY = mx * 0.25
      tgtRX = -my * 0.15
    }
    window.addEventListener('mousemove', onMouse)

    // ---- Resize ----
    const onResize = () => {
      W = el.clientWidth; H = el.clientHeight
      if (W === 0 || H === 0) return
      camera.aspect = W / H
      camera.updateProjectionMatrix()
      renderer.setSize(W, H)
    }
    window.addEventListener('resize', onResize)

    // ---- Animation loop ----
    let time = 0
    const clock = new THREE.Clock()
    let raf = 0

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const dt = clock.getDelta()
      time += dt

      // Update shader uniforms
      ;[backGroup, midGroup, frontGroup].forEach(g => {
        g.children.forEach(c => {
          const m = (c as any).material
          if (m?.uniforms?.uTime) m.uniforms.uTime.value = time
        })
      })

      // Smooth mouse
      curRX += (tgtRX - curRX) * 0.03
      curRY += (tgtRY - curRY) * 0.03

      // Slow auto-rotation + mouse
      brainPivot.rotation.y = time * 0.035 + curRY
      brainPivot.rotation.x = Math.sin(time * 0.08) * 0.025 + curRX
      brainPivot.rotation.z = Math.sin(time * 0.06) * 0.008

      // Parallax layers — foreground moves more
      backGroup.position.set(mx * 0.03, -my * 0.02, 0)
      midGroup.position.set(mx * 0.1, -my * 0.07, 0)
      frontGroup.position.set(mx * 0.28, -my * 0.18, 0)

      // Breathing
      const baseScale = 1.35
      brainPivot.scale.setScalar(baseScale + Math.sin(time * 0.3) * 0.012)

      // Pulse signals
      const posAttr = pulseGeo.attributes.position as THREE.BufferAttribute
      const alpAttr = pulseGeo.attributes.aAlpha as THREE.BufferAttribute
      for (let i = 0; i < pulses.length; i++) {
        const p = pulses[i]
        p.progress += dt * p.speed
        if (p.progress >= 1) {
          p.progress = 0
          p.connIdx = Math.floor(Math.random() * Math.max(1, allConns.length))
          p.speed = 0.25 + Math.random() * 0.55
        }
        const conn = allConns[p.connIdx]
        if (conn) {
          const t = p.progress
          posAttr.setXYZ(i,
            conn.from.x + (conn.to.x - conn.from.x) * t,
            conn.from.y + (conn.to.y - conn.from.y) * t,
            conn.from.z + (conn.to.z - conn.from.z) * t,
          )
          const fade = t < 0.15 ? t / 0.15 : t > 0.85 ? (1 - t) / 0.15 : 1
          alpAttr.setX(i, fade * 0.85)
        }
      }
      posAttr.needsUpdate = true
      alpAttr.needsUpdate = true

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    />
  )
}
