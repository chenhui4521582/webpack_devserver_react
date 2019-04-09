/*======== React ======== */
import React, {Component} from 'react';

/*======== Antd ======== */
import {Input,Button,Icon} from 'antd';
const InputGroup = Input.Group

/*======== Components ======== */
import Table from './components/table'

/*======== Service ======== */
import Service from '../../../config/service/service_commonusers'
import Message from '../../../components/message/main'
import Breadbrumb from '../../../components/breadcrumb/main'
import ModalPwd from '../../../components/modal/modal_pwd/modal_pwd'

/*======== Css ======== */
import './style.scss'

class Template extends Component {
    constructor(props) {
        super(props)
        this.state={
            list:[],
            value:'',
            title:'',
            id:'',
            type:''
        }
    }
    handleChange(event){
        this.setState({
            value:event.target.value
        })
    }

    remove(payPwd){
        let params = {
                uid: this.state.id
            },
            header = {
                'isNeedPassword':true,
                'login-password':payPwd
            }
        Service.removeSymbolWithList(params,header).then(res=>{
            if(res.code == window.CODE.SUCCESS){
                Message.warning('删除白名单成功',2)
                this.searchList()
            }else{
                Message.warning(res.msg,2)
            }
            this.refs.modalpwd.handleCancle();
        })
    }

    add(payPwd){
       let params = {
                uid: this.state.value
            },
            header = {
                'isNeedPassword':true,
                'login-password':payPwd
            }
        Service.addSymbolWithList(params,header).then(res=>{
            if(res.code == window.CODE.SUCCESS){
                Message.warning('添加白名单成功',2)
                this.searchList()
            }else{
                Message.warning(res.msg,2)
            }
            this.refs.modalpwd.handleCancle();
        })
    }

    searchList(){
        let params = {
                pageNo: 1,
                pageSize: 100
            },
            header={};
        Service.symbolWithList(params,header).then(res=>{
            if(res.code == window.CODE.SUCCESS){
                this.setState({
                    list:res.data.list
                })
            }else{
                Message.warning(res.msg,2)
            }
        })
    }

    show(data){
        const {type='',id=''} = data;
        let {value} = this.state;
        if(type=='add'&&!value){
            Message.warning('请输入UID',1)
            return false
        }
        this.setState({
            type,
            id,
            title:type == 'add' ? '添加免手续白名单' : '删除免手续白名单'
        })
        this.refs.modalpwd.showModal()
    }

    onOK(data){
        let{payPwd} = data;
        const {type} = this.state;
        type == 'add' ? this.add(payPwd) : this.remove(payPwd)
    }

    componentDidMount() {
        this.searchList();
    }

    render() {
        const {list,value,title} = this.state;
        return(
            <div className="symbol_white">
                <Breadbrumb breadcrumb={{parentName:'用户管理',childName:'免手续费名单'}}/>
                <div className="center">
                    <div className="add_list">
                        <InputGroup compact>
                            <Input style={{width:'20%'}}
                                   placeholder="请输入UID"
                                   value={value}
                                   name="inputValue"
                                   onChange={this.handleChange.bind(this)}
                            />
                            <Button type="primary" onClick={()=>{this.show({type:'add'})}}>
                                添加
                                <Icon type="plus-circle" />
                            </Button>
                        </InputGroup>
                    </div>
                    <div className="symbol_white_list">
                        <Table
                            _list={list}
                            _show={this.show.bind(this)}
                        />
                        <ModalPwd
                            ref="modalpwd"
                            _title={title}
                            _onOk={this.onOK.bind(this)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Template;