/*======== React ======== */
import React, {Component} from 'react';

/*======== Antd ======== */
import {Table,Button} from 'antd';

/*======== Component ======== */
import Pagination from '../../../../components/pagination/main'
import ModalPwd from '../../../../components/modal/modal_pwd/modal_pwd'
import Message from '../../../../components/message/main'
import Edit from './edit'

/*======== Config ======== */
import Conifg from '../config'

/*======== Service ======== */
import Service from '../../../../config/service/service_commonusers'

class Template extends Component {
    constructor(props) {
        super(props)
        this.columns=[
            {title:'申诉时间',dataIndex:'createDate',key:'id'},
            {title:'申诉编号',dataIndex:'complainId',key:'complainId'},
            {title:'原订单编号',dataIndex:'transOrderId',key:'transOrderId'},
            {title:'申诉类型',
                dataIndex:'complainType',
                key:'complainType',
                render:(text,row,index)=>{
                    return Conifg.TRADE_STATUS[text]
                }
            },
            {
                title:'订单状态',
                dataIndex:'transOrderStatus',
                key:'transOrderStatus',
                render:(text,row,index)=>{
                    return Conifg.TRANS_STATUS[text]
                }
            },
            {title:'买家联系方式',dataIndex:'buyPhone',key:'buyPhone'},
            {title:'卖家联系方式',dataIndex:'sellPhone',key:'sellPhone'},
            {title:'申诉原因',dataIndex:'remark',key:'remark'},
            {
                title:'操作',
                dataIndex:'edit',
                key:'edit',
                render:(text,row,index)=>{
                    return <Edit item={row} _history={this.props._history} _show={this.showModal.bind(this)}/>
                }
            }
        ]
        this.state={
            loading:true,
            list:[]
        }
    }
    extendData(data){

        data.map((item,index)=>{
            item.key = index
        })
        this.setState({
            list:data,
            loading:false
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

    componentWillReceiveProps(props){
        const {_list} = props;
        if(_list.length>0){
            this.extendData(_list)
        }
    }

    render() {
        const {_total=0,_paginationChange} = this.props;
        const {list,loading} = this.state;
        return(
            <div className="select_conter">
                <Table
                    columns={this.columns}
                    dataSource={list}
                    bordered={true}
                    size="middle"
                    loading={loading}
                    pagination={false}
                    locale={{emptyText:'暂无数据'}}
                />
                <Pagination
                    total={_total}
                    propsFn={_paginationChange}>
                </Pagination>

                <ModalPwd
                    _title = {this.state.title}
                    _onOk={this.onOk.bind(this)}
                    ref="modalPwd"
                />
            </div>
        )
    }
}

export default Template;