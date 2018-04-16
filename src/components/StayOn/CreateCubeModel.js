import * as THREE from 'three';
import OrbitControls  from 'three-orbitcontrols';
import TWEEN from '@tweenjs/tween.js';
// import DragControls from 'three-dragcontrols';

function CubeModel(opts) {
  if (typeof opts.platForm !== 'string' ) {
    throw new Error('需传入元素节点id');
  }
  if (!document.getElementById(opts.platForm)) {
    throw new Error('未找到该节点');
  }
  this.opts = opts;
  this.platForm = opts.platForm;
  this.camera = null;
  this.scene = null;
  this.renderer = null;
  this.controls = null;
  this.platForm = document.getElementById(opts.platForm);
  this.width = this.platForm.clientWidth;
  this.height = this.platForm.clientHeight;
  // 存放立方体的组。
  this.group = new THREE.Group();

  this.init();
}

CubeModel.prototype.init = function () {
  this.initScene();
  this.initCamera();
  this.initRenderer();
  this.initControls();
  this.createCubeModel(this.opts.data);
  this.animate();
  this.initEvent();
  this.render();
}
CubeModel.prototype.initEvent = function () {
  // 是否能控制视角
  console.log(this.controls)
  if (this.opts.canControl) {
    console.log(this.controls)
    // alert(this.opts.canControl)
    this.bindEvnet(this.controls, 'change', this.render.bind(this));
  }
  // 是否能点击元素进行动画
  if (this.opts.selectEle) {
    let mouse = new THREE.Vector2();
    let raycaster = new THREE.Raycaster();
    let renderOffset = this.renderer.domElement.getBoundingClientRect();
    // console.log(renderOffset);

    this.bindEvnet(this.platForm, 'mousedown', (e) => {
      mouse.x = ( (e.clientX - renderOffset.x) / this.renderer.domElement.clientWidth ) * 2 - 1;
      mouse.y = -(( (e.clientY - renderOffset.y) / this.renderer.domElement.clientHeight ) * 2 - 1);

      raycaster.setFromCamera( mouse, this.camera );
      let intersects = raycaster.intersectObjects(this.group.children);
      
      if (intersects.length > 0) {
        console.log(intersects)
        new TWEEN.Tween( intersects[ 0 ].object.position ).to( {
          x: 10,
          y: 180,
          z: -120
        }, 2000 )
        .easing( TWEEN.Easing.Elastic.Out).start(); 
      }

    })
    // 必须执行这个方法，否则无法适配窗口大小
    window.addEventListener( 'resize', onWindowResize.call(this), false );
  }
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

// 渲染器
CubeModel.prototype.initRenderer = function () {
  // antialias:true 开启抗锯齿
  this.renderer = new THREE.WebGLRenderer({antialias:true});
  this.platForm.appendChild( this.renderer.domElement );
  // render配置
  this.renderer.setClearColor(0xe8e8e8);
  this.renderer.setPixelRatio( window.devicePixelRatio );
  this.renderer.setSize( this.width, this.height );
}

// 初始化轨道控制
CubeModel.prototype.initControls = function () {
  this.controls = new OrbitControls( this.camera, this.renderer.domElement );
  
  // 禁止右键平移物体
  this.controls.enablePan = false;
  
  this.controls.enableDamping = true;
  // 旋转灵敏度
  this.controls.dampingFactor = 1;
  // 禁止缩放
  this.controls.enableZoom = false;
}

// 渲染场景
CubeModel.prototype.render = function (e) {
  // console.log(1)
  this.renderer.render( this.scene, this.camera ); 
}

// 更新视角，这是用来在接收到websocket数据时更新模型的状态。
CubeModel.prototype.update = function() {
  this.initControls();
  this.render();
}

CubeModel.prototype.animate = function(){
  this.render();
  requestAnimationFrame( this.animate.bind(this) );
  TWEEN.update();
}

// 为controler添加监听事件
CubeModel.prototype.bindEvnet = function (target, type, handler) {
  target.addEventListener(type, handler)
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
}

// 当窗口变化时，重置场景的以保证正确显示
function onWindowResize() {
  this.camera.aspect = this.width / this.height;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(this.width, this.height );
}

// 创建canvas
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

// 创建canvas皮肤
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

// function animate() {
  
//   requestAnimationFrame( animate );
//   TWEEN.update();
//   // this.render();

// }

export default CubeModel;