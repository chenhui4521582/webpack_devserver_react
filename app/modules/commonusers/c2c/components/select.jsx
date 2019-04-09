/*======== React ======== */
import React, {Component} from 'react';

/*======== Antd ======== */
import {Input,Select,Button} from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;


class Template extends Component {
    constructor(props) {
        super(props)
        this.state={
            complainType:''
        }
    }
    inputSelectChange(event){
        this.setState({
            complainType:event
        },res=>{
            console.log(this.state)
        })
    }
    render() {
        const {_receiveData} = this.props;
        return(
            <div className="select_head">
                <InputGroup compact>
                    <Select defaultValue="选择买方/卖方申述" style={{width:'170px'}} onChange={this.inputSelectChange.bind(this)} name="inputKey">
                        <Option value="">选择买方/卖方申述</Option>
                        <Option value="BUY">买方</Option>
                        <Option value="SELL">卖方</Option>
                    </Select>
                    <Button type="primary" icon="search" style={{marginRight:10}} onClick={()=>{
                        _receiveData(this.state)
                    }}>搜索</Button>
                </InputGroup>
            </div>
        )
    }
}

export default Template;