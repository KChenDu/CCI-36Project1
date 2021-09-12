const k = document.getElementById("ico");
const b = k.getBoundingClientRect();

const x = document.createElement("canvas");

x.style.position="absolute";
x.width=b.width;
x.height=b.height;
x.style.top=""+b.top+"px";
x.style.left=""+b.left+"px";

document.body.appendChild(x);

canvas= x

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000)
const renderer = new THREE.WebGLRenderer({antialias:true, canvas: canvas, alpha:true})

camera.position.set(0,0,30);
camera.lookAt(0,0,0);

scene.add(camera);

window.onresize = canvasResize;

function canvasResize()
{
    camera.aspect=window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix();
}

// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
// const controls = new THREE.OrbitControls(camera);
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

const sun_geometry = new THREE.SphereGeometry(2);
const sun_material = new THREE.MeshBasicMaterial({
    color: 0xFF4500,
    wireframe: false,
});
const sun = new THREE.Mesh(sun_geometry, sun_material);
scene.add(sun);
const sunshine = new THREE.PointLight(0xffffff, 3.0);
scene.add(sunshine);
const earth_geometry = new THREE.SphereGeometry(1);
const earth_material = new THREE.MeshLambertMaterial({
    color: 0x00BFFF,
    wireframe: false
});

const earth = new THREE.Mesh(earth_geometry, earth_material);
let solar_distance = 10;

const moon_geometry = new THREE.SphereGeometry(0.2);
const moon_material = new THREE.MeshLambertMaterial({
    color: 0xD3D3D3,
    wireframe: false
});
const moon = new THREE.Mesh(moon_geometry, moon_material);
const radius = 1.5;
moon.position.set(earth.position.x, 0, earth.position.z + radius);
const g = new THREE.Group();
g.add(earth);
g.add(moon);
scene.add(g);

let earth_angle = 0
let moon_angular_v = 0.13;
let earth_angular_v = 0.01;
const animate = function () {
    // controls.update();
    requestAnimationFrame(animate);
    g.rotation.y += moon_angular_v;
    g.position.set(solar_distance * Math.sin(earth_angle), 0, solar_distance * Math.cos(earth_angle))
    renderer.render(scene, camera);
    earth_angle += earth_angular_v;
};

animate();
