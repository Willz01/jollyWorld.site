import * as THREE from 'three'

const GOLD = 0xd4af37
const GOLD_SOFT = 0xf0d98a

function latLon(lat, lon, r) {
  const phi = ((90 - lat) * Math.PI) / 180
  const theta = ((lon + 180) * Math.PI) / 180
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  )
}

function buildGrid(r, meridians, parallels, seg) {
  const pts = []
  for (let i = 0; i < meridians; i++) {
    const lon = -180 + (360 / meridians) * i
    for (let j = 0; j < seg; j++) {
      pts.push(latLon(-90 + (180 * j) / seg, lon, r), latLon(-90 + (180 * (j + 1)) / seg, lon, r))
    }
  }
  for (let i = 1; i < parallels; i++) {
    const lat = -90 + (180 * i) / parallels
    for (let j = 0; j < seg * 2; j++) {
      pts.push(latLon(lat, -180 + (360 * j) / (seg * 2), r), latLon(lat, -180 + (360 * (j + 1)) / (seg * 2), r))
    }
  }
  return new THREE.BufferGeometry().setFromPoints(pts)
}

function buildDots(r, count) {
  const pts = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const rad = Math.sqrt(1 - y * y)
    const a = golden * i
    pts.push(new THREE.Vector3(Math.cos(a) * rad * r, y * r, Math.sin(a) * rad * r))
  }
  return new THREE.BufferGeometry().setFromPoints(pts)
}

export function initGlobe(canvas) {
  const mq = window.matchMedia('(max-width: 768px)')
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const mobile = mq.matches

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !mobile,
    alpha: true,
    powerPreference: 'low-power'
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 2))

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
  camera.position.z = 8

  const R = 2
  const rig = new THREE.Group() // position + tilt
  const spin = new THREE.Group() // rotates with scroll
  rig.rotation.z = 0.41
  rig.add(spin)
  scene.add(rig)

  // Occluder so back-facing lines don't show through
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(R * 0.994, 48, 32),
    new THREE.MeshBasicMaterial({ color: 0x000000 })
  )
  spin.add(core)

  const gridMat = new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.5 })
  const grid = new THREE.LineSegments(buildGrid(R, mobile ? 12 : 24, mobile ? 6 : 12, mobile ? 32 : 64), gridMat)
  spin.add(grid)

  const dotMat = new THREE.PointsMaterial({
    color: GOLD_SOFT,
    size: mobile ? 0.03 : 0.028,
    transparent: true,
    opacity: 0.85,
    sizeAttenuation: true
  })
  spin.add(new THREE.Points(buildDots(R * 1.004, mobile ? 350 : 1100), dotMat))

  const halo = new THREE.Mesh(
    new THREE.SphereGeometry(R * 1.1, 48, 32),
    new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.05, side: THREE.BackSide })
  )
  rig.add(halo)

  // Marker for Uyo (5.03 N, 7.93 E)
  const markerPos = latLon(5.03, 7.93, R * 1.005)
  const marker = new THREE.Mesh(
    new THREE.SphereGeometry(0.055, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xfff1b8 })
  )
  marker.position.copy(markerPos)
  spin.add(marker)
  const pulse = new THREE.Mesh(
    new THREE.RingGeometry(0.07, 0.085, 40),
    new THREE.MeshBasicMaterial({ color: GOLD_SOFT, transparent: true, opacity: 0.9, side: THREE.DoubleSide })
  )
  pulse.position.copy(markerPos)
  pulse.lookAt(markerPos.clone().multiplyScalar(2))
  spin.add(pulse)

  // Orbit ring and satellite (desktop only)
  let sat = null
  let ring = null
  if (!mobile) {
    ring = new THREE.Mesh(
      new THREE.TorusGeometry(R * 1.38, 0.004, 8, 200),
      new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.45 })
    )
    ring.rotation.x = Math.PI / 2.35
    rig.add(ring)
    sat = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), new THREE.MeshBasicMaterial({ color: 0xfff1b8 }))
    ring.add(sat)
  }

  const state = { scale: 1, scrollTarget: 0, scrollCur: 0, idle: 0, progress: 0, mx: 0, my: 0, mobileLayout: mobile }

  function layout() {
    const w = canvas.clientWidth || window.innerWidth
    const h = canvas.clientHeight || window.innerHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    const m = w <= 768
    state.scale = m ? 0.7 : Math.min(1.05, Math.max(0.75, w / 1400))
    gridMat.opacity = m ? 0.22 : 0.5
    dotMat.opacity = m ? 0.35 : 0.85
    halo.visible = !m
    if (ring) ring.visible = !m
    state.mobileLayout = m
    if (reduce) draw(0)
  }

  function onScroll() {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    state.scrollTarget = window.scrollY * 0.0032
    state.progress = Math.min(1, Math.max(0, window.scrollY / max))
    if (reduce) draw(0)
  }

  function onMove(e) {
    state.mx = (e.clientX / window.innerWidth - 0.5) * 2
    state.my = (e.clientY / window.innerHeight - 0.5) * 2
  }

  let raf = 0
  let last = performance.now()
  let elapsed = 0

  function draw(dt) {
    elapsed += dt
    if (!reduce) {
      state.idle += dt * 0.12
      state.scrollCur += (state.scrollTarget - state.scrollCur) * 0.07
    } else {
      state.scrollCur = state.scrollTarget
    }
    spin.rotation.y = state.idle + state.scrollCur

    const p = state.progress
    const m = state.mobileLayout
    // Globe drifts across the page as you scroll, staying centered on phones.
    const targetX = m ? 0 : Math.cos(p * Math.PI * 3) * 2.6
    const targetY = m ? 0.2 : Math.sin(p * Math.PI * 2) * 0.35
    rig.position.x += (targetX - rig.position.x) * (reduce ? 1 : 0.05)
    rig.position.y += (targetY - rig.position.y) * (reduce ? 1 : 0.05)
    rig.scale.setScalar(state.scale)
    if (!m) {
      rig.rotation.x += (state.my * 0.12 - rig.rotation.x) * 0.04
      rig.rotation.y += (state.mx * 0.18 - rig.rotation.y) * 0.04
    }

    const k = (elapsed * 0.9) % 1
    pulse.scale.setScalar(1 + k * 2.4)
    pulse.material.opacity = 0.9 * (1 - k)
    if (sat) sat.position.set(Math.cos(elapsed * 0.6) * R * 1.38, Math.sin(elapsed * 0.6) * R * 1.38, 0)

    renderer.render(scene, camera)
  }

  function frame(now) {
    raf = requestAnimationFrame(frame)
    if (mobile && now - last < 33) return // ~30fps on phones
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    draw(dt)
  }

  function onVisibility() {
    if (reduce) return
    if (document.hidden) cancelAnimationFrame(raf)
    else {
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }
  }

  layout()
  onScroll()
  state.scrollCur = state.scrollTarget
  window.addEventListener('resize', layout)
  window.addEventListener('scroll', onScroll, { passive: true })
  if (!mobile) window.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('visibilitychange', onVisibility)

  if (reduce) draw(0)
  else raf = requestAnimationFrame(frame)

  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', layout)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('pointermove', onMove)
    document.removeEventListener('visibilitychange', onVisibility)
    scene.traverse((o) => {
      if (o.geometry) o.geometry.dispose()
      if (o.material) o.material.dispose()
    })
    renderer.dispose()
  }
}
