/*======== React ======== */
import React, {Component} from 'react';

/*======== Antd ======== */
import {Input,Select,Button} from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;

/*======== 工具 ======== */
import Service from '../../../../config/service/service_commonusers'

/*======== Component ======== */
import ComponentMessage from '../../../../components/message/main'
import ComponentTime from '../../../../components/component_time/main'

/*======== Css ======== */
import '../style.scss'

class Template extends Component {
    constructor(props) {
        super(props)
        this.state={
            inputValue:'',
            inputKey:'uid',
            sortOrder: 'desc',
            sortProp: 'create_date',
            startDate: '',
            endDate: '',
        }
    }

    /*======== 输入框 ======== */
    inputValueChange(event){
        const value = event.target.type == 'checkbox' ? event.target.checked:event.target.value,
            stateKey = event.target.name;
        this.setState(res=>({
            [stateKey]:value
        }))
    }

    /*======== 类型选择框 ======== */
    inputKeyChange(event){
        this.setState({
            inputKey:event
        })
    }

    /*======== 时间选择框 ======== */
    time_onChange(date,dateString){
        this.setState(res=>({
            startDate:`${dateString[0]} 00:00:00`,
            endDate: `${dateString[1]} 00:00:00`
        }))
    }

    /*======== 导出数据 ======== */
    exportUser(){
        let param = {
            startDate:this.state.startDate,
            endDate:this.state.endDate
        };
        Service.exportUser(param).then(res=>{
            if(res.code === window.CODE.SUCCESS){
                window.location.href = `${window.location.origin}${res.data}`
            }else {
                ComponentMessage.warning(res.msg,3)
            }
        })

    }

    render() {
        const {_submit} = this.props;
        return(
            <div className="select_head">
                <InputGroup compact>
                    <Select defaultValue="uid" style={{width:'10%'}} onChange={this.inputKeyChange.bind(this)} name="inputKey">
                        <Option value="email">邮箱</Option>
                        <Option value="uid">uid</Option>
                        <Option value="fullname">姓名</Option>
                    </Select>
                    <Input style={{ width: '20%' }} placeholder="按类别搜索信息" name="inputValue" onChange={this.inputValueChange.bind(this)} value={this.state.inputValue}/>
                    <ComponentTime time_propsFn={this.time_onChange.bind(this)} />
                    <Button type="primary" icon="search" style={{marginRight:10}} onClick={()=>{
                        _submit(this.state)
                    }}>搜索</Button>
                </InputGroup>
                <Button type="primary" onClick={this.exportUser.bind(this)}>用户导出数据</Button>
            </div>
        )
    }
}

export default Template;