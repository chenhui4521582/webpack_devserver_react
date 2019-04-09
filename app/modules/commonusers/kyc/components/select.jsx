/*======== React ======== */
import React, {Component} from 'react';

/*======== Antd ======== */
import {Input,Select,Button,Icon,} from 'antd';
const InputGroup = Input.Group
const Option = Select.Option;

/*======== Component ======== */
import Message from '../../../../components/message/main'
import Service from '../../../../config/service/service_commonusers'

class Template extends Component {
    constructor(props) {
        super(props)
        this.state = {
            key:'uid',
            value:'',
        }
    }
    selectChange(e){
        this.setState({
            key:e
        })
    }
    inputChange(event){
        this.setState({
            value:event.target.value
        })
    }
    param(){
        let params = {
            pageNo: 1,
            pageSize: 100,
            status: 'INIT'
        }
        let{key,value} = this.state;
        if(key&&value){
            params[key] = value;
        }
        return params;
    }
    init(){
        let params =this.param();
        Service.kyc_list(params).then(res=>{
            if(res.code == window.CODE.SUCCESS){
                if(res.data){
                    //传递数据到父组件
                    const {_receiveData} = this.props;
                    res.data.list.length>0&&_receiveData(res.data.list)
                }
            }else {
                Message.warning(res.msg,2)
            }
        })
    }
    submit(){
        this.init();
    }
    componentDidMount() {
        this.init();
    }
    render() {
        return(
            <InputGroup compact>
                <Select defaultValue='uid' style={{width:'10%'}} onChange={this.selectChange.bind(this)}>
                    <Option value="uid">uid</Option>
                    <Option value="email">邮箱</Option>
                </Select>
                <Input style={{width:'20%'}} placeholder="按类别搜索信息" value={this.state.value} name="inputValue" onChange={this.inputChange.bind(this)}/>
                <Button type="primary" onClick={this.submit.bind(this)} icon="search">搜索</Button>
            </InputGroup>
        )
    }
}

export default Template;