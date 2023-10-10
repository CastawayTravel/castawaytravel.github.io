/* Global variables */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
/* Navy blue */
const backgroundColor = new THREE.Color(0x12174a);
/* Test material */
const testMaterial = new THREE.MeshStandardMaterial({color: 0xFF0000, wireframe: true});
const renderer = new THREE.WebGLRenderer();
/* Model (.glb) */
var model = undefined;
/* ~~~~~~~~~~~~~~~~ */

function setup() {
    /* Show loader */
    document.getElementById("page-loader").style.display = "inline-block";
    document.getElementById("model-canvas").style.display = "none";

    
    /* Scene & camera settings */
    camera.position.y = 2;
    camera.position.z = 3;
    camera.lookAt(new THREE.Vector3(0, 1, 0));

    /* Renderer settings */
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRation);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.physicallyCorrectLights = true;
    renderer.setClearColor(backgroundColor);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    /* Load model */
    const loader = new THREE.GLTFLoader();
    loader.load('../assets/models/Astronaut.glb', function (gltf) {
        model = gltf;
        gltf.scene;
        gltf.material;
        scene.add(gltf.scene);

        /* Hide the loader */
        document.getElementById("page-loader").style.display = "none";
        document.getElementById("model-canvas").style.display = "display";


        /* Show the rendered three.js canvas */
        document.body.appendChild(renderer.domElement);
    }, function (xhr) {
        console.log(`Model ${Math.round((xhr.loaded / xhr.total * 100))}% loaded`)
    }, function (error) {
	    console.error(error);
    });

    /* Lights */
    const ambientLight = new THREE.AmbientLight(0xffaaff, 4);
    ambientLight.position.set(10, 10, 10);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 10);
    hemiLight.position.set(10, 10, 10);
    scene.add(hemiLight);

}

function animate() {
    if (model != undefined) {
        /* Only render it if model is loaded */
        renderer.render(scene, camera);
        model.scene.rotation.y = model.scene.rotation.y + 0.1;
    }
    TWEEN.update();
    requestAnimationFrame(animate);
}

/* Setting */
setup();

/* Main loop (60FPS) */
animate();
