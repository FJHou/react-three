import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import Nav from './base/nav/nav';
import HomePage from './components/HomePage/HomePage';
import PlatForm from './components/StayOn/StayOn';
// function HomePage () {
//   return <h1>个人主页</h1>
// }

// function CourseStayOn () {
//   return <h1>待上课程</h1>
// }

function CourseHasBeenOn () {
  return <h1>已上课程</h1>
}

function Test () {
  return <h1>水平测试</h1>
}

ReactDOM.render(
  (<BrowserRouter>
      <div>
        <Nav></Nav>
        <Switch>
          <Route path="/homePage" component={HomePage}></Route>
          <Route path="/stayOn" component={PlatForm}></Route>
          <Route path="/hasBeenOn" component={CourseHasBeenOn}></Route>
          <Route path="/test" component={Test}></Route>
        </Switch>
      </div>
    </BrowserRouter>),
  document.getElementById('root')
);

