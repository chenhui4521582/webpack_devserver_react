/*======== React ======== */
import React, {Component} from 'react';

/*======== Antd ======== */
import {Button,Input,Select} from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option

class Template extends Component {
    constructor(props) {
        super(props)
        this.state={
            change:'UNLOCK'
        }
    }
    handleChange(event){
        this.setState({
            lockStatus:event
        })
    }

    render() {
        let {lockStatus} = this.state,
            {_receiveData} = this.props;
        return(
            <div className="panel">
                <InputGroup compact>
                    <Select style={{width:'180px'}} defaultValue="可用" onChange={this.handleChange.bind(this)}>
                        <Option value=''>全部</Option>
                        <Option value='UNLOCK'>可用</Option>
                        <Option value='LOCK'>已锁定</Option>
                    </Select>
                    <Button
                        icon="search"
                        type="primary"
                        onClick={()=>{_receiveData({'lockStatus':lockStatus})}}
                    >
                        搜索
                    </Button>
                </InputGroup>
            </div>
        )
    }
}

export default Template;