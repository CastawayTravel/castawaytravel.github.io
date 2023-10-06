/* Scene & camera */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 2;
camera.position.z = 3;
console.log(camera);
camera.lookAt(new THREE.Vector3(0, 1, 0));

/* Colors */
/* Navy blue */
const backgroundColor = new THREE.Color(0x12174a);
/* Test material */
const testMaterial = new THREE.MeshStandardMaterial({color: 0xFF0000, wireframe: true});

/* Renderer */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRation);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.physicallyCorrectLights = true;
renderer.setClearColor(backgroundColor);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

/* Load model */
var model;
const loader = new THREE.GLTFLoader();
loader.load('../assets/models/Astronaut.glb', function (gltf) {
    model = gltf;
    gltf.scene;
    gltf.material;
    scene.add(gltf.scene);
}, function (xhr) {
    console.log(`Model ${Math.round((xhr.loaded / xhr.total * 100))}% loaded`)
}, function (error) {
	console.error(error);
});

/* Lights */
const ambientLight = new THREE.AmbientLight(0xffaaff, 4);
ambientLight.position.set(10, 10, 10);
scene.add(ambientLight);

var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 10);
hemiLight.position.set(10, 10, 10);
scene.add(hemiLight);

/* Main function (main loop at 60FPS) */
function main() {
    renderer.render(scene, camera);
    if (model != undefined) {
        model.scene.rotation.y = model.scene.rotation.y + 0.1;
    }
    TWEEN.update();
    requestAnimationFrame(main);
}

main();
