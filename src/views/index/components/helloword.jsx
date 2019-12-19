import React, { Component } from 'react'

class HelloWord extends Component {
  constructor(props) {
    super(props)
  }
  handleClick() {
    this.props.getChildrenMessage('hello')
  }
  render() {
    return (
      <div className="children">
        <p>我是子组件</p>
        <p>父组件传递来的值：{this.props.text}</p>
        <button onClick={this.handleClick.bind(this)}>传递数据'hello'到父组件</button>
      </div>
      

    )
  }
}

export default HelloWord