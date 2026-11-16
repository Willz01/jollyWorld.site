// Gold line drawing of the finished jollyWorld building, traced from the
// site photos: flat parapet roof, stone-clad pilasters and bands, grooved
// render on the left wing, white-framed casement windows, and a plinth.
// "Finished" touches added: entrance porch with sign, double doors, steps,
// lamps, walkway, shrubs and palms.

const GROUND = 600
const PLINTH = 530

let order = 0
const d = () => ({ '--i': order++ })

// Stone cladding: an outlined block with staggered joints, as one path.
function stone(x, y, w, h, course = 15, unit = 34) {
  let p = ''
  let row = 0
  for (let yy = y + course; yy < y + h; yy += course, row++) p += `M${x} ${yy}H${x + w}`
  row = 0
  for (let yy = y; yy < y + h; yy += course, row++) {
    const y2 = Math.min(yy + course, y + h)
    const off = row % 2 ? unit / 2 : 0
    for (let xx = x + off + (off ? 0 : unit); xx < x + w - 4; xx += unit) p += `M${xx} ${yy}V${y2}`
  }
  return (
    <g key={`s${x}-${y}`}>
      <rect className="ho-wall draw" x={x} y={y} width={w} height={h} pathLength="1" style={d()} />
      <path className="ho-fine draw" d={p} pathLength="1" style={d()} />
    </g>
  )
}

// Casement window: frame, inner frame, mullions, transom and sill.
function win(x, y, w, h, panes = 2) {
  let p = ''
  const ix = x + 7, iy = y + 7, iw = w - 14, ih = h - 14
  for (let k = 1; k < panes; k++) p += `M${ix + (iw * k) / panes} ${iy}V${iy + ih}`
  p += `M${ix} ${iy + ih * 0.3}H${ix + iw}`
  return (
    <g key={`w${x}-${y}`}>
      <rect className="ho-glass draw" x={x} y={y} width={w} height={h} pathLength="1" style={d()} />
      <rect className="ho-line draw" x={ix} y={iy} width={iw} height={ih} pathLength="1" style={d()} />
      <path className="ho-line draw" d={p} pathLength="1" style={d()} />
      <rect className="ho-line draw" x={x - 6} y={y + h} width={w + 12} height={7} pathLength="1" style={d()} />
    </g>
  )
}

function grooves(x1, x2, y1, y2, step = 30) {
  let p = ''
  for (let y = y1; y <= y2; y += step) p += `M${x1} ${y}H${x2}`
  return <path key={`g${x1}`} className="ho-fine draw" d={p} pathLength="1" style={d()} />
}

function plinth(x1, x2) {
  return (
    <path key={`p${x1}`} className="ho-line draw" d={`M${x1} ${PLINTH}H${x2}M${x1} ${PLINTH + 6}H${x2}`} pathLength="1" style={d()} />
  )
}

function palm(x, flip = 1) {
  const top = { x: x + 26 * flip, y: 330 }
  // Each frond is a leaf: two curves that meet at the tip, arching then drooping.
  const fronds = [
    [-115, 45], [-80, 75], [95, 70], [120, 35], [-30, -55], [45, -50], [10, 85]
  ]
    .map(([dx, dy]) => {
      const ex = top.x + dx * flip, ey = top.y + dy
      const mx = top.x + dx * 0.5 * flip, my = top.y + Math.min(dy, 0) * 0.6 - 30
      const w = 9
      return `M${top.x} ${top.y}Q${mx} ${my - w} ${ex} ${ey}Q${mx} ${my + w} ${top.x} ${top.y}`
    })
    .join('')
  let rings = ''
  for (let t = 0.1; t < 1; t += 0.1) {
    const y = GROUND - (GROUND - top.y) * t
    const xx = x + 26 * flip * t * t
    rings += `M${xx - 7} ${y}l14 -3`
  }
  return (
    <g key={`palm${x}`}>
      <path className="ho-line draw" d={`M${x - 8} ${GROUND}Q${x - 4} ${(GROUND + top.y) / 2} ${top.x - 4} ${top.y}M${x + 8} ${GROUND}Q${x + 10} ${(GROUND + top.y) / 2} ${top.x + 4} ${top.y}`} pathLength="1" style={d()} />
      <path className="ho-fine draw" d={rings} pathLength="1" style={d()} />
      <path className="ho-line draw" d={fronds} pathLength="1" style={d()} />
    </g>
  )
}

function lamp(x) {
  return (
    <g key={`lamp${x}`}>
      <path className="ho-line draw" d={`M${x} ${GROUND}V470M${x - 10} ${GROUND}H${x + 10}M${x - 9} 470H${x + 9}L${x + 6} 448H${x - 6}ZM${x - 4} 448L${x} 440L${x + 4} 448`} pathLength="1" style={d()} />
      <circle className="ho-glow" cx={x} cy={460} r={18} />
    </g>
  )
}

function shrubs(x1, x2) {
  let p = `M${x1} ${GROUND}`
  for (let x = x1; x < x2; x += 36) p += `Q${x + 6} ${GROUND - 30} ${x + 18} ${GROUND - 26}Q${x + 32} ${GROUND - 30} ${x + 36} ${GROUND}`
  return <path key={`sh${x1}`} className="ho-line draw" d={p} pathLength="1" style={d()} />
}

function build() {
  order = 0
  const els = []

  // Ground and boundary wall
  els.push(<path key="ground" className="ho-line draw" d={`M0 ${GROUND}H1600`} pathLength="1" style={d()} />)
  els.push(<path key="fence" className="ho-fine draw" d="M0 450H70V600M0 458H66M18 458V600M44 458V600" pathLength="1" style={d()} />)

  // Block A: left wing, grooved render between stone pilasters
  els.push(<rect key="A" className="ho-wall draw" x="90" y="176" width="360" height="424" pathLength="1" style={d()} />)
  els.push(<rect key="Acap" className="ho-line draw" x="82" y="166" width="376" height="12" pathLength="1" style={d()} />)
  els.push(grooves(126, 414, 240, 510))
  els.push(stone(90, 178, 36, 422))
  els.push(stone(414, 178, 36, 422))
  els.push(stone(126, 178, 288, 30))
  els.push(win(145, 300, 110, 160, 3))
  els.push(win(285, 300, 110, 160, 3))
  els.push(plinth(126, 414))

  // Block B: recessed middle with stone band and four windows
  els.push(<rect key="B" className="ho-wall draw" x="450" y="218" width="610" height="382" pathLength="1" style={d()} />)
  els.push(<rect key="Bcap" className="ho-line draw" x="450" y="210" width="610" height="10" pathLength="1" style={d()} />)
  els.push(stone(450, 262, 610, 30))
  ;[526, 679, 831, 984].forEach((c) => els.push(win(c - 36, 330, 72, 150, 2)))
  els.push(plinth(450, 1060))
  els.push(stone(1060, 262, 40, 338))

  // Block D: right wing
  els.push(<rect key="D" className="ho-wall draw" x="1360" y="176" width="180" height="424" pathLength="1" style={d()} />)
  els.push(<rect key="Dcap" className="ho-line draw" x="1354" y="166" width="192" height="12" pathLength="1" style={d()} />)
  els.push(grooves(1360, 1504, 240, 510))
  els.push(stone(1360, 178, 144, 30))
  els.push(stone(1504, 178, 36, 422))
  els.push(win(1382, 300, 100, 160, 2))
  els.push(plinth(1360, 1504))

  // Block C: entrance with porch, sign, doors and steps
  els.push(<rect key="C" className="ho-wall draw" x="1100" y="150" width="260" height="450" pathLength="1" style={d()} />)
  els.push(<rect key="Ccap" className="ho-line draw" x="1092" y="140" width="276" height="12" pathLength="1" style={d()} />)
  els.push(stone(1170, 180, 120, 84, 14, 30))
  els.push(<rect key="canopy" className="ho-wall draw" x="1080" y="288" width="300" height="34" pathLength="1" style={d()} />)
  els.push(<path key="canopyEdge" className="ho-fine draw" d="M1080 296H1380" pathLength="1" style={d()} />)
  els.push(
    <text key="sign" className="ho-sign" x="1230" y="316" textAnchor="middle">
      jolly<tspan className="ho-sign--b">World</tspan>
    </text>
  )
  els.push(stone(1108, 322, 30, 250, 14, 30))
  els.push(stone(1322, 322, 30, 250, 14, 30))
  els.push(<rect key="doorFrame" className="ho-glass draw" x="1184" y="380" width="92" height="192" pathLength="1" style={d()} />)
  els.push(<path key="door" className="ho-line draw" d="M1230 400V572M1184 400H1276M1192 410H1222V562H1192ZM1238 410H1268V562H1238ZM1224 480V500M1236 480V500" pathLength="1" style={d()} />)
  els.push(<path key="sconces" className="ho-line draw" d="M1162 420v-14h8v14zM1290 420v-14h8v14z" pathLength="1" style={d()} />)
  els.push(<circle key="g1" className="ho-glow" cx="1166" cy="413" r="14" />)
  els.push(<circle key="g2" className="ho-glow" cx="1294" cy="413" r="14" />)
  els.push(<path key="steps" className="ho-line draw" d="M1150 572H1310V580H1150ZM1136 580H1324V590H1136ZM1122 590H1338V600H1122Z" pathLength="1" style={d()} />)

  // Grounds
  els.push(<path key="walk" className="ho-fine draw" d="M1122 600L1060 640M1338 600L1400 640M1112 606H1348M1100 614H1360M1088 622H1372M1076 630H1384" pathLength="1" style={d()} />)
  els.push(shrubs(130, 418))
  els.push(shrubs(470, 1040))
  els.push(lamp(1030))
  els.push(lamp(1430))
  els.push(palm(30, 1))
  els.push(palm(1572, -1))

  return els
}

export default function HotelOutline({ variant = 'hero' }) {
  const fade = `ho-fade-${variant}`
  return (
    <svg className={`hotel-outline hotel-outline--${variant}`} viewBox="0 0 1600 640" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <defs>
        <linearGradient id={fade} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset="0.82" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#050505" stopOpacity="1" />
        </linearGradient>
      </defs>
      {build()}
      <rect x="0" y="0" width="1600" height="640" fill={`url(#${fade})`} />
    </svg>
  )
}
