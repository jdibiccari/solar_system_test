var camera, scene, renderer;
var gui, parameters, sphere, light;
init();
animate();

function init(){
 
  //scene
  scene = new THREE.Scene();

  var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;

   //renderer
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(WIDTH, HEIGHT);
  document.body.appendChild(renderer.domElement);
  
  //sphere
  var center = new THREE.Vector3(0,0,0);
  var sphereGeometry = new THREE.SphereGeometry(50, 32, 16);

  //sphere material
  var marsTexture = THREE.ImageUtils.loadTexture('textures/mars_texture.jpg');
  var sphereMaterial = new THREE.MeshLambertMaterial({map: marsTexture});
  sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  scene.add(sphere);

  //camera
  camera = new THREE.PerspectiveCamera(45, WIDTH/HEIGHT, 100, 10000);
  camera.position.y = 160;
  camera.position.z = 100;
  camera.lookAt(sphere.position);
  scene.add(camera);

  //light
  var light = new THREE.PointLight(0xffffff);
  light.position.set(300,300,300);
  scene.add(light);
  

  //skybox
  var skyboxGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
  var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0x19192B, side: THREE.BackSide });
  var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
  scene.add(skybox);

  //controls
  gui = new dat.GUI();
  parameters = {
    rotX: 0, rotY: 0, rotZ: 0
  };

  var sphereX = gui.add(parameters, 'rotX').min(0).max(1).step(0.001);
  var sphereY = gui.add(parameters, 'rotY').min(0).max(1).step(0.001);
  var sphereZ = gui.add(parameters, 'rotZ').min(0).max(1).step(0.001);

  sphereX.onChange(function(value){
    sphere.rotation.x = value;
  });
  sphereY.onChange(function(value){
    sphere.rotation.y = value;
  });
  sphereZ.onChange(function(value){
    sphere.rotation.z = value;
  });

  
  
}

function updateRotation() {
  sphere.rotation.x += parameters.rotX;
  sphere.rotation.y += parameters.rotY;
  sphere.rotation.z += parameters.rotZ;
}



function animate(){
  requestAnimationFrame(animate);
  updateRotation();
  renderer.render(scene,camera);
}