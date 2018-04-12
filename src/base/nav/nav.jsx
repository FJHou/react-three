import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/nav.less';

class Nav extends Component {
  
  render() {
    return <nav className="navWrapper">
      <div className="navLayer clearfix">
        <div className="logo"><img src={require('../../assets/img/fg-logo.png')} alt="精锐教育"/></div>
        <ul className="nav-list clearfix">
          <li><Link to="/homePage">个人主页</Link></li>
          <li><Link to="/stayOn">待上课程</Link></li>
          <li><Link to="/hasBeenOn">已上课程</Link></li>
          <li><Link to="/test">水平测试</Link></li>
        </ul>
      </div>
    </nav>
  }
}

export default Nav