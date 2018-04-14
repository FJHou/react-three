import * as THREE from 'three';
import OrbitControls  from 'three-orbitcontrols';
// import DragControls from 'three-dragcontrols';
import io from 'socket.io-client';
const socket = io('ws://localhost:4000/');

function CubeModel(platForm) {
  if (typeof platForm !== 'string') {
    throw new Error('需传入元素节点id')
  }

  this.camera = null;
  this.scence = null;
  this.renderer = null;
  this.controls = null;
  this.platForm = document.getElementById(platForm);
  this.width = this.platForm.clientWidth;
  this.height = this.platForm.clientHeight;
  // 存放立方体的组。
  this.group = new THREE.Group();

  this.onWindowResize = function() {
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height );
  }
  this.init();
}

CubeModel.prototype.init = function () {
  this.initScene();
  this.initCamera();
  this.initRenderer();
  this.initControls();
  this.render();
  window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
}
// 场景
CubeModel.prototype.initScene = function () {
  this.scene = new THREE.Scene();
}
// 照相机
CubeModel.prototype.initCamera = function () {
  var width = this.width, 
      height = this.height;

  this.camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
  this.setCameraConf();
}
// 渲染器
CubeModel.prototype.initRenderer = function () {
  // antialias:true 开启抗锯齿
  this.renderer = new THREE.WebGLRenderer({antialias:true});
  this.platForm.appendChild( this.renderer.domElement );
  this.setRendererConf()
}
// 初始化轨道控制
CubeModel.prototype.initControls = function () {
  this.controls = new OrbitControls( this.camera, this.renderer.domElement );
  this.controlAddListener( 'change', this.render.bind(this) );
  this.setControlsConf();
} 
CubeModel.prototype.render = function (e) {
  this.renderer.render( this.scene, this.camera ); 
}
CubeModel.prototype.update = function() {
  this.initControls();
  this.render();
}
/**
 * 要创建的模型的数据，数组每一项是一个对象，用来描述
 * 每一项的颜色/坐标/长宽高。
 * 形式如：[{color: '#FFB6C1', coordinates:[x, y, z], width: 100}]
 * @param {Array} data 
 */

CubeModel.prototype.createCubeModel = function (data) {
  if (!data || !isArray(data)) {
    throw new Error('传入数据类型错误');
  } else if (!data.length) {
    throw new Error('传入数据不能为空');
  }

  var cubeWidth, 
      coordinates, 
      geometry,
      material, 
      cube, 
      position;
  // 循环创建cube
  data.forEach((item, index) => {
    cubeWidth = item.width;
    coordinates = item.coordinates;
    // 创建几何体
    geometry = new THREE.BoxGeometry(cubeWidth, cubeWidth, cubeWidth);
    // 创建纹理，纹理是用createtexture画的canvas
    material = new THREE.MeshBasicMaterial({ 
      map: createtexture(item.bgColor, item.lineColor, item.width)
    });
    // 创建网孔
    cube = new THREE.Mesh(geometry, material);
    position = cube.position;
    // coordinates为传入的坐标系，是一个数组，参数为[x, y, z]坐标系
    position.x = coordinates[0];
    position.y = coordinates[1];
    position.z = coordinates[2];

    this.group.add(cube);
  })

  // 坐标修正，因为模型是根据中心点建立的，这就造成了模型建立后
  // 其中心点不在屏幕中心，下列x,y是修正值。
  var x = Math.max.apply(Math, data.map((item, index) => {
    return item.coordinates[0] / 2;
  }))
  var y = Math.max.apply(Math, data.map((item) => {
    return item.coordinates[1] / 2;
  }))

  this.group.position.x = -x;
  this.group.position.y = -y;
  this.scene.add(this.group);
  this.render();
}


CubeModel.prototype.setCameraConf = function () {
  // 设置相机位置以及观察位置
  this.camera.position.x = 200;
  this.camera.position.y = 50;
  this.camera.position.z = 500;
  this.camera.lookAt({
    x: 0,
    y: 0,
    z: 0
  })
}

CubeModel.prototype.setRendererConf = function () {
  this.renderer.setClearColor(0xe8e8e8);
  this.renderer.setPixelRatio( window.devicePixelRatio );
  this.renderer.setSize( this.width, this.height );
}

CubeModel.prototype.setControlsConf = function () {
  this.controls.enableDamping = true;
  // 旋转灵敏度
  this.controls.dampingFactor = 1;
  // 禁止缩放
  this.controls.enableZoom = false;
}

CubeModel.prototype.controlAddListener = function (type, handler) {
  this.controls.addEventListener(type, handler)
}

function cusotmTexture (opts) {
  var bgColor = opts.bgColor || 'black',
      lineColor = opts.lineColor || 'green',
      lineWidth = opts.lineWidth || 5,
      width = opts.width || 100,
      height = opts.width || 100,
      canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');

  canvas.width = width
  canvas.height = width

  if (ctx) {
    ctx.fillStyle = lineColor;
    ctx.fillRect(0, 0, width, height);
    ctx.rect(lineWidth, lineWidth, width - lineWidth * 2, height - lineWidth * 2); 
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = bgColor;
    ctx.strokeStyle = bgColor;
    ctx.stroke();
    ctx.fill();
  } else {
    throw new Error('浏览器不支持canvas')
  }

  return canvas
}

function createtexture (bgColor, lineColor, width) {
  var cav = cusotmTexture({
    lineColor: lineColor, 
    bgColor: bgColor,
    width: width * 1.28
  });
  var texture = new THREE.CanvasTexture(cav)
  texture.needsUpdate = true;

  return texture;
}

function isArray(arg) {
  if (typeof arg === 'object') {
      return Object.prototype.toString.call(arg) === '[object Array]';
  }

  return false;
}

export default CubeModel;