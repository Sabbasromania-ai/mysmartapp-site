import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/* ================================================================
   FULL-SCREEN 3D Neural Brain — Three.js WebGL
   
   Real brain shape via SDF (two hemispheres, temporal lobes,
   frontal, occipital, cerebellum, brain stem, fissure).
   Organic curved connections via cubic bezier tubes.
   Simplex noise for organic vertex animation.
   3 depth layers with parallax + mouse interaction.
   Positioned right-of-center, large and immersive.
   ================================================================ */

// ======== SIMPLEX NOISE (compact 3D implementation) ========
const F3 = 1.0 / 3.0
const G3 = 1.0 / 6.0
const grad3 = [
  [1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
  [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
  [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1],
]
const perm = new Uint8Array(512)
const permMod12 = new Uint8Array(512)
;(function initPerm() {
  const p = new Uint8Array(256)
  for (let i = 0; i < 256; i++) p[i] = i
  for (let i = 255; i > 0; i--) {
    const j = Math.floor((i + 1) * 0.618033988 * (i + 1)) % (i + 1)
    const tmp = p[i]; p[i] = p[j]; p[j] = tmp
  }
  for (let i = 0; i < 512; i++) {
    perm[i] = p[i & 255]
    permMod12[i] = perm[i] % 12
  }
})()

function simplex3(x: number, y: number, z: number): number {
  const s = (x + y + z) * F3
  const i = Math.floor(x + s), j = Math.floor(y + s), k = Math.floor(z + s)
  const t = (i + j + k) * G3
  const X0 = i - t, Y0 = j - t, Z0 = k - t
  const x0 = x - X0, y0 = y - Y0, z0 = z - Z0
  let i1: number, j1: number, k1: number, i2: number, j2: number, k2: number
  if (x0 >= y0) {
    if (y0 >= z0) { i1=1;j1=0;k1=0;i2=1;j2=1;k2=0 }
    else if (x0 >= z0) { i1=1;j1=0;k1=0;i2=1;j2=0;k2=1 }
    else { i1=0;j1=0;k1=1;i2=1;j2=0;k2=1 }
  } else {
    if (y0 < z0) { i1=0;j1=0;k1=1;i2=0;j2=1;k2=1 }
    else if (x0 < z0) { i1=0;j1=1;k1=0;i2=0;j2=1;k2=1 }
    else { i1=0;j1=1;k1=0;i2=1;j2=1;k2=0 }
  }
  const x1=x0-i1+G3, y1=y0-j1+G3, z1=z0-k1+G3
  const x2=x0-i2+2*G3, y2=y0-j2+2*G3, z2=z0-k2+2*G3
  const x3=x0-1+3*G3, y3=y0-1+3*G3, z3=z0-1+3*G3
  const ii=i&255, jj=j&255, kk=k&255
  let n0=0, n1=0, n2=0, n3=0
  let t0 = 0.6 - x0*x0 - y0*y0 - z0*z0
  if (t0 >= 0) { t0 *= t0; const gi = permMod12[ii+perm[jj+perm[kk]]]; n0 = t0*t0*(grad3[gi][0]*x0+grad3[gi][1]*y0+grad3[gi][2]*z0) }
  let t1 = 0.6 - x1*x1 - y1*y1 - z1*z1
  if (t1 >= 0) { t1 *= t1; const gi = permMod12[ii+i1+perm[jj+j1+perm[kk+k1]]]; n1 = t1*t1*(grad3[gi][0]*x1+grad3[gi][1]*y1+grad3[gi][2]*z1) }
  let t2 = 0.6 - x2*x2 - y2*y2 - z2*z2
  if (t2 >= 0) { t2 *= t2; const gi = permMod12[ii+i2+perm[jj+j2+perm[kk+k2]]]; n2 = t2*t2*(grad3[gi][0]*x2+grad3[gi][1]*y2+grad3[gi][2]*z2) }
  let t3 = 0.6 - x3*x3 - y3*y3 - z3*z3
  if (t3 >= 0) { t3 *= t3; const gi = permMod12[ii+1+perm[jj+1+perm[kk+1]]]; n3 = t3*t3*(grad3[gi][0]*x3+grad3[gi][1]*y3+grad3[gi][2]*z3) }
  return 32 * (n0 + n1 + n2 + n3)
}

// ======== BRAIN SDF ========
function sdEllipsoid(px: number, py: number, pz: number, rx: number, ry: number, rz: number): number {
  const k = Math.sqrt((px/rx)**2 + (py/ry)**2 + (pz/rz)**2)
  return (k - 1.0) * Math.min(rx, ry, rz)
}

function smoothMin(a: number, b: number, k: number): number {
  const h = Math.max(k - Math.abs(a - b), 0) / k
  return Math.min(a, b) - h * h * h * k / 6
}

function brainSDF(x: number, y: number, z: number): number {
  // Right hemisphere
  const rh = sdEllipsoid(x - 0.52, y - 0.05, z + 0.08, 1.15, 1.08, 1.35)
  // Left hemisphere
  const lh = sdEllipsoid(x + 0.52, y - 0.05, z + 0.08, 1.15, 1.08, 1.35)
  let d = smoothMin(rh, lh, 0.55)

  // Frontal lobe
  d = smoothMin(d, sdEllipsoid(x, y + 0.18, z + 1.1, 0.88, 0.72, 0.62), 0.45)

  // Temporal lobes
  d = smoothMin(d, sdEllipsoid(x - 1.02, y - 0.48, z + 0.38, 0.58, 0.48, 0.78), 0.38)
  d = smoothMin(d, sdEllipsoid(x + 1.02, y - 0.48, z + 0.38, 0.58, 0.48, 0.78), 0.38)

  // Occipital
  d = smoothMin(d, sdEllipsoid(x, y + 0.02, z - 1.12, 0.72, 0.68, 0.58), 0.45)

  // Cerebellum
  d = smoothMin(d, sdEllipsoid(x - 0.36, y - 0.88, z - 0.72, 0.58, 0.36, 0.48), 0.22)
  d = smoothMin(d, sdEllipsoid(x + 0.36, y - 0.88, z - 0.72, 0.58, 0.36, 0.48), 0.22)

  // Brain stem
  const stemR = Math.sqrt(x * x + (z + 0.28) * (z + 0.28))
  d = smoothMin(d, Math.max(stemR - 0.2, -(y + 0.7), y + 1.65), 0.28)

  // Interhemispheric fissure
  const fissureMask = Math.max(0, 1.0 - Math.abs(y - 0.2) * 2.5)
  const fissureDepth = Math.max(0, 0.08 - Math.abs(x)) * fissureMask
  d = Math.max(d, fissureDepth * 0.6)

  return d
}

// ======== NODE GENERATION ========
interface BrainNode {
  x: number; y: number; z: number
  depth: number    // 0..1
  layer: 0 | 1 | 2
  region: number
  surfaceDist: number
}

const REGIONS = [
  [0.52, 0, 0.08],    // 0 right hemisphere
  [-0.52, 0, 0.08],   // 1 left hemisphere
  [0, 0.18, 1.0],     // 2 frontal
  [1.02, -0.48, 0.38],// 3 right temporal
  [-1.02, -0.48, 0.38],// 4 left temporal
  [0, 0.02, -1.12],   // 5 occipital
  [0, -0.88, -0.72],  // 6 cerebellum
  [0, -1.2, -0.28],   // 7 brain stem
]

function generateNodes(count: number): BrainNode[] {
  const nodes: BrainNode[] = []
  let att = 0
  while (nodes.length < count && att < 120000) {
    att++
    const x = (Math.random() - 0.5) * 4.5
    const y = (Math.random() - 0.5) * 4.5
    const z = (Math.random() - 0.5) * 4.5
    const sdf = brainSDF(x, y, z)
    if (sdf > 0) continue

    const sd = Math.abs(sdf)
    // Surface bias: keep more nodes near surface
    if (sd > 0.35 && Math.random() < 0.65) continue

    const depth = Math.max(0, Math.min(1, (z + 2.0) / 4.0))
    const layer: 0 | 1 | 2 = depth < 0.33 ? 0 : depth < 0.66 ? 1 : 2

    let minD = Infinity, region = 0
    for (let r = 0; r < REGIONS.length; r++) {
      const dx = x - REGIONS[r][0], dy = y - REGIONS[r][1], dz = z - REGIONS[r][2]
      const d2 = dx*dx + dy*dy + dz*dz
      if (d2 < minD) { minD = d2; region = r }
    }
    nodes.push({ x, y, z, depth, layer, region, surfaceDist: sd })
  }
  return nodes
}

// ======== ORGANIC CURVED CONNECTIONS ========
interface Connection {
  from: number
  to: number
  layer: number
  // 4 control points for cubic bezier (stored as flat array of 12 floats)
  curve: Float32Array
}

function buildConnections(nodes: BrainNode[]): Connection[] {
  const conns: Connection[] = []
  const maxPerNode = 4
  const counts = new Uint8Array(nodes.length)

  // Spatial hash
  const cellSize = 0.9
  const grid = new Map<string, number[]>()
  for (let i = 0; i < nodes.length; i++) {
    const key = `${Math.floor(nodes[i].x/cellSize)},${Math.floor(nodes[i].y/cellSize)},${Math.floor(nodes[i].z/cellSize)}`
    if (!grid.has(key)) grid.set(key, [])
    grid.get(key)!.push(i)
  }

  for (let i = 0; i < nodes.length; i++) {
    if (counts[i] >= maxPerNode) continue
    const n = nodes[i]
    const gx = Math.floor(n.x / cellSize)
    const gy = Math.floor(n.y / cellSize)
    const gz = Math.floor(n.z / cellSize)

    const candidates: [number, number][] = []
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          const key = `${gx+dx},${gy+dy},${gz+dz}`
          const cell = grid.get(key)
          if (!cell) continue
          for (const j of cell) {
            if (j <= i || counts[j] >= maxPerNode) continue
            const ddx = n.x - nodes[j].x
            const ddy = n.y - nodes[j].y
            const ddz = n.z - nodes[j].z
            const dist = Math.sqrt(ddx*ddx + ddy*ddy + ddz*ddz)
            if (dist > 0.85) continue

            // Prefer same region or adjacent
            const rDiff = Math.abs(n.region - nodes[j].region)
            if (rDiff > 2 && Math.random() > 0.08) continue

            candidates.push([j, dist])
          }
        }
      }
    }

    candidates.sort((a, b) => a[1] - b[1])
    let taken = 0
    for (const [j, dist] of candidates) {
      if (taken >= 3 || counts[i] >= maxPerNode) break
      if (counts[j] >= maxPerNode) continue

      const prob = nodes[i].layer === nodes[j].layer ? 0.88 : 0.22
      if (Math.random() > prob) continue

      // Build organic cubic bezier curve
      const a = nodes[i], b = nodes[j]
      const mx = (a.x + b.x) / 2
      const my = (a.y + b.y) / 2
      const mz = (a.z + b.z) / 2

      // Perpendicular offset for curve
      let px = -(b.y - a.y), py = (b.x - a.x), pz = 0
      const pl = Math.sqrt(px*px + py*py + pz*pz) + 0.001
      px /= pl; py /= pl

      // Cross product for second perpendicular
      const dx2 = b.x - a.x, dy2 = b.y - a.y, dz2 = b.z - a.z
      let cx = py * dz2 - pz * dy2
      let cy = pz * dx2 - px * dz2
      let cz = px * dy2 - py * dx2
      const cl = Math.sqrt(cx*cx + cy*cy + cz*cz) + 0.001
      cx /= cl; cy /= cl; cz /= cl

      const curvature = dist * (0.15 + Math.random() * 0.25)
      const angle1 = Math.random() * Math.PI * 2
      const angle2 = Math.random() * Math.PI * 2

      const off1x = (px * Math.cos(angle1) + cx * Math.sin(angle1)) * curvature
      const off1y = (py * Math.cos(angle1) + cy * Math.sin(angle1)) * curvature
      const off1z = (pz * Math.cos(angle1) + cz * Math.sin(angle1)) * curvature

      const off2x = (px * Math.cos(angle2) + cx * Math.sin(angle2)) * curvature * 0.8
      const off2y = (py * Math.cos(angle2) + cy * Math.sin(angle2)) * curvature * 0.8
      const off2z = (pz * Math.cos(angle2) + cz * Math.sin(angle2)) * curvature * 0.8

      const curve = new Float32Array(12)
      curve[0] = a.x; curve[1] = a.y; curve[2] = a.z
      curve[3] = a.x + (b.x - a.x) * 0.33 + off1x
      curve[4] = a.y + (b.y - a.y) * 0.33 + off1y
      curve[5] = a.z + (b.z - a.z) * 0.33 + off1z
      curve[6] = a.x + (b.x - a.x) * 0.66 + off2x
      curve[7] = a.y + (b.y - a.y) * 0.66 + off2y
      curve[8] = a.z + (b.z - a.z) * 0.66 + off2z
      curve[9] = b.x; curve[10] = b.y; curve[11] = b.z

      conns.push({ from: i, to: j, layer: n.layer, curve })
      counts[i]++; counts[j]++; taken++
    }
  }
  return conns
}

// Evaluate cubic bezier
function cubicBezier(curve: Float32Array, t: number): [number, number, number] {
  const t2 = t * t, t3 = t2 * t
  const mt = 1 - t, mt2 = mt * mt, mt3 = mt2 * mt
  const b0 = mt3, b1 = 3 * mt2 * t, b2 = 3 * mt * t2, b3 = t3
  return [
    b0*curve[0] + b1*curve[3] + b2*curve[6] + b3*curve[9],
    b0*curve[1] + b1*curve[4] + b2*curve[7] + b3*curve[10],
    b0*curve[2] + b1*curve[5] + b2*curve[8] + b3*curve[11],
  ]
}

// ======== MAIN COMPONENT ========
export default function NeuralBrain3D() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    let W = el.clientWidth
    let H = el.clientHeight
    if (W === 0 || H === 0) return

    // ---- Scene setup ----
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(70, W / H, 0.1, 100)
    camera.position.set(-0.8, 0.15, 4.2)
    camera.lookAt(0.5, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    // ---- Brain pivot (positioned right-center, scaled up) ----
    const brainPivot = new THREE.Group()
    brainPivot.position.set(0.9, -0.05, 0)
    brainPivot.scale.setScalar(1.4)

    const backGroup = new THREE.Group()
    const midGroup = new THREE.Group()
    const frontGroup = new THREE.Group()
    brainPivot.add(backGroup, midGroup, frontGroup)
    scene.add(brainPivot)

    // ---- Generate brain structure ----
    const nodes = generateNodes(320)
    const connections = buildConnections(nodes)

    const layerNodes = [
      nodes.filter(n => n.layer === 0),
      nodes.filter(n => n.layer === 1),
      nodes.filter(n => n.layer === 2),
    ]
    const layerConns = [
      connections.filter(c => c.layer === 0),
      connections.filter(c => c.layer === 1),
      connections.filter(c => c.layer === 2),
    ]
    const groups = [backGroup, midGroup, frontGroup]

    // ---- Layer visual configs ----
    const layerCfg = [
      { sizeMin: 0.012, sizeMax: 0.026, alphaMin: 0.07, alphaMax: 0.2,
        colorFar: 'vec3(0.08,0.1,0.42)', colorNear: 'vec3(0.12,0.22,0.55)',
        lineAlpha: 0.06, lineColor: [0.06,0.15,0.5],
        segsPerConn: 8 },
      { sizeMin: 0.025, sizeMax: 0.055, alphaMin: 0.2, alphaMax: 0.5,
        colorFar: 'vec3(0.05,0.32,0.78)', colorNear: 'vec3(0.0,0.52,1.0)',
        lineAlpha: 0.14, lineColor: [0.0,0.4,0.9],
        segsPerConn: 10 },
      { sizeMin: 0.05, sizeMax: 0.115, alphaMin: 0.5, alphaMax: 1.0,
        colorFar: 'vec3(0.0,0.55,1.0)', colorNear: 'vec3(0.5,0.92,1.0)',
        lineAlpha: 0.24, lineColor: [0.1,0.65,1.0],
        segsPerConn: 12 },
    ]

    // Store references for animation
    const nodeGeos: THREE.BufferGeometry[] = []
    const nodeMats: THREE.ShaderMaterial[] = []
    const lineGeos: THREE.BufferGeometry[] = []
    const lineMats: THREE.ShaderMaterial[] = []

    const PR = renderer.getPixelRatio()

    // ---- Build each layer ----
    for (let lid = 0; lid < 3; lid++) {
      const cfg = layerCfg[lid]
      const ln = layerNodes[lid]
      const lc = layerConns[lid]
      const grp = groups[lid]

      if (!ln.length) continue

      // === NODES ===
      const nCount = ln.length
      const pos = new Float32Array(nCount * 3)
      const basePos = new Float32Array(nCount * 3) // for noise animation
      const sizes = new Float32Array(nCount)
      const alphas = new Float32Array(nCount)
      const depths = new Float32Array(nCount)

      for (let i = 0; i < nCount; i++) {
        const n = ln[i]
        pos[i*3] = n.x; pos[i*3+1] = n.y; pos[i*3+2] = n.z
        basePos[i*3] = n.x; basePos[i*3+1] = n.y; basePos[i*3+2] = n.z
        sizes[i] = cfg.sizeMin + n.depth * (cfg.sizeMax - cfg.sizeMin)
        alphas[i] = cfg.alphaMin + n.depth * (cfg.alphaMax - cfg.alphaMin)
        depths[i] = n.depth
      }

      const nodeGeo = new THREE.BufferGeometry()
      nodeGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      nodeGeo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
      nodeGeo.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1))
      nodeGeo.setAttribute('aDepth', new THREE.BufferAttribute(depths, 1))
      ;(nodeGeo as any)._basePos = basePos

      const nodeMat = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 }, uPR: { value: PR } },
        vertexShader: `
          attribute float aSize; attribute float aAlpha; attribute float aDepth;
          varying float vAlpha; varying float vDepth;
          uniform float uPR;
          void main() {
            vAlpha = aAlpha; vDepth = aDepth;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = aSize * 550.0 * uPR * (1.0 / -mv.z);
          }
        `,
        fragmentShader: `
          varying float vAlpha; varying float vDepth;
          void main() {
            float d = length(gl_PointCoord - 0.5) * 2.0;
            if (d > 1.0) discard;
            float core = smoothstep(0.38, 0.0, d);
            float glow = pow(max(1.0 - d, 0.0), 3.0) * 0.22;
            vec3 colFar = ${cfg.colorFar};
            vec3 colNear = ${cfg.colorNear};
            vec3 col = mix(colFar, colNear, vDepth);
            gl_FragColor = vec4(col, (core + glow) * vAlpha);
          }
        `,
      })

      grp.add(new THREE.Points(nodeGeo, nodeMat))
      nodeGeos.push(nodeGeo)
      nodeMats.push(nodeMat)

      // === CURVED CONNECTIONS ===
      if (lc.length === 0) continue

      const segs = cfg.segsPerConn
      const totalVerts = lc.length * (segs + 1)
      const linePos = new Float32Array(totalVerts * 3)
      const lineBasePos = new Float32Array(totalVerts * 3)
      const lineAlphas = new Float32Array(totalVerts)

      // Index buffer for line segments
      const indices: number[] = []

      for (let ci = 0; ci < lc.length; ci++) {
        const conn = lc[ci]
        const baseIdx = ci * (segs + 1)

        for (let si = 0; si <= segs; si++) {
          const t = si / segs
          const [bx, by, bz] = cubicBezier(conn.curve, t)
          const vi = baseIdx + si
          linePos[vi*3] = bx; linePos[vi*3+1] = by; linePos[vi*3+2] = bz
          lineBasePos[vi*3] = bx; lineBasePos[vi*3+1] = by; lineBasePos[vi*3+2] = bz

          // Alpha: fade at ends, brighter in middle
          const edgeFade = t < 0.15 ? t / 0.15 : t > 0.85 ? (1 - t) / 0.15 : 1.0
          lineAlphas[vi] = cfg.lineAlpha * edgeFade

          if (si < segs) {
            indices.push(baseIdx + si, baseIdx + si + 1)
          }
        }
      }

      const lineGeo = new THREE.BufferGeometry()
      lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3))
      lineGeo.setAttribute('aAlpha', new THREE.BufferAttribute(lineAlphas, 1))
      lineGeo.setIndex(indices)
      ;(lineGeo as any)._basePos = lineBasePos

      const lr = cfg.lineColor[0], lg = cfg.lineColor[1], lb = cfg.lineColor[2]
      const lineMat = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          attribute float aAlpha; varying float vA;
          void main() {
            vA = aAlpha;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying float vA;
          void main() { gl_FragColor = vec4(${lr.toFixed(2)}, ${lg.toFixed(2)}, ${lb.toFixed(2)}, vA); }
        `,
      })

      grp.add(new THREE.LineSegments(lineGeo, lineMat))
      lineGeos.push(lineGeo)
      lineMats.push(lineMat)
    }

    // ---- PULSE SIGNALS ----
    const allConns = [...connections.filter(c => c.layer === 1), ...connections.filter(c => c.layer === 2)]
    const NUM_PULSES = 24
    const pulseProgress = new Float32Array(NUM_PULSES)
    const pulseSpeed = new Float32Array(NUM_PULSES)
    const pulseConnIdx = new Int32Array(NUM_PULSES)

    for (let i = 0; i < NUM_PULSES; i++) {
      pulseProgress[i] = Math.random()
      pulseSpeed[i] = 0.22 + Math.random() * 0.5
      pulseConnIdx[i] = Math.floor(Math.random() * Math.max(1, allConns.length))
    }

    const pulseGeo = new THREE.BufferGeometry()
    const pulsePos = new Float32Array(NUM_PULSES * 3)
    const pulseAlpha = new Float32Array(NUM_PULSES)
    pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePos, 3))
    pulseGeo.setAttribute('aAlpha', new THREE.BufferAttribute(pulseAlpha, 1))

    const pulseMat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uPR: { value: PR } },
      vertexShader: `
        attribute float aAlpha; varying float vA; uniform float uPR;
        void main() {
          vA = aAlpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = 8.0 * uPR * (1.0 / -mv.z);
        }
      `,
      fragmentShader: `
        varying float vA;
        void main() {
          float d = length(gl_PointCoord - 0.5) * 2.0;
          if (d > 1.0) discard;
          float s = pow(1.0 - d, 3.5);
          gl_FragColor = vec4(0.5, 0.96, 1.0, s * vA);
        }
      `,
    })
    frontGroup.add(new THREE.Points(pulseGeo, pulseMat))

    // ---- Subtle central glow ----
    const gc = document.createElement('canvas')
    gc.width = 128; gc.height = 128
    const gx = gc.getContext('2d')!
    const grad = gx.createRadialGradient(64, 64, 0, 64, 64, 64)
    grad.addColorStop(0, 'rgba(0,130,255,0.04)')
    grad.addColorStop(0.4, 'rgba(20,40,150,0.015)')
    grad.addColorStop(1, 'rgba(0,0,0,0)')
    gx.fillStyle = grad
    gx.fillRect(0, 0, 128, 128)
    const glowSprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(gc),
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    }))
    glowSprite.scale.set(7, 6, 1)
    glowSprite.position.set(0, -0.1, 0)
    midGroup.add(glowSprite)

    // ---- Mouse tracking ----
    let mx = 0, my = 0, tgtRX = 0, tgtRY = 0, curRX = 0, curRY = 0
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
      tgtRY = mx * 0.22
      tgtRX = -my * 0.14
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

    const noiseScale = 1.8
    const noiseSpeed = 0.35
    const noiseAmp = 0.028

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const dt = Math.min(clock.getDelta(), 0.05)
      time += dt

      const nt = time * noiseSpeed

      // ---- Animate node positions with simplex noise ----
      for (const geo of nodeGeos) {
        const posAttr = geo.attributes.position as THREE.BufferAttribute
        const basePos = (geo as any)._basePos as Float32Array
        const arr = posAttr.array as Float32Array
        for (let i = 0; i < posAttr.count; i++) {
          const bx = basePos[i*3], by = basePos[i*3+1], bz = basePos[i*3+2]
          arr[i*3]   = bx + simplex3(bx * noiseScale, by * noiseScale, nt) * noiseAmp
          arr[i*3+1] = by + simplex3(by * noiseScale, bz * noiseScale, nt + 100) * noiseAmp
          arr[i*3+2] = bz + simplex3(bz * noiseScale, bx * noiseScale, nt + 200) * noiseAmp
        }
        posAttr.needsUpdate = true
      }

      // ---- Animate connection vertices with noise ----
      for (const geo of lineGeos) {
        const posAttr = geo.attributes.position as THREE.BufferAttribute
        const basePos = (geo as any)._basePos as Float32Array
        const arr = posAttr.array as Float32Array
        for (let i = 0; i < posAttr.count; i++) {
          const bx = basePos[i*3], by = basePos[i*3+1], bz = basePos[i*3+2]
          arr[i*3]   = bx + simplex3(bx * noiseScale, by * noiseScale, nt) * noiseAmp
          arr[i*3+1] = by + simplex3(by * noiseScale, bz * noiseScale, nt + 100) * noiseAmp
          arr[i*3+2] = bz + simplex3(bz * noiseScale, bx * noiseScale, nt + 200) * noiseAmp
        }
        posAttr.needsUpdate = true
      }

      // ---- Mouse smoothing ----
      curRX += (tgtRX - curRX) * 0.03
      curRY += (tgtRY - curRY) * 0.03

      // ---- Rotation ----
      brainPivot.rotation.y = time * 0.032 + curRY
      brainPivot.rotation.x = Math.sin(time * 0.07) * 0.02 + curRX
      brainPivot.rotation.z = Math.sin(time * 0.05) * 0.006

      // ---- Parallax layers ----
      backGroup.position.set(mx * 0.025, -my * 0.018, 0)
      midGroup.position.set(mx * 0.09, -my * 0.06, 0)
      frontGroup.position.set(mx * 0.26, -my * 0.17, 0)

      // ---- Breathing ----
      brainPivot.scale.setScalar(1.4 + Math.sin(time * 0.28) * 0.01)

      // ---- Pulse signals along curved connections ----
      const pPosAttr = pulseGeo.attributes.position as THREE.BufferAttribute
      const pAlpAttr = pulseGeo.attributes.aAlpha as THREE.BufferAttribute
      for (let i = 0; i < NUM_PULSES; i++) {
        pulseProgress[i] += dt * pulseSpeed[i]
        if (pulseProgress[i] >= 1) {
          pulseProgress[i] = 0
          pulseConnIdx[i] = Math.floor(Math.random() * Math.max(1, allConns.length))
          pulseSpeed[i] = 0.22 + Math.random() * 0.5
        }
        const conn = allConns[pulseConnIdx[i]]
        if (conn) {
          const t = pulseProgress[i]
          const [px, py, pz] = cubicBezier(conn.curve, t)
          pPosAttr.setXYZ(i, px, py, pz)
          const fade = t < 0.12 ? t / 0.12 : t > 0.88 ? (1 - t) / 0.12 : 1
          pAlpAttr.setX(i, fade * 0.9)
        }
      }
      pPosAttr.needsUpdate = true
      pAlpAttr.needsUpdate = true

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
