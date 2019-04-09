/*======== React ======== */
import React, {Component} from 'react';

/*======== Antd ======== */
import {Button,Table} from 'antd';

/*======== Component ======== */
import Pagination from '../../../../components/pagination/main'
import ModalPwd from '../../../../components/modal/modal_pwd/modal_pwd'
import Message from '../../../../components/message/main'

/*======== Service ======== */
import Service from '../../../../config/service/service_admin'

class Template extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            total:0,
            loading: true,
            title:'',
            type:'',
            uid:''
        }
        this.columns = [
            {title: 'UID', key: 'uid', dataIndex: 'uid',width:'15%'},
            {title: '用户账号', key: 'account', dataIndex: 'account',width:'15%'},
            {title: '角色权限', key: 'role', dataIndex: 'role', width:'15%'},
            {
                title: '状态',
                key: 'locked',
                dataIndex: 'locked',
                width:'15%',
                render:(text)=>{
                    if(text=='UNLOCK'){
                        return(
                            <span style={{color:'#5cb85c'}}>可用</span>
                        )
                    }else{
                        return(
                            <span style={{color:'#d9534f'}}>锁定</span>
                        )
                    }
                }


            },
            {
                title: '操作',
                key: 'edit',
                dataIndex: 'edit',
                render:(text,row)=>(
                    text.map((item,index)=>{
                        switch (index){
                            case 0:
                                return <Button
                                            type="dashed"
                                            size="small"
                                            key={index}
                                            style={{marginRight:'10px'}}
                                            href={`#/admin/user/detail?uid=${row.uid}`}
                                        >
                                            {item}
                                        </Button>
                            case 1:
                                return <Button
                                            type="primary"
                                            size="small"
                                            key={index}
                                            style={{marginRight:'10px'}}
                                            icon='tool'
                                            onClick={()=>{
                                                this.show({type:'resetPwd',uid:row.uid})
                                            }}
                                        >
                                            {item}
                                        </Button>
                            case 2:
                                return <Button
                                            type="primary"
                                            size="small"
                                            key={index}
                                            style={{marginRight:'10px'}}
                                            icon='tool'
                                            onClick={()=>{
                                                this.show({type:'resetGoogle',uid:row.uid})
                                            }}
                                        >
                                            {item}
                                        </Button>
                            case 3:
                                if(row.locked=='UNLOCK'){
                                    return <Button
                                        type="danger"
                                        size="small"
                                        key={index}
                                        style={{marginRight:'10px'}}
                                        icon='tool'
                                        onClick={()=>{
                                            this.show({type:'lock',uid:row.uid})
                                        }}
                                    >
                                        锁定
                                    </Button>
                                }else{
                                    return <Button
                                        type="primary"
                                        size="small"
                                        key={index}
                                        style={{marginRight:'10px',background:'#5cb85c'}}
                                        icon='tool'
                                        onClick={()=>{
                                            this.show({type:'unlock',uid:row.uid})
                                        }}
                                    >
                                        解锁
                                    </Button>
                                }


                            default:
                                break
                        }
                    })
                )
            },
        ]
    }

    extendList(list){
        list.map((item,index)=>{
            item.key=index;
            item.edit = ['登录信息','重置密码','重置谷歌验证','锁定']
        })
        this.setState({
            list,
            loading:false
        })
    }

    resetPwd(payPwd){
        let {uid} = this.state,
            params = {
                adminId: uid,
                loginPassword: "123456"
            },
            header = {
                'isNeedPassword':true,
                'login-password': payPwd
            };
        Service.reset_pwd(params,header).then(res=>{
            if(res.code == window.CODE.SUCCESS){
                Message.success('重置用户密码成功',1)
                this.props._searchList()
            }else{
                Message.warning(res.msg,1)
            }
            this.refs.modalpwd.handleCancle()
        })
    }

    resetGoogle(payPwd){
        let {uid} = this.state,
            params = {
                adminId:uid
            },
            header = {
                'isNeedPassword':true,
                'login-password':payPwd
            };
        Service.reset_google(params,header).then(res=>{
            if(res.code == window.CODE.SUCCESS){
                Message.success('重置用户谷歌验证成功',1)
                this.props._searchList()
            }else{
                Message.warning(res.msg,1)
            }
            this.refs.modalpwd.handleCancle()
        })
    }

    lock(payPwd){
        let {uid} = this.state,
            params = {
                uid
            },
            header = {
                'isNeedPassword':true,
                'login-password':payPwd
            };
        Service.user_lock(params,header).then(res=>{
            if(res.code == window.CODE.SUCCESS){
                Message.success('锁定当前用户成功',1)
                this.props._searchList()
            }else{
                Message.warning(res.msg,1)
            }
            this.refs.modalpwd.handleCancle()
        })
    }

    unlock(payPwd){
        let {uid} = this.state,
            params = {
                uid
            },
            header = {
                'isNeedPassword':true,
                'login-password':payPwd
            };
        Service.user_unlock(params,header).then(res=>{
            if(res.code == window.CODE.SUCCESS){
                Message.success('解除当前用户锁定状态成功',1)
                this.props._searchList()
            }else{
                Message.warning(res.msg,1)
            }
            this.refs.modalpwd.handleCancle()
        })
    }

    _onOk(data){
        let {payPwd} = data,
            {type} = this.state;

            type == 'resetPwd'
                ?
            this.resetPwd(payPwd)
                :
            type == 'resetGoogle'
                ?
            this.resetGoogle(payPwd)
                :
            type == 'lock'
                ?
            this.lock(payPwd)
                :
            this.unlock(payPwd)
    }

    show(data){
        let {type,uid} = data,
        title = type =='resetPwd'
                ?
            '重置用户密码'
                :
            type=='resetGoogle'
                ?
            '重置用户谷歌验证'
                :
            type=='lock'
                ?
            '锁定当前用户'
                :
            '解除当前用户锁定状态';
        this.setState({
            title,
            type,
            uid
        })
        this.refs.modalpwd.showModal()
    }

    componentWillReceiveProps(props) {
        const {_list} = props;
        this.extendList(_list)
    }

    render() {
        const {list,loading,title} = this.state,
              {_paginationChange,_total} = this.props
        return(
            <div className="panel">
                <Table
                    columns={this.columns}
                    dataSource={list}
                    loading={loading}
                    bordered
                    pagination={false}
                />
                <Pagination
                    total={_total}
                    propsFn={_paginationChange}
                />
                <ModalPwd
                    ref="modalpwd"
                    _title = {title}
                    _onOk={this._onOk.bind(this)}
                />

            </div>
        )
    }
}

export default Template;