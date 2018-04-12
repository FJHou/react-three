import React, { Component } from 'react';
import CubeModel from './CreateCubeModel';

class PlatForm extends Component {
  componentDidMount () {
    let cubeModel = new CubeModel('container');
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
  }

  render () {
    return <div id="container" className="container" style={{width: 1000, height: 500,
      margin:'auto'}}></div>
  }
}

export default PlatForm;