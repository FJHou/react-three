import React, { Component } from 'react';
import CubeModel from '../StayOn/CreateCubeModel';
import io from 'socket.io-client';
const socket = io('ws://localhost:4000/');

class HasBeenOn extends Component {

  componentDidMount () {
    this.createCube(); 
  }

  createCube () {
    let cubeModel2 = new CubeModel('container2');
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

    cubeModel2.createCubeModel(info);
    const camera2 = cubeModel2.camera;

    socket.on('rotating', (res) => {
      // console.log(res)
      /**
       * 成功！！！！！↓↓↓↓↓↓↓
       */
      // console.log(model2.controls);
      camera2.position.set(res.x, res.y, res.z)
      // model2.controls.update()
      cubeModel2.update();
      /**
       * 成功！！！！！↑↑↑↑↑↑↑
       */     
    })
  }
  render () {
    return <div>
      <h1>已上课程</h1>
      <div id="container2" 
          className="container" 
          style={{width: 1000, height: 500, margin:'auto'}}>
      </div>
    </div>
  }
}

export default HasBeenOn