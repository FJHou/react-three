import React, { Component } from 'react';
import CubeModel from './CreateCubeModel';
import io from 'socket.io-client';
const socket = io('ws://192.168.0.60:4000/');

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
    // let model2 = this.state.cubeModel2
    // let camera2 = model2.camera
    // socket.on('rotating', (res) => {
    //   // console.log(res)
    //   /**
    //    * 成功！！！！！↓↓↓↓↓↓↓
    //    */
    //   // console.log(model2.controls);
    //   camera2.position.set(res.x, res.y, res.z)
    //   // model2.controls.update()
    //   model2.update();
    //   /**
    //    * 成功！！！！！↑↑↑↑↑↑↑
    //    */     
    // })
  }

  createCube () {
    var info = [
      {
        bgColor: '#DC143C',
        lineColor: '#000',
        coordinates: [0, 0, 0],
        width: 100,
        group: 1,
      },
      {
        bgColor: '#DC143C',
        lineColor: '#000',
        coordinates: [100, 0, 0],
        width: 100,
        group: 1,
      },
      {
        bgColor: '#DC143C',
        lineColor: '#000',
        coordinates: [0, 0, -100],
        width: 100,
        group: 1,
      },
      {
        bgColor: '#DC143C',
        lineColor: '#000',
        coordinates: [0, 100, 0],
        width: 100,
        group: 1,
      },
      {
        bgColor: '#DC143C',
        lineColor: '#000',
        coordinates: [100, 0, -100],
        width: 100,
        group: 1,
      },
      {
        bgColor: '#DC143C',
        lineColor: '#000',
        coordinates: [100, 100, -100],
        width: 100,
        group: 1,
      },
      {
        bgColor: '#DC143C',
        lineColor: '#000',
        coordinates: [0, 100, -100],
        width: 100,
        group: 1,
      },
      {
        bgColor: '#DC143C',
        lineColor: '#000',
        coordinates: [0, 200, -100],
        width: 100,
        group: 2,         
      }
    ];    
    let cubeModel = new CubeModel({
      platForm: 'container',
      data: info,
      selectEle: true,
      canControl: true
    });

    // cubeModel.createCubeModel(info)
    cubeModel.bindEvnet(cubeModel.controls, 'change', function(e) {
      socket.emit('rotate', cubeModel.camera.position);
    })
    // cubeModel.eventListenerAdd(cubeModel.platForm, 'mousedown', (e) => {
    //   console.log(e)
    // })
  }

  studentControl () {
    socket.emit('stcontrol');
  }

  setCamera () {
    // let camera = this.state.camera;
    // this.state.model.setCameraClone(camera);
    // this.state.cubeModel2.setCameraClone(camera)
  }

  render () {
    return <div>
      <div id="container" className="container" style={{width: '100%', height: 500, margin:'auto'}}></div>
      {/* <div id="container2" className="container" style={{width: 1000, height: 500,
      margin:'auto'}}>

      </div> */}
        <button onClick={() => { this.studentControl() }}>启用学生控制</button>
        <button onClick={() => { this.setCamera() }}>设置相机</button>
    </div>
  }
}

export default PlatForm;