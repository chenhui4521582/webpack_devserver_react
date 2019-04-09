/*======== React ======== */
import React, {Component} from 'react';

/*======== Antd ======== */
import {Button} from 'antd';

/*======== 工具 ======== */
import util from '../../../../util/uitl'
import Service from '../../../../config/service/service_commonusers'

/*======== Component ======== */
import Breadcrumb from '../../../../components/breadcrumb/main'
import Message from '../../../../components/message/main'
import ModalPwd from '../../../../components/modal/modal_pwd/modal_pwd'
import Basic from './components/basic'
import Order from './components/order'
import Payment from './components/payment'
import Edit from './components/edit'

class Template extends Component {
    constructor(props) {
        super(props)
        this.state={
            list:{}
        }
    }

    init(){
        let params={
            complainId: util.Qstring().id
        },header={};
        Service.C2C_detail(params,header).then(res=>{
            if(res.code==window.CODE.SUCCESS){
                this.setState({
                    list:res.data
                })
            }else {
                Message.warning(res.msg,2)
            }

        })
    }

    onOk(data){
        let {type} = this.state,
            {payPwd} = data;
        type == 'closeForce' ? this.closeForce(payPwd) : this.transforForce(payPwd);
    }

    transforForce(payPwd){
        let {id} = this.state,
        params = {
            complainId:id
        },header ={
            'isNeedPassword':true,
            'login-password':payPwd
        }
        Service.C2C_transforForce(params,header).then(res=>{
            if(res.code == window.CODE.SUCCESS){
                Message.success('成功',2)
            }else {
                Message.warning(res.msg,2)
            }
            this.refs.modalPwd.handleCancle();
        })
    }

    closeForce(payPwd){
        let {id} = this.state,
        params = {
            complainId:id
        },header ={
            'isNeedPassword':true,
            'login-password':payPwd
        }
        Service.C2C_closeForce(params,header).then(res=>{
            if(res.code == window.CODE.SUCCESS){
                Message.success('成功',2)
            }else {
                Message.warning(res.msg,2)
            }
            this.refs.modalPwd.handleCancle();
        })
        this.refs.modalPwd.handleCancle();
    }

    showModal(data){
        let {type,id} = data;
        this.setState({
            title:type=='closeForce' ? 'C2C-强制关闭订单' : 'C2C-强制打币',
            id,
            type
        })
        this.refs.modalPwd.showModal();
    }

    componentWillMount() {
        this.init()
    }

    render() {
        const {list} = this.state,
            {history} = this.props;
        return(
            <div className="C2C_detail">
                <Breadcrumb breadcrumb={{childName:'详情',parentName:'C2C'}}/>
                <div className="center">
                    <Basic _list={list}/>
                    <Payment _list={list}/>
                    <Order _list={list}/>
                    <Edit
                        _list={list}
                        _history={history}
                        _show={this.showModal.bind(this)}
                    />
                    <ModalPwd
                        _title = {this.state.title}
                        _onOk={this.onOk.bind(this)}
                        ref="modalPwd"
                    />
                </div>
            </div>
        )
    }
}

export default Template;