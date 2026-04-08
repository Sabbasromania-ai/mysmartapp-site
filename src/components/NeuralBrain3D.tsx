import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/* ================================================================
   3D Neural Brain — CLEAR brain silhouette
   
   Strategy: NO smoothMin blending (that causes blob).
   Instead: hemispheres kept SEPARATE with real gap.
   Points generated on RIGHT side then MIRRORED for symmetry.
   70% surface nodes (outline visible), 30% interior.
   High node count (600+) for clear shape recognition.
   ================================================================ */

// ======== SIMPLEX NOISE ========
const F3 = 1.0 / 3.0, G3 = 1.0 / 6.0
const grad3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]]
const perm = new Uint8Array(512), permMod12 = new Uint8Array(512)
;(function(){const p=new Uint8Array(256);for(let i=0;i<256;i++)p[i]=i;for(let i=255;i>0;i--){const j=Math.floor((i+1)*0.618033988*(i+1))%(i+1);const t=p[i];p[i]=p[j];p[j]=t}for(let i=0;i<512;i++){perm[i]=p[i&255];permMod12[i]=perm[i]%12}})()

function simplex3(x: number, y: number, z: number): number {
  const s=(x+y+z)*F3,i=Math.floor(x+s),j=Math.floor(y+s),k=Math.floor(z+s)
  const t=(i+j+k)*G3,x0=x-(i-t),y0=y-(j-t),z0=z-(k-t)
  let i1:number,j1:number,k1:number,i2:number,j2:number,k2:number
  if(x0>=y0){if(y0>=z0){i1=1;j1=0;k1=0;i2=1;j2=1;k2=0}else if(x0>=z0){i1=1;j1=0;k1=0;i2=1;j2=0;k2=1}else{i1=0;j1=0;k1=1;i2=1;j2=0;k2=1}}else{if(y0<z0){i1=0;j1=0;k1=1;i2=0;j2=1;k2=1}else if(x0<z0){i1=0;j1=1;k1=0;i2=0;j2=1;k2=1}else{i1=0;j1=1;k1=0;i2=1;j2=1;k2=0}}
  const x1=x0-i1+G3,y1=y0-j1+G3,z1=z0-k1+G3,x2=x0-i2+2*G3,y2=y0-j2+2*G3,z2=z0-k2+2*G3,x3=x0-1+3*G3,y3=y0-1+3*G3,z3=z0-1+3*G3
  const ii=i&255,jj=j&255,kk=k&255
  let n0=0,n1=0,n2=0,n3=0
  let t0=0.6-x0*x0-y0*y0-z0*z0;if(t0>=0){t0*=t0;const g=permMod12[ii+perm[jj+perm[kk]]];n0=t0*t0*(grad3[g][0]*x0+grad3[g][1]*y0+grad3[g][2]*z0)}
  let t1=0.6-x1*x1-y1*y1-z1*z1;if(t1>=0){t1*=t1;const g=permMod12[ii+i1+perm[jj+j1+perm[kk+k1]]];n1=t1*t1*(grad3[g][0]*x1+grad3[g][1]*y1+grad3[g][2]*z1)}
  let t2=0.6-x2*x2-y2*y2-z2*z2;if(t2>=0){t2*=t2;const g=permMod12[ii+i2+perm[jj+j2+perm[kk+k2]]];n2=t2*t2*(grad3[g][0]*x2+grad3[g][1]*y2+grad3[g][2]*z2)}
  let t3=0.6-x3*x3-y3*y3-z3*z3;if(t3>=0){t3*=t3;const g=permMod12[ii+1+perm[jj+1+perm[kk+1]]];n3=t3*t3*(grad3[g][0]*x3+grad3[g][1]*y3+grad3[g][2]*z3)}
  return 32*(n0+n1+n2+n3)
}

// ======== BRAIN SHAPE — separate parts, NO blob merging ========

// Test if point is inside a specific ellipsoid
function insideEllipsoid(
  px: number, py: number, pz: number,
  cx: number, cy: number, cz: number,
  rx: number, ry: number, rz: number,
): number {
  // Returns how deep inside (negative = inside, 0 = surface, positive = outside)
  const nx = (px - cx) / rx, ny = (py - cy) / ry, nz = (pz - cz) / rz
  return Math.sqrt(nx*nx + ny*ny + nz*nz) - 1.0
}

// Brain part definitions — each is an independent ellipsoid
// We test membership separately to preserve clear boundaries
interface BrainPart {
  cx: number; cy: number; cz: number
  rx: number; ry: number; rz: number
  id: number  // region ID
}

// Right hemisphere parts (will be mirrored for left)
const RIGHT_PARTS: BrainPart[] = [
  // Main cerebrum — right hemisphere
  { cx: 0.58, cy: 0.05, cz: 0.0,   rx: 0.95, ry: 0.98, rz: 1.25, id: 0 },
  // Frontal lobe extension
  { cx: 0.35, cy: 0.3,  cz: 0.85,  rx: 0.55, ry: 0.55, rz: 0.5,  id: 1 },
  // Temporal lobe
  { cx: 0.85, cy: -0.4, cz: 0.3,   rx: 0.45, ry: 0.38, rz: 0.65, id: 2 },
  // Occipital
  { cx: 0.35, cy: 0.1,  cz: -0.95, rx: 0.5,  ry: 0.55, rz: 0.45, id: 3 },
]

// Midline parts (not mirrored)
const MID_PARTS: BrainPart[] = [
  // Cerebellum right
  { cx: 0.3,  cy: -0.82, cz: -0.6,  rx: 0.45, ry: 0.28, rz: 0.38, id: 4 },
  // Cerebellum left
  { cx: -0.3, cy: -0.82, cz: -0.6,  rx: 0.45, ry: 0.28, rz: 0.38, id: 4 },
  // Brain stem
  { cx: 0.0,  cy: -1.1,  cz: -0.25, rx: 0.18, ry: 0.35, rz: 0.18, id: 5 },
]

// Generate LEFT_PARTS by mirroring RIGHT_PARTS
const LEFT_PARTS: BrainPart[] = RIGHT_PARTS.map(p => ({
  cx: -p.cx, cy: p.cy, cz: p.cz,
  rx: p.rx, ry: p.ry, rz: p.rz,
  id: p.id + 10, // offset ID so left and right don't cross-connect
}))

const ALL_PARTS = [...RIGHT_PARTS, ...LEFT_PARTS, ...MID_PARTS]

// Test if a point is inside ANY brain part. Returns [isInside, distToSurface, partId]
function brainTest(x: number, y: number, z: number): [boolean, number, number] {
  let bestDist = Infinity
  let bestId = -1
  for (const p of ALL_PARTS) {
    const d = insideEllipsoid(x, y, z, p.cx, p.cy, p.cz, p.rx, p.ry, p.rz)
    if (d < bestDist) {
      bestDist = d
      bestId = p.id
    }
  }
  // Enforce interhemispheric fissure: reject points too close to midline
  // in the upper cerebrum region (not in cerebellum/stem)
  if (Math.abs(x) < 0.12 && y > -0.5 && bestDist < 0) {
    // The closer to midline, the harder to accept
    const fissureReject = (0.12 - Math.abs(x)) / 0.12
    if (fissureReject > 0.3) return [false, bestDist, bestId]
  }
  return [bestDist <= 0, bestDist, bestId]
}

// ======== NODE GENERATION — symmetrical, surface-biased ========
interface BrainNode {
  x: number; y: number; z: number
  depth: number
  layer: 0 | 1 | 2
  region: number
  surfaceDist: number
}

function generateNodes(): BrainNode[] {
  const nodes: BrainNode[] = []

  // Strategy: generate on RIGHT side + midline, then mirror right→left

  // 1. Generate right hemisphere + midline nodes
  const rightNodes: BrainNode[] = []
  let att = 0

  // Surface nodes (70%) — keep only nodes near surface (|sdf| < 0.12)
  while (rightNodes.length < 250 && att < 200000) {
    att++
    const x = Math.random() * 2.2 - 0.3   // right side + a bit past midline
    const y = (Math.random() - 0.5) * 3.5
    const z = (Math.random() - 0.5) * 3.5
    const [inside, dist, partId] = brainTest(x, y, z)
    if (!inside) continue
    const sd = Math.abs(dist)
    if (sd > 0.12) continue  // surface only

    const depth = Math.max(0, Math.min(1, (z + 1.8) / 3.6))
    const layer: 0 | 1 | 2 = depth < 0.33 ? 0 : depth < 0.66 ? 1 : 2
    rightNodes.push({ x, y, z, depth, layer, region: partId, surfaceDist: sd })
  }

  // Interior nodes (30%) — fill inside
  att = 0
  while (rightNodes.length < 350 && att < 200000) {
    att++
    const x = Math.random() * 2.2 - 0.3
    const y = (Math.random() - 0.5) * 3.5
    const z = (Math.random() - 0.5) * 3.5
    const [inside, dist, partId] = brainTest(x, y, z)
    if (!inside) continue
    // Accept all interior points but with center bias
    const sd = Math.abs(dist)
    if (sd > 0.5 && Math.random() < 0.3) continue

    const depth = Math.max(0, Math.min(1, (z + 1.8) / 3.6))
    const layer: 0 | 1 | 2 = depth < 0.33 ? 0 : depth < 0.66 ? 1 : 2
    rightNodes.push({ x, y, z, depth, layer, region: partId, surfaceDist: sd })
  }

  // 2. Mirror right nodes to create left hemisphere nodes
  for (const n of rightNodes) {
    nodes.push(n) // keep original

    // Mirror if it's in right hemisphere (x > 0.1) or midline parts
    if (n.x > 0.08) {
      const mirrorRegion = n.region < 10 ? n.region + 10 : n.region
      nodes.push({
        x: -n.x, y: n.y, z: n.z,
        depth: n.depth, layer: n.layer,
        region: mirrorRegion,
        surfaceDist: n.surfaceDist,
      })
    }
  }

  // 3. Midline-specific nodes (cerebellum, brain stem) — not mirrored, generated separately
  att = 0
  while (att < 50000) {
    att++
    const x = (Math.random() - 0.5) * 1.2
    const y = -0.5 - Math.random() * 1.2  // below main hemispheres
    const z = (Math.random() - 0.5) * 2.0
    const [inside, dist, partId] = brainTest(x, y, z)
    if (!inside || partId < 4) continue  // only cerebellum/stem
    const sd = Math.abs(dist)
    if (nodes.length > 650) break
    const depth = Math.max(0, Math.min(1, (z + 1.8) / 3.6))
    const layer: 0 | 1 | 2 = depth < 0.33 ? 0 : depth < 0.66 ? 1 : 2
    nodes.push({ x, y, z, depth, layer, region: partId, surfaceDist: sd })
  }

  return nodes
}

// ======== CONNECTIONS — organic curved, region-constrained ========
interface Connection {
  from: number; to: number; layer: number
  curve: Float32Array // 12 floats: 4 control points × 3
}

function cubicBezier(c: Float32Array, t: number): [number, number, number] {
  const mt=1-t, mt2=mt*mt, mt3=mt2*mt, t2=t*t, t3=t2*t
  return [
    mt3*c[0]+3*mt2*t*c[3]+3*mt*t2*c[6]+t3*c[9],
    mt3*c[1]+3*mt2*t*c[4]+3*mt*t2*c[7]+t3*c[10],
    mt3*c[2]+3*mt2*t*c[5]+3*mt*t2*c[8]+t3*c[11],
  ]
}

function buildConnections(nodes: BrainNode[]): Connection[] {
  const conns: Connection[] = []
  const maxPer = 4
  const cc = new Uint8Array(nodes.length)
  const maxDist = 0.7

  // Spatial hash
  const cs = maxDist
  const grid = new Map<string, number[]>()
  for (let i = 0; i < nodes.length; i++) {
    const k = `${Math.floor(nodes[i].x/cs)},${Math.floor(nodes[i].y/cs)},${Math.floor(nodes[i].z/cs)}`
    if (!grid.has(k)) grid.set(k, [])
    grid.get(k)!.push(i)
  }

  for (let i = 0; i < nodes.length; i++) {
    if (cc[i] >= maxPer) continue
    const n = nodes[i]
    const gx = Math.floor(n.x/cs), gy = Math.floor(n.y/cs), gz = Math.floor(n.z/cs)
    const cands: [number, number][] = []

    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) for (let dz = -1; dz <= 1; dz++) {
      const cell = grid.get(`${gx+dx},${gy+dy},${gz+dz}`)
      if (!cell) continue
      for (const j of cell) {
        if (j <= i || cc[j] >= maxPer) continue
        // STRICT: only connect within same region (or ±1 for adjacent parts)
        const rDiff = Math.abs(n.region - nodes[j].region)
        if (rDiff > 1 && rDiff !== 10 && Math.random() > 0.03) continue
        // Don't cross the midline fissure
        if (n.x > 0.1 && nodes[j].x < -0.1) continue
        if (n.x < -0.1 && nodes[j].x > 0.1) continue

        const ddx = n.x-nodes[j].x, ddy = n.y-nodes[j].y, ddz = n.z-nodes[j].z
        const dist = Math.sqrt(ddx*ddx+ddy*ddy+ddz*ddz)
        if (dist < maxDist) cands.push([j, dist])
      }
    }

    cands.sort((a,b) => a[1]-b[1])
    let taken = 0
    for (const [j, dist] of cands) {
      if (taken >= 3 || cc[i] >= maxPer || cc[j] >= maxPer) break

      const a = nodes[i], b = nodes[j]
      // Build curved connection
      let px = -(b.y-a.y), py = (b.x-a.x), pz = 0
      const pl = Math.sqrt(px*px+py*py+pz*pz)+0.001
      px/=pl; py/=pl
      const dx2=b.x-a.x, dy2=b.y-a.y, dz2=b.z-a.z
      let cx2=py*dz2-pz*dy2, cy2=pz*dx2-px*dz2, cz2=px*dy2-py*dx2
      const cl=Math.sqrt(cx2*cx2+cy2*cy2+cz2*cz2)+0.001
      cx2/=cl; cy2/=cl; cz2/=cl
      const curv = dist*(0.12+Math.random()*0.22)
      const a1=Math.random()*Math.PI*2, a2=Math.random()*Math.PI*2

      const curve = new Float32Array(12)
      curve[0]=a.x; curve[1]=a.y; curve[2]=a.z
      curve[3]=a.x+(b.x-a.x)*0.33+(px*Math.cos(a1)+cx2*Math.sin(a1))*curv
      curve[4]=a.y+(b.y-a.y)*0.33+(py*Math.cos(a1)+cy2*Math.sin(a1))*curv
      curve[5]=a.z+(b.z-a.z)*0.33+(pz*Math.cos(a1)+cz2*Math.sin(a1))*curv
      curve[6]=a.x+(b.x-a.x)*0.66+(px*Math.cos(a2)+cx2*Math.sin(a2))*curv*0.8
      curve[7]=a.y+(b.y-a.y)*0.66+(py*Math.cos(a2)+cy2*Math.sin(a2))*curv*0.8
      curve[8]=a.z+(b.z-a.z)*0.66+(pz*Math.cos(a2)+cz2*Math.sin(a2))*curv*0.8
      curve[9]=b.x; curve[10]=b.y; curve[11]=b.z

      conns.push({ from: i, to: j, layer: n.layer, curve })
      cc[i]++; cc[j]++; taken++
    }
  }
  return conns
}

// ======== COMPONENT ========
export default function NeuralBrain3D() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return
    let W = el.clientWidth, H = el.clientHeight
    if (W === 0 || H === 0) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(68, W/H, 0.1, 100)
    // Camera: slightly left and above, looking at brain center-right
    camera.position.set(-1.0, 0.4, 4.0)
    camera.lookAt(0.6, -0.1, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    const brainPivot = new THREE.Group()
    brainPivot.position.set(0.8, -0.05, 0)
    brainPivot.scale.setScalar(1.3)

    const backGroup = new THREE.Group()
    const midGroup = new THREE.Group()
    const frontGroup = new THREE.Group()
    brainPivot.add(backGroup, midGroup, frontGroup)
    scene.add(brainPivot)

    // ---- Generate ----
    const nodes = generateNodes()
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

    const PR = renderer.getPixelRatio()

    // Layer visual settings
    const cfg = [
      { sMin: 0.01, sMax: 0.024, aMin: 0.06, aMax: 0.18,
        cFar: 'vec3(0.07,0.09,0.4)', cNear: 'vec3(0.1,0.2,0.52)',
        lAlpha: 0.055, lCol: [0.05,0.12,0.45], segs: 8 },
      { sMin: 0.024, sMax: 0.052, aMin: 0.18, aMax: 0.48,
        cFar: 'vec3(0.04,0.3,0.75)', cNear: 'vec3(0.0,0.5,1.0)',
        lAlpha: 0.12, lCol: [0.0,0.35,0.85], segs: 10 },
      { sMin: 0.045, sMax: 0.11, aMin: 0.45, aMax: 1.0,
        cFar: 'vec3(0.0,0.52,1.0)', cNear: 'vec3(0.5,0.92,1.0)',
        lAlpha: 0.22, lCol: [0.08,0.6,1.0], segs: 12 },
    ]

    const nodeGeos: THREE.BufferGeometry[] = []
    const lineGeos: THREE.BufferGeometry[] = []

    for (let lid = 0; lid < 3; lid++) {
      const c = cfg[lid]
      const ln = layerNodes[lid]
      const lc = layerConns[lid]
      const grp = groups[lid]
      if (!ln.length) continue

      // NODES
      const nCount = ln.length
      const pos = new Float32Array(nCount*3)
      const basePos = new Float32Array(nCount*3)
      const sizes = new Float32Array(nCount)
      const alphas = new Float32Array(nCount)
      const depths = new Float32Array(nCount)
      for (let i=0;i<nCount;i++) {
        const n=ln[i]
        pos[i*3]=n.x;pos[i*3+1]=n.y;pos[i*3+2]=n.z
        basePos[i*3]=n.x;basePos[i*3+1]=n.y;basePos[i*3+2]=n.z
        sizes[i]=c.sMin+n.depth*(c.sMax-c.sMin)
        alphas[i]=c.aMin+n.depth*(c.aMax-c.aMin)
        depths[i]=n.depth
      }
      const nGeo = new THREE.BufferGeometry()
      nGeo.setAttribute('position', new THREE.BufferAttribute(pos,3))
      nGeo.setAttribute('aSize', new THREE.BufferAttribute(sizes,1))
      nGeo.setAttribute('aAlpha', new THREE.BufferAttribute(alphas,1))
      nGeo.setAttribute('aDepth', new THREE.BufferAttribute(depths,1))
      ;(nGeo as any)._basePos = basePos

      const nMat = new THREE.ShaderMaterial({
        transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
        uniforms:{uPR:{value:PR}},
        vertexShader:`
          attribute float aSize;attribute float aAlpha;attribute float aDepth;
          varying float vAlpha;varying float vDepth;uniform float uPR;
          void main(){
            vAlpha=aAlpha;vDepth=aDepth;
            vec4 mv=modelViewMatrix*vec4(position,1.0);
            gl_Position=projectionMatrix*mv;
            gl_PointSize=aSize*580.0*uPR*(1.0/-mv.z);
          }`,
        fragmentShader:`
          varying float vAlpha;varying float vDepth;
          void main(){
            float d=length(gl_PointCoord-0.5)*2.0;
            if(d>1.0)discard;
            float core=smoothstep(0.35,0.0,d);
            float glow=pow(max(1.0-d,0.0),3.0)*0.2;
            vec3 col=mix(${c.cFar},${c.cNear},vDepth);
            gl_FragColor=vec4(col,(core+glow)*vAlpha);
          }`,
      })
      grp.add(new THREE.Points(nGeo,nMat))
      nodeGeos.push(nGeo)

      // CURVED CONNECTIONS
      if(!lc.length)continue
      const segs=c.segs
      const totalV=lc.length*(segs+1)
      const lPos=new Float32Array(totalV*3)
      const lBase=new Float32Array(totalV*3)
      const lAlphas=new Float32Array(totalV)
      const indices:number[]=[]
      for(let ci=0;ci<lc.length;ci++){
        const conn=lc[ci], base=ci*(segs+1)
        for(let si=0;si<=segs;si++){
          const t=si/segs
          const[bx,by,bz]=cubicBezier(conn.curve,t)
          const vi=base+si
          lPos[vi*3]=bx;lPos[vi*3+1]=by;lPos[vi*3+2]=bz
          lBase[vi*3]=bx;lBase[vi*3+1]=by;lBase[vi*3+2]=bz
          const ef=t<0.15?t/0.15:t>0.85?(1-t)/0.15:1
          lAlphas[vi]=c.lAlpha*ef
          if(si<segs)indices.push(base+si,base+si+1)
        }
      }
      const lGeo=new THREE.BufferGeometry()
      lGeo.setAttribute('position',new THREE.BufferAttribute(lPos,3))
      lGeo.setAttribute('aAlpha',new THREE.BufferAttribute(lAlphas,1))
      lGeo.setIndex(indices)
      ;(lGeo as any)._basePos=lBase
      const lr=c.lCol[0],lg=c.lCol[1],lb=c.lCol[2]
      const lMat=new THREE.ShaderMaterial({
        transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
        vertexShader:`attribute float aAlpha;varying float vA;void main(){vA=aAlpha;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
        fragmentShader:`varying float vA;void main(){gl_FragColor=vec4(${lr.toFixed(2)},${lg.toFixed(2)},${lb.toFixed(2)},vA);}`,
      })
      grp.add(new THREE.LineSegments(lGeo,lMat))
      lineGeos.push(lGeo)
    }

    // PULSE SIGNALS
    const allConns=[...connections.filter(c=>c.layer===1),...connections.filter(c=>c.layer===2)]
    const NP=26
    const pProg=new Float32Array(NP),pSpd=new Float32Array(NP),pIdx=new Int32Array(NP)
    for(let i=0;i<NP;i++){pProg[i]=Math.random();pSpd[i]=0.2+Math.random()*0.5;pIdx[i]=Math.floor(Math.random()*Math.max(1,allConns.length))}
    const pGeo=new THREE.BufferGeometry()
    const pPos=new Float32Array(NP*3),pAlp=new Float32Array(NP)
    pGeo.setAttribute('position',new THREE.BufferAttribute(pPos,3))
    pGeo.setAttribute('aAlpha',new THREE.BufferAttribute(pAlp,1))
    const pMat=new THREE.ShaderMaterial({
      transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
      uniforms:{uPR:{value:PR}},
      vertexShader:`attribute float aAlpha;varying float vA;uniform float uPR;void main(){vA=aAlpha;vec4 mv=modelViewMatrix*vec4(position,1.0);gl_Position=projectionMatrix*mv;gl_PointSize=8.0*uPR*(1.0/-mv.z);}`,
      fragmentShader:`varying float vA;void main(){float d=length(gl_PointCoord-0.5)*2.0;if(d>1.0)discard;gl_FragColor=vec4(0.5,0.96,1.0,pow(1.0-d,3.5)*vA);}`,
    })
    frontGroup.add(new THREE.Points(pGeo,pMat))

    // Subtle glow
    const gc=document.createElement('canvas');gc.width=128;gc.height=128
    const gx=gc.getContext('2d')!
    const grd=gx.createRadialGradient(64,64,0,64,64,64)
    grd.addColorStop(0,'rgba(0,125,255,0.035)')
    grd.addColorStop(0.4,'rgba(15,35,140,0.012)')
    grd.addColorStop(1,'rgba(0,0,0,0)')
    gx.fillStyle=grd;gx.fillRect(0,0,128,128)
    const spr=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(gc),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}))
    spr.scale.set(6,5,1);spr.position.set(0,-0.1,0)
    midGroup.add(spr)

    // Mouse
    let mx=0,my=0,tRX=0,tRY=0,cRX=0,cRY=0
    const onM=(e:MouseEvent)=>{mx=(e.clientX/window.innerWidth-0.5)*2;my=(e.clientY/window.innerHeight-0.5)*2;tRY=mx*0.2;tRX=-my*0.12}
    window.addEventListener('mousemove',onM)

    const onR=()=>{W=el.clientWidth;H=el.clientHeight;if(W&&H){camera.aspect=W/H;camera.updateProjectionMatrix();renderer.setSize(W,H)}}
    window.addEventListener('resize',onR)

    // Animate
    let time=0
    const clock=new THREE.Clock()
    let raf=0
    const nScale=1.6,nSpeed=0.3,nAmp=0.022

    const animate=()=>{
      raf=requestAnimationFrame(animate)
      const dt=Math.min(clock.getDelta(),0.05);time+=dt;const nt=time*nSpeed

      // Noise-animate nodes
      for(const geo of nodeGeos){
        const pa=geo.attributes.position as THREE.BufferAttribute
        const bp=(geo as any)._basePos as Float32Array
        const arr=pa.array as Float32Array
        for(let i=0;i<pa.count;i++){
          const bx=bp[i*3],by=bp[i*3+1],bz=bp[i*3+2]
          arr[i*3]=bx+simplex3(bx*nScale,by*nScale,nt)*nAmp
          arr[i*3+1]=by+simplex3(by*nScale,bz*nScale,nt+100)*nAmp
          arr[i*3+2]=bz+simplex3(bz*nScale,bx*nScale,nt+200)*nAmp
        }
        pa.needsUpdate=true
      }
      // Noise-animate connections
      for(const geo of lineGeos){
        const pa=geo.attributes.position as THREE.BufferAttribute
        const bp=(geo as any)._basePos as Float32Array
        const arr=pa.array as Float32Array
        for(let i=0;i<pa.count;i++){
          const bx=bp[i*3],by=bp[i*3+1],bz=bp[i*3+2]
          arr[i*3]=bx+simplex3(bx*nScale,by*nScale,nt)*nAmp
          arr[i*3+1]=by+simplex3(by*nScale,bz*nScale,nt+100)*nAmp
          arr[i*3+2]=bz+simplex3(bz*nScale,bx*nScale,nt+200)*nAmp
        }
        pa.needsUpdate=true
      }

      cRX+=(tRX-cRX)*0.03;cRY+=(tRY-cRY)*0.03
      brainPivot.rotation.y=time*0.03+cRY
      brainPivot.rotation.x=Math.sin(time*0.06)*0.018+cRX
      backGroup.position.set(mx*0.02,-my*0.015,0)
      midGroup.position.set(mx*0.08,-my*0.055,0)
      frontGroup.position.set(mx*0.24,-my*0.16,0)
      brainPivot.scale.setScalar(1.3+Math.sin(time*0.25)*0.008)

      // Pulses
      const pPA=pGeo.attributes.position as THREE.BufferAttribute
      const pAA=pGeo.attributes.aAlpha as THREE.BufferAttribute
      for(let i=0;i<NP;i++){
        pProg[i]+=dt*pSpd[i]
        if(pProg[i]>=1){pProg[i]=0;pIdx[i]=Math.floor(Math.random()*Math.max(1,allConns.length));pSpd[i]=0.2+Math.random()*0.5}
        const cn=allConns[pIdx[i]]
        if(cn){const t=pProg[i];const[px,py,pz]=cubicBezier(cn.curve,t);pPA.setXYZ(i,px,py,pz);const f=t<0.12?t/0.12:t>0.88?(1-t)/0.12:1;pAA.setX(i,f*0.85)}
      }
      pPA.needsUpdate=true;pAA.needsUpdate=true
      renderer.render(scene,camera)
    }
    animate()

    return()=>{cancelAnimationFrame(raf);window.removeEventListener('mousemove',onM);window.removeEventListener('resize',onR);renderer.dispose();if(el.contains(renderer.domElement))el.removeChild(renderer.domElement)}
  },[])

  return <div ref={mountRef} style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:1}}/>
}
