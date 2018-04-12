import React, { Component } from 'react';
import './style/JrCard.less';

class JrCard extends Component {
  render () {
    console.log(this.props)
    return <div className="jr-card-view jr-card-hover">
      {this.props.title ? (<h3 className="jr-card-title">
        {this.props.title}
        {this.props.children}
      </h3>) : null}
      {this.props.content}
    </div>
  }
}

export default JrCard;