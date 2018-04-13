import React, { Component } from 'react';
import CubeModel from './CreateCubeModel';
import io from 'socket.io-client';
let user2 = io('ws://192.168.0.25:4000/');

class PlatForm extends Component {
  constructor () {
    super();

    this.state = {
      camera: null,
      model: null,
      socket: null,
      cubeModel2: null
    }
  }

  componentDidMount () {
    this.createCube();
    
  }

  socketLink () {
    let model2 = this.state.cubeModel2
    let camera2 = model2.camera
    user2.on('rotating', (res) => {
      
      /**
       * 成功！！！！！↓↓↓↓↓↓↓
       */
      camera2.position.x = res.x;
      camera2.position.y = res.y;
      camera2.position.z = res.z;
      model2.init();
      /**
       * 成功！！！！！↑↑↑↑↑↑↑
       */     

      /**
       * 离成功最近的一次 ↓↓↓↓↓↓↓
       */
      // console.log(model.group.rotation)
      // model2.group.rotation.x = -res._x
      // model2.group.rotation.y = -res._y
      // model2.group.rotation.z = -res._z
      // model2.render()
      /**
       * 离成功最近的一次 ↑↑↑↑↑↑↑
       */
    })
  }

  createCube () {
    let cubeModel = new CubeModel('container');
    let cubeModel2 = new CubeModel('container2');
    this.setState({
      model: cubeModel,
      cubeModel2: cubeModel2
    })
    // this.state.cubeModel2 = cubeModel2
    var info = [
      {
        bgColor: '#DC143C',
        lineColor: '#000',
        coordinates: [0, 0, 0],
        width: 100
      },
      {
        bgColor: '#DC143C',
        lineColor: '#000',
        coordinates: [100, 0, 0],
        width: 100
      },
      {
        bgColor: '#DC143C',
        lineColor: '#000',
        coordinates: [0, 0, -100],
        width: 100
      },
      {
        bgColor: '#DC143C',
        lineColor: '#000',
        coordinates: [0, 100, 0],
        width: 100
      },
      {
        bgColor: '#DC143C',
        lineColor: '#000',
        coordinates: [100, 0, -100],
        width: 100
      },
      {
        bgColor: '#DC143C',
        lineColor: '#000',
        coordinates: [100, 100, -100],
        width: 100
      },
      {
        bgColor: '#DC143C',
        lineColor: '#000',
        coordinates: [0, 100, -100],
        width: 100
      },
      {
        bgColor: '#DC143C',
        lineColor: '#000',
        coordinates: [0, 200, -100],
        width: 100          
      }
    ];
    cubeModel.createCubeModel(info)
    cubeModel2.createCubeModel(info)

    setTimeout(() => {
      this.socketLink()
    }, 20)
    
  }

  saveCamera () {
    let camera = this.state.model.getCameraClone()
    this.setState({
      camera: camera
    })
    console.log(camera)
  }

  setCamera () {
    let camera = this.state.camera;
    this.state.model.setCameraClone(camera);
    this.state.cubeModel2.setCameraClone(camera)
  }

  render () {
    return <div>
      <div id="container" className="container" style={{width: 1000, height: 500,
      margin:'auto'}}></div>
      <div id="container2" className="container" style={{width: 1000, height: 500,
      margin:'auto'}}>

      </div>
        <button onClick={() => { this.saveCamera() }}>保存相机</button>
        <button onClick={() => { this.setCamera() }}>设置相机</button>
    </div>
  }
}

export default PlatForm;