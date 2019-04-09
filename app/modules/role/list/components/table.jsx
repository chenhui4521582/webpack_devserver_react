/*======== React ======== */
import React, {Component} from 'react';

/*======== Antd ======== */
import {Button,Table} from 'antd';

/*======== Component ======== */
import Pagination from '../../../../components/pagination/main'
import ModalPwd from '../../../../components/modal/modal_pwd/modal_pwd'
import Message from '../../../../components/message/main'

/*======== Service ======== */
import Service from '../../../../config/service/service_role'

class Template extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            total:0,
            loading: true,
            roleId:''
        }
        this.columns = [
            {title: 'ID', key: 'roleId', dataIndex: 'roleId',width:'20%'},
            {title: '角色名称', key: 'roleName', dataIndex: 'roleName',width:'20%'},
            {title: '人数', key: 'count', dataIndex: 'count', width:'20%'},
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
                                            href={`#/role/list/people?roleId=${row.roleId}`}
                                        >
                                            {item}
                                        </Button>
                                break;
                            case 1:
                                return <Button
                                            type="primary"
                                            size="small"
                                            key={index}
                                            style={{marginRight:'10px'}}
                                            icon='tool'
                                            href={`#/role/list/config?roleId=${row.roleId}`}
                                        >
                                            {item}
                                        </Button>
                                break;
                            case 2:
                                return <Button
                                    type="danger"
                                    size="small"
                                    key={index}
                                    style={{marginRight:'10px'}}
                                    icon='tool'
                                    onClick={()=>{
                                        this.show({roleId:row.roleId})
                                    }}
                                >
                                    删除
                                </Button>
                                break;
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
            item.edit = ['人员查看','权限管理','锁定']
        })
        this.setState({
            list,
            loading:false
        })
    }

    remove(payPwd){
        let {roleId} = this.state,
            {_searchList} = this.props,
            params = {
                roleId
            },header = {
                'isNeedPassword':true,
                'login-password':payPwd
            };
            Service.removeRole(params,header).then(res=>{
                if(res.code == window.CODE.SUCCESS){
                    Message.success('删除角色成功',1,res=>{
                        _searchList();
                    })
                }else{
                    Message.warning(res.msg,1)
                }
                this.refs.modalpwd.handleCancle();
            })
    }

    _onOk(data){
        let {payPwd} = data;
        this.remove(payPwd);
    }

    show(data){
        let {roleId} = data;
        this.setState({
            roleId
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
                    _title = '删除当前角色'
                    _onOk={this._onOk.bind(this)}
                />

            </div>
        )
    }
}

export default Template;