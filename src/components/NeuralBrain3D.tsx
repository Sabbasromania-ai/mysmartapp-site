import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * 3D Neural Brain — anatomically recognizable abstract brain
 * built from nodes + connections using Three.js WebGL.
 *
 * Shape: SDF-based brain volume with two hemispheres,
 * temporal lobes, frontal bulge, occipital taper, cerebellum,
 * and brain stem. Points are rejection-sampled inside this
 * volume with density bias toward the cortical surface.
 */

// ---- Signed-distance helpers ----
function sdEllipsoid(px: number, py: number, pz: number, rx: number, ry: number, rz: number): number {
  const k = Math.sqrt((px * px) / (rx * rx) + (py * py) / (ry * ry) + (pz * pz) / (rz * rz))
  return (k - 1.0) * Math.min(rx, ry, rz)
}

function smoothMin(a: number, b: number, k: number): number {
  const h = Math.max(k - Math.abs(a - b), 0) / k
  return Math.min(a, b) - h * h * h * k / 6
}

// Brain SDF: returns negative if inside, positive outside
function brainSDF(x: number, y: number, z: number): number {
  // Cerebrum — main mass, two hemispheres
  // Right hemisphere (x > 0)
  const rh = sdEllipsoid(x - 0.55, y - 0.1, z + 0.1, 1.15, 1.05, 1.35)
  // Left hemisphere (x < 0)
  const lh = sdEllipsoid(x + 0.55, y - 0.1, z + 0.1, 1.15, 1.05, 1.35)
  let d = smoothMin(rh, lh, 0.6)

  // Frontal lobe bulge (front, slightly up)
  const frontal = sdEllipsoid(x, y + 0.15, z + 1.1, 0.85, 0.7, 0.6)
  d = smoothMin(d, frontal, 0.5)

  // Temporal lobes (sides, lower)
  const tempR = sdEllipsoid(x - 1.0, y - 0.5, z + 0.4, 0.55, 0.45, 0.75)
  const tempL = sdEllipsoid(x + 1.0, y - 0.5, z + 0.4, 0.55, 0.45, 0.75)
  d = smoothMin(d, tempR, 0.4)
  d = smoothMin(d, tempL, 0.4)

  // Occipital (back)
  const occipital = sdEllipsoid(x, y + 0.0, z - 1.1, 0.7, 0.65, 0.55)
  d = smoothMin(d, occipital, 0.5)

  // Cerebellum (below and back)
  const cerebR = sdEllipsoid(x - 0.35, y - 0.85, z - 0.7, 0.55, 0.35, 0.45)
  const cerebL = sdEllipsoid(x + 0.35, y - 0.85, z - 0.7, 0.55, 0.35, 0.45)
  d = smoothMin(d, cerebR, 0.25)
  d = smoothMin(d, cerebL, 0.25)

  // Brain stem (cylinder going down)
  const stemR = Math.sqrt(x * x + (z + 0.3) * (z + 0.3))
  const stem = Math.max(stemR - 0.2, -(y + 0.7), y + 1.6)
  d = smoothMin(d, stem, 0.3)

  // Interhemispheric fissure — shallow groove on top
  const fissure = Math.max(-Math.abs(x) + 0.06, -(y - 0.3))
  d = Math.max(d, -fissure * 0.15)

  return d
}

interface BrainNode {
  pos: THREE.Vector3
  depth: number
  layer: 0 | 1 | 2
  region: number // cluster id for connection logic
}

function generateBrainNodes(count: number): BrainNode[] {
  const nodes: BrainNode[] = []
  let attempts = 0

  // Region centers for clustering
  const regions = [
    { c: [0.55, 0.0, 0.1], id: 0 },    // right hemisphere
    { c: [-0.55, 0.0, 0.1], id: 1 },   // left hemisphere
    { c: [0.0, 0.15, 1.0], id: 2 },     // frontal
    { c: [1.0, -0.5, 0.4], id: 3 },     // right temporal
    { c: [-1.0, -0.5, 0.4], id: 4 },    // left temporal
    { c: [0.0, 0.0, -1.0], id: 5 },     // occipital
    { c: [0.0, -0.85, -0.7], id: 6 },   // cerebellum
    { c: [0.0, -1.2, -0.3], id: 7 },    // brain stem
  ]

  while (nodes.length < count && attempts < 50000) {
    attempts++
    const x = (Math.random() - 0.5) * 4.0
    const y = (Math.random() - 0.5) * 4.0
    const z = (Math.random() - 0.5) * 4.0

    const sdf = brainSDF(x, y, z)
    if (sdf > 0) continue

    // Bias toward cortical surface: higher density near surface (sdf close to 0)
    const surfaceBias = Math.abs(sdf)
    if (surfaceBias > 0.3 && Math.random() < 0.65) continue // thin out deep interior

    // Depth for camera: z maps to depth (positive z = closer)
    const depth = (z + 2.0) / 4.0
    const clamped = Math.max(0, Math.min(1, depth))
    const layer: 0 | 1 | 2 = clamped < 0.33 ? 0 : clamped < 0.66 ? 1 : 2

    // Find nearest region
    let minDist = Infinity
    let region = 0
    for (const r of regions) {
      const d = Math.sqrt(
        (x - r.c[0]) ** 2 + (y - r.c[1]) ** 2 + (z - r.c[2]) ** 2
      )
      if (d < minDist) { minDist = d; region = r.id }
    }

    nodes.push({ pos: new THREE.Vector3(x, y, z), depth: clamped, layer, region })
  }

  return nodes
}

// Pulse signal data
interface Pulse {
  fromIdx: number
  toIdx: number
  progress: number  // 0..1
  speed: number
}

export default function NeuralBrain3D() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    let W = el.clientWidth
    let H = el.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(68, W / H, 0.1, 100)
    camera.position.set(0, 0.2, 4.2)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    // 3 parallax groups
    const backGroup = new THREE.Group()
    const midGroup = new THREE.Group()
    const frontGroup = new THREE.Group()
    const brainPivot = new THREE.Group()
    brainPivot.add(backGroup, midGroup, frontGroup)
    scene.add(brainPivot)

    // Generate nodes
    const nodes = generateBrainNodes(260)
    const backNodes = nodes.filter(n => n.layer === 0)
    const midNodes = nodes.filter(n => n.layer === 1)
    const frontNodes = nodes.filter(n => n.layer === 2)

    // ---- Build layer ----
    function buildLayer(
      group: THREE.Group,
      layerNodes: BrainNode[],
      sizeMin: number, sizeMax: number,
      alphaMin: number, alphaMax: number,
      linkDist: number,
      colorFar: [number, number, number],
      colorNear: [number, number, number],
    ) {
      if (!layerNodes.length) return

      const geo = new THREE.BufferGeometry()
      const pos = new Float32Array(layerNodes.length * 3)
      const sizes = new Float32Array(layerNodes.length)
      const alphas = new Float32Array(layerNodes.length)
      const depths = new Float32Array(layerNodes.length)

      layerNodes.forEach((n, i) => {
        pos[i * 3] = n.pos.x; pos[i * 3 + 1] = n.pos.y; pos[i * 3 + 2] = n.pos.z
        sizes[i] = sizeMin + n.depth * (sizeMax - sizeMin)
        alphas[i] = alphaMin + n.depth * (alphaMax - alphaMin)
        depths[i] = n.depth
      })

      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
      geo.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1))
      geo.setAttribute('aDepth', new THREE.BufferAttribute(depths, 1))

      const cF = `vec3(${colorFar[0]}, ${colorFar[1]}, ${colorFar[2]})`
      const cN = `vec3(${colorNear[0]}, ${colorNear[1]}, ${colorNear[2]})`

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
            p += sin(uTime * 0.6 + p.x * 2.5 + p.y * 1.8 + p.z * 1.3) * 0.015;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = aSize * 480.0 * uPR * (1.0 / -mv.z);
          }
        `,
        fragmentShader: `
          varying float vAlpha; varying float vDepth;
          void main() {
            float d = length(gl_PointCoord - 0.5) * 2.0;
            if (d > 1.0) discard;
            float core = smoothstep(0.45, 0.0, d);
            float glow = pow(max(1.0 - d, 0.0), 2.5) * 0.3;
            vec3 col = mix(${cF}, ${cN}, vDepth);
            gl_FragColor = vec4(col, (core + glow) * vAlpha);
          }
        `,
      })

      group.add(new THREE.Points(geo, mat))

      // Lines — only connect within same region or adjacent regions
      const lPos: number[] = []
      const lAlpha: number[] = []
      for (let i = 0; i < layerNodes.length; i++) {
        for (let j = i + 1; j < layerNodes.length; j++) {
          const dist = layerNodes[i].pos.distanceTo(layerNodes[j].pos)
          if (dist > linkDist) continue
          // Same region or adjacent region (id diff ≤ 2)
          const rDiff = Math.abs(layerNodes[i].region - layerNodes[j].region)
          if (rDiff > 2 && Math.random() > 0.08) continue
          lPos.push(
            layerNodes[i].pos.x, layerNodes[i].pos.y, layerNodes[i].pos.z,
            layerNodes[j].pos.x, layerNodes[j].pos.y, layerNodes[j].pos.z
          )
          const avg = (layerNodes[i].depth + layerNodes[j].depth) / 2
          const a = (1 - dist / linkDist) * (alphaMin + avg * (alphaMax - alphaMin)) * 0.5
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
              vec3 p = position + sin(uTime * 0.4 + position.x * 3.0) * 0.012;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
            }
          `,
          fragmentShader: `
            varying float vA;
            void main() { gl_FragColor = vec4(0.1, 0.7, 1.0, vA); }
          `,
        })
        group.add(new THREE.LineSegments(lGeo, lMat))
      }
    }

    // Back: tiny, dim, deep blue
    buildLayer(backGroup, backNodes,
      0.012, 0.028, 0.08, 0.2, 1.0,
      [0.12, 0.15, 0.5], [0.18, 0.3, 0.7]
    )
    // Mid: medium
    buildLayer(midGroup, midNodes,
      0.03, 0.06, 0.25, 0.55, 0.85,
      [0.08, 0.4, 0.85], [0.0, 0.6, 1.0]
    )
    // Front: large, bright, cyan-white
    buildLayer(frontGroup, frontNodes,
      0.055, 0.11, 0.55, 1.0, 0.7,
      [0.0, 0.65, 1.0], [0.5, 0.92, 1.0]
    )

    // Cross-layer connections (sparse: mid↔front)
    const crossPos: number[] = []
    const crossAlpha: number[] = []
    for (const m of midNodes) {
      for (const f of frontNodes) {
        const d = m.pos.distanceTo(f.pos)
        if (d < 0.8 && Math.random() < 0.15) {
          crossPos.push(m.pos.x, m.pos.y, m.pos.z, f.pos.x, f.pos.y, f.pos.z)
          const a = (1 - d / 0.8) * 0.12
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
        fragmentShader: `varying float vA; void main() { gl_FragColor = vec4(0.0, 0.72, 1.0, vA); }`,
      })
      midGroup.add(new THREE.LineSegments(cGeo, cMat))
    }

    // ---- PULSE SIGNALS ----
    // Small bright dots that travel along connections suggesting neural activity
    const allConnections: { from: THREE.Vector3; to: THREE.Vector3 }[] = []
    const allNodesFlat = [...midNodes, ...frontNodes]
    for (let i = 0; i < allNodesFlat.length; i++) {
      for (let j = i + 1; j < allNodesFlat.length; j++) {
        const d = allNodesFlat[i].pos.distanceTo(allNodesFlat[j].pos)
        if (d < 0.9) {
          allConnections.push({ from: allNodesFlat[i].pos, to: allNodesFlat[j].pos })
        }
      }
    }

    const MAX_PULSES = 18
    const pulses: Pulse[] = []
    for (let i = 0; i < MAX_PULSES; i++) {
      const idx = Math.floor(Math.random() * allConnections.length)
      pulses.push({
        fromIdx: idx,
        toIdx: idx,
        progress: Math.random(),
        speed: 0.3 + Math.random() * 0.5,
      })
    }

    const pulseGeo = new THREE.BufferGeometry()
    const pulsePos = new Float32Array(MAX_PULSES * 3)
    const pulseAlphas = new Float32Array(MAX_PULSES)
    pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePos, 3))
    pulseGeo.setAttribute('aAlpha', new THREE.BufferAttribute(pulseAlphas, 1))

    const pulseMat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uPR: { value: renderer.getPixelRatio() } },
      vertexShader: `
        attribute float aAlpha; varying float vA; uniform float uPR;
        void main() {
          vA = aAlpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = 6.0 * uPR * (1.0 / -mv.z);
        }
      `,
      fragmentShader: `
        varying float vA;
        void main() {
          float d = length(gl_PointCoord - 0.5) * 2.0;
          if (d > 1.0) discard;
          float s = pow(1.0 - d, 3.0);
          gl_FragColor = vec4(0.4, 0.95, 1.0, s * vA);
        }
      `,
    })
    const pulsePoints = new THREE.Points(pulseGeo, pulseMat)
    frontGroup.add(pulsePoints)

    // Subtle central glow (very low opacity)
    const glowC = document.createElement('canvas')
    glowC.width = 128; glowC.height = 128
    const gCtx = glowC.getContext('2d')!
    const gGrad = gCtx.createRadialGradient(64, 64, 0, 64, 64, 64)
    gGrad.addColorStop(0, 'rgba(0,150,255,0.06)')
    gGrad.addColorStop(0.5, 'rgba(30,50,160,0.02)')
    gGrad.addColorStop(1, 'rgba(0,0,0,0)')
    gCtx.fillStyle = gGrad
    gCtx.fillRect(0, 0, 128, 128)
    const glowTex = new THREE.CanvasTexture(glowC)
    const glowSprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    }))
    glowSprite.scale.set(6, 5, 1)
    glowSprite.position.set(0, -0.1, 0)
    midGroup.add(glowSprite)

    // Mouse
    let tgtRX = 0, tgtRY = 0, curRX = 0, curRY = 0, mx = 0, my = 0
    const onMouse = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      mx = ((e.clientX - r.left) / W - 0.5) * 2
      my = ((e.clientY - r.top) / H - 0.5) * 2
      tgtRY = mx * 0.3
      tgtRX = -my * 0.2
    }
    window.addEventListener('mousemove', onMouse)

    const onResize = () => {
      W = el.clientWidth; H = el.clientHeight
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

      // Update uniforms
      ;[backGroup, midGroup, frontGroup].forEach(g => {
        g.children.forEach(c => {
          const m = (c as any).material
          if (m?.uniforms?.uTime) m.uniforms.uTime.value = time
        })
      })

      // Smooth mouse
      curRX += (tgtRX - curRX) * 0.035
      curRY += (tgtRY - curRY) * 0.035

      // Rotation
      brainPivot.rotation.y = time * 0.04 + curRY
      brainPivot.rotation.x = Math.sin(time * 0.1) * 0.03 + curRX
      brainPivot.rotation.z = Math.sin(time * 0.07) * 0.01

      // Layer parallax
      backGroup.position.set(mx * 0.04, -my * 0.025, 0)
      midGroup.position.set(mx * 0.12, -my * 0.08, 0)
      frontGroup.position.set(mx * 0.3, -my * 0.2, 0)

      // Breathing
      brainPivot.scale.setScalar(1.0 + Math.sin(time * 0.35) * 0.01)

      // Update pulses
      const pPos = pulseGeo.attributes.position as THREE.BufferAttribute
      const pAlpha = pulseGeo.attributes.aAlpha as THREE.BufferAttribute
      for (let i = 0; i < pulses.length; i++) {
        const p = pulses[i]
        p.progress += dt * p.speed
        if (p.progress >= 1) {
          p.progress = 0
          p.fromIdx = Math.floor(Math.random() * allConnections.length)
          p.speed = 0.3 + Math.random() * 0.5
        }
        const conn = allConnections[p.fromIdx]
        if (conn) {
          const t = p.progress
          pPos.setXYZ(i,
            conn.from.x + (conn.to.x - conn.from.x) * t,
            conn.from.y + (conn.to.y - conn.from.y) * t,
            conn.from.z + (conn.to.z - conn.from.z) * t,
          )
          // Fade in/out
          const fade = t < 0.2 ? t / 0.2 : t > 0.8 ? (1 - t) / 0.2 : 1
          pAlpha.setX(i, fade * 0.9)
        }
      }
      pPos.needsUpdate = true
      pAlpha.needsUpdate = true

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
    <div ref={mountRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
  )
}
