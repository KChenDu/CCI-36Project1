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

camera.position.set(0,0,30);
camera.lookAt(0,0,0);

scene.add(camera);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new THREE.OrbitControls(camera, renderer.domElement);
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
    color: 0x000080,
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

const venus_geometry =  new THREE.SphereGeometry(1);
const venus_material = new THREE.MeshLambertMaterial({
    color: 0xDAA520,
    wireframe: false
});
const venus = new THREE.Mesh(venus_geometry, venus_material);
scene.add(venus);

const mercury_geometry =  new THREE.SphereGeometry(0.6);
const mercury_material = new THREE.MeshLambertMaterial({
    color: 0x696969,
    wireframe: false
});
const mercury = new THREE.Mesh(mercury_geometry, mercury_material);
scene.add(mercury);

let mercury_angle = 0
const mercury_angular_v = 0.045;
let venus_angle = 0
const venus_angular_v = 0.015;
let earth_angle = 0;
const moon_angular_v = 0.13;
const earth_angular_v = 0.01;

const animate = function () {
    controls.update();
    requestAnimationFrame(animate);
    mercury.position.set(4 * Math.sin(mercury_angle), 0, 4 * Math.cos(mercury_angle))
    venus.position.set(7 * Math.sin(venus_angle), 0, 7 * Math.cos(venus_angle))
    g.rotation.y += moon_angular_v;
    g.position.set(solar_distance * Math.sin(earth_angle), 0, solar_distance * Math.cos(earth_angle))


    renderer.render(scene, camera);
    mercury_angle += mercury_angular_v;
    venus_angle += venus_angular_v;
    earth_angle += earth_angular_v;
};

animate();
