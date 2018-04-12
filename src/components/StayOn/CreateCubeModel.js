import * as THREE from 'three';
import OrbitControls  from 'three-orbitcontrols';
// import DragControls from 'three-dragcontrols';

function CubeModel(platForm) {
  if (typeof platForm !== 'string') {
    throw new Error('需传入元素节点id')
  }

  this.camera = null;
  this.scence = null;
  this.renderer = null;
  this.platForm = document.getElementById(platForm);
  this.width = this.platForm.clientWidth;
  this.height = this.platForm.clientHeight;

  this.onWindowResize = function() {
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height );
  }
  this.init();
}

CubeModel.prototype.init = function () {
  var _this = this;
  _this.setScene();
  _this.setCamera();
  _this.setRenderer();
  window.addEventListener( 'resize', _this.onWindowResize.bind(this), false );
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

  var  group = new THREE.Group();
  var _this = this;

  data.forEach(function(item, index) {
    var cubeWidth = item.width;
    var coordinates = item.coordinates;
    var geometry = new THREE.BoxGeometry(cubeWidth, cubeWidth, cubeWidth);
    var material = new THREE.MeshBasicMaterial({ map: createtexture(item.bgColor, item.lineColor) });
    var cube = new THREE.Mesh(geometry, material);
    var position = cube.position;

    position.x = coordinates[0];
    position.y = coordinates[1];
    position.z = coordinates[2];

    group.add(cube);
  })

  group.position.x = -50;
  group.position.y = -100;

  this.scene.add(group);
  this.render();
  // 移动控制点，由于引入了轨道控制导致效果
  // this.DragControls();
  this.setControls();
}
// 照相机
CubeModel.prototype.setCamera = function () {
  var width = this.width, 
  height = this.height;

  this.camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
  this.camera.position.z = 500;
}
// 场景
CubeModel.prototype.setScene = function () {
  this.scene = new THREE.Scene();
}
// 渲染器
CubeModel.prototype.setRenderer = function () {
  var _this = this;

  _this.renderer = new THREE.WebGLRenderer();
  _this.renderer.setClearColor(0xe8e8e8);
  _this.renderer.setPixelRatio( window.devicePixelRatio );
  _this.renderer.setSize( _this.width, _this.height );
  _this.platForm.appendChild( _this.renderer.domElement );
}
// 设置轨道控制
CubeModel.prototype.setControls = function () {
  var _this = this;

  _this.controls = new OrbitControls( _this.camera, _this.renderer.domElement );
  _this.controls.addEventListener( 'change', _this.render.bind(this) );
  _this.controls.enableDamping = true;
  // 旋转灵敏度
  _this.controls.dampingFactor = 1;
  // 禁止缩放
  _this.controls.enableZoom = false;
  console.log(_this.controls)
}

CubeModel.prototype.render = function (e) {
  this.renderer.render( this.scene, this.camera ); 
}

// CubeModel.prototype.DragControls = function () {
//   var dragControls = new DragControls(this.dragGroup, this.camera, this.renderer.domElement);

//   dragControls.addEventListener( 'dragstart', function ( event ) { this.controls.enabled = false; }.bind(this));
// 	dragControls.addEventListener( 'dragend', function ( event ) { this.controls.enabled = true; }.bind(this) );
// }

function cusotmTexture (opts) {
  var bgColor = opts.bgColor || 'black',
    lineColor = opts.lineColor || 'green',
    lineWidth = opts.lineWidth || 5,
    width = opts.width || 64,
    height = opts.width || 64,
    canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

  canvas.width = width
  canvas.height = height

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

function createtexture (bgColor, lineColor) {
  var texture = new THREE.Texture(cusotmTexture({
    lineColor: lineColor, 
    bgColor: bgColor
  }))
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