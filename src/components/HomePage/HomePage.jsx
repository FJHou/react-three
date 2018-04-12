import React, { Component } from 'react';
import JrCard from '../../base/JrCard/JrCard';
import JrListBar from '../../base/JrListBar/JrListBar';

class HomePage extends Component {
  constructor () {
    super();
    this.state = {
      classPicker: [
        {
          name: '中班一对六春季1班',
          date: '2018年03月01日~2018年-6月28日',
          time: '每天10:00~11:00',
          checked: false
        },
        {
          name: '中班一对六春季1班',
          date: '2018年03月01日~2018年-6月28日',
          time: '每天10:00~11:00',
          checked: false
        },
        {
          name: '中班一对六春季1班',
          date: '2018年03月01日~2018年-6月28日',
          time: '每天10:00~11:00',
          checked: false
        }
      ]
    }
  }
  render () {
    return <div className="HomePage">
      <JrCard title="选班" 
              content={this.state.classPicker.map((v, i) => {
                return <JrListBar name={v.name}
                          content={v.date}
                          extra={v.time}
                          key={i}>
                </JrListBar>
              })}>
      </JrCard>
      <JrCard title="学习进度"></JrCard>
      <JrCard title="最近待上课程" 
              children={<span className="jr-card-sub-button">更多课程</span>}>
      </JrCard>
      <JrCard title="最近已上课程"
              children={<span className="jr-card-sub-button">更多课程</span>}>
      </JrCard>
    </div>
  }
}

export default HomePage;