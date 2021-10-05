const k = document.getElementById("ico");
const b = k.getBoundingClientRect();

const x = document.createElement("canvas");

x.style.position="absolute";
x.width=b.width;
x.height=b.height;
x.style.top=""+b.top+"px";
x.style.left=""+b.left+"px";

document.body.appendChild(x);

canvas = x

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000)
const renderer = new THREE.WebGLRenderer({antialias:true, canvas: canvas, alpha:true})

camera.position.set(0,30,0);
camera.lookAt(0,0,0);

scene.add(camera);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// const controls = new THREE.OrbitControls(camera);
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

function Orb(rad, color, ang_v, fat_dist=0, is_sun=false) {
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

const sunshine = new THREE.PointLight(0xffffff, 3.0);
scene.add(sunshine);

const sun     = new Orb(  1, 0xFF4500,     0,   0, true)
const mercury = new Orb(0.6, 0x696969, 0.045,   4)
const venus   = new Orb(0.5, 0xdaa520, 0.015,   5)
const earth   = new Orb(0.5, 0x000080,  0.01,   7)
const mars    = new Orb(0.5, 0xFF0000, 0.010,  10)
const jupiter = new Orb(0.8, 0x00FF00, 0.005,  12)
const saturn  = new Orb(0.5, 0xFFAA00, 0.008,  13)
const uranus  = new Orb(0.5, 0x00FFFF, 0.003,  14)
const neptune = new Orb(0.5, 0x00FFFF, 0.001,  15)

const planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune]

scene.add(sun.m)
for (let p of planets) {
    scene.add(p.m)
}

const moon    = new Orb(0.2, 0xd3d3d3,  0.13, 1.5)
earth.m.add(moon.m)

const others = [moon]

const orbs = [...[sun], ...planets, ...others]
console.log(orbs)

const animate = function () {
    // controls.update();
    requestAnimationFrame(animate);
    for(let orb of orbs){
        const d = orb.fat_dist
        const ang = orb.ang
        const ang_v = orb.ang_v
        
        orb.m.position.set(d * Math.sin(ang), 0, d * Math.cos(ang))
        orb.ang += ang_v
    }
    
    renderer.render(scene, camera);
};

animate();
