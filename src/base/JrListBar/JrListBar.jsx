import React, { Component } from 'react';
import './style/JrListBar.less'

class JrListBar extends Component {
  render () {
    return <div className="jr-list-bar-view">
      <p>
        <span className="jr-list-bar-name">{this.props.name}</span>
        <time className="jr-list-bar-date">{this.props.content}</time>
        <time className="jr-list-bar-time">{this.props.extra}</time>
      </p>
    </div>
  }
}

export default JrListBar;