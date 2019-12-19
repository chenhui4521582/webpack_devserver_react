import React, {Component} from 'react'
import './index.css'

import HelloWord from './components/helloword'

class Index extends Component {
    constructor() {
        super()
        this.state = {
            message: 11,
            childrenMessage: '',
            stateMessage: '11111'
        }
    }
    handleClick() {
      this.setState(res=> ({
        message: 222
      }))
    }
    getChildrenMessage(data) {
      this.setState(res=>({
        childrenMessage: data
      }))
    }

    updateStateMessage(data) {
      this.setState(res=>({
        stateMessage: data
      }))
    }

    
    componentDidMount() {
      /** 相当于beforMount **/
    }
    componentWillMount() {
      /** 相当于mounted **/
    }
    componentWillReceiveProps() {
      /** 相当于watch **/
    }
    componentWillUnmount() {
      /** 相当于Destroy **/
    }
    componentWillUpdate() {
      /** 相当于updated **/
    }
    shouldComponentUpdate() {
      /* 这个就比较特殊了*/
    }

    render() {
        return (
            <div className="index">
                <div className="title">首页</div>
                <div className="parentComponent">
                  <p>我是父组件</p>
                  <p>子组件传递回来的值: {this.state.childrenMessage}</p>
                  <button onClick={this.handleClick.bind(this)}>改变传递到子组件的值</button>
                </div>
                <HelloWord text={this.state.message} getChildrenMessage={this.getChildrenMessage.bind(this)}/>
                <div className="imgs">
                  <div className="img1"></div>
                  <div className="img2"></div>
                  <div className="img3"></div>
                </div>
                <div className="state">
                  <p>状态机： {this.state.stateMessage}</p>
                  <button onClick={this.updateStateMessage.bind(this, 100)}>更新状态机</button>
                </div>
            </div>
        )
    }
}
export default Index