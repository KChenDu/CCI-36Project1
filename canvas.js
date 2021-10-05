//import * as THREE from './js/three.js'

const k = document.getElementById("ico");
const b = k.getBoundingClientRect();
console.log(b)

const x = document.createElement("canvas");

x.style.position="absolute";
x.width=b.width;
x.style.top=""+b.top+"px";
x.style.left=""+b.left+"px";
x.height=b.height;
console.log(x)

document.body.appendChild(x);

canvas = x

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    canvas.width / canvas.height,
    1,
    1000)
const renderer = new THREE.WebGLRenderer({antialias:true, canvas: canvas, alpha:true})

scene.translateOnAxis(new THREE.Vector3(-1,1,0.2).normalize(), 2.3)
camera.position.set(15, 8, 15);
scene.add(camera);

renderer.setSize(canvas.width, canvas.height);
document.body.appendChild(renderer.domElement);
const controls = new THREE.OrbitControls(camera, renderer.domElement);
const axesHelper = new THREE.AxesHelper(10);
const gridHelper = new THREE.GridHelper(25)
scene.add(axesHelper);
scene.add(gridHelper)

function Orb(rad, color, fat_dist, ang_v, is_sun=false) {
    this.rad = rad
    this.geometry = new THREE.SphereGeometry(rad)
    const mat_constr = (is_sun
        ? THREE.MeshBasicMaterial
        : THREE.MeshLambertMaterial)
    this.material = new mat_constr({
        color: color,
        wireframe: false,
    })
    this.m = new THREE.Mesh(this.geometry, this.material)
    this.ang_v = ang_v
    this.ang = 0
    this.fat_dist = fat_dist
}

const SCA_SIZ = 0.1
const SCA_DIS = 2

// Sun related
const sunshine = new THREE.PointLight(0xffffff, 3.0);
scene.add(sunshine);
const sun     = new Orb(1, 0xFDB813,     0,   0, true)
scene.add(sun.m)

// Planets
const mercury = new Orb(0.1, 0xd5d2d1, 1.5,  2/88)
const venus   = new Orb(0.2, 0xeed053, 2.1,  2/224)
const earth   = new Orb(0.21, 0x112058, 2.9,  2/365)
const mars    = new Orb(0.19, 0xd6723b, 3.8,  2/687)
const jupiter = new Orb(0.5, 0xBCAFB2, 6,  2/4331)
const saturn  = new Orb(0.5, 0xA49B72, 8,  2/10747)
const uranus  = new Orb(0.4, 0x4FD0E7, 10,  2/30589)
const neptune = new Orb(0.4, 0x4B70DD, 12,  2/59800)

const planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune]

for (let p of planets) {
    p.ang = 2*Math.PI * Math.random()
    sun.m.add(p.m)
}

for (let p of planets) {
    const orbit_geo = new THREE.RingGeometry(p.rad-0.1, p.rad+0.1, 32)
    const orbit_mat = new THREE.MeshBasicMaterial({
        color: 0x000000,
        side: THREE.DoubleSide
    })
    const orbit = new THREE.Mesh(orbit_geo, orbit_mat);
    orbit.position.set(0,0,0)
    orbit.setRotationFromAxisAngle(1,1,1,1)
    scene.add(orbit)
}
// Other celestial bodies

const moon    = new Orb(0.05, 0xd3d3d3, 0.4, 2/27)
earth.m.add(moon.m)

const ring_geo = new THREE.RingGeometry(1.1*saturn.rad, 1.6*saturn.rad, 32);
const ring_mat = new THREE.MeshBasicMaterial({
    color: 0xAB604A,
    side: THREE.DoubleSide 
})
const ring = new THREE.Mesh(ring_geo, ring_mat);
ring.rotateX(3.14 * 63 / 180 )
saturn.m.add(ring)

const others = [moon]

// Animate

const orbs = [...[sun], ...planets, ...others]
console.log(orbs)

const anim  = document.getElementById("animacao") 
const eixos = document.getElementById("eixos")

const animate = function () {
    controls.update();
    requestAnimationFrame(animate);
    for(let orb of orbs){
        const d = orb.fat_dist
        const ang = orb.ang
        const ang_v = orb.ang_v
        
        orb.m.position.set(d * Math.sin(ang), 0, d * Math.cos(ang))
        orb.ang += ang_v
    }
    sun.m.visible = (anim.checked===true)
    axesHelper.visible = (eixos.checked===true)
    gridHelper.visible = (grid.checked===true)

    console.log(camera.projectionMatrix.elements)
    renderer.render(scene, camera);
};

animate();
