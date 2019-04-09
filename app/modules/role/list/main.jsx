/*======== React ======== */
import React, {Component} from 'react';

/*======== Antd ======== */
import {Button} from 'antd';

/*======== Component ======== */
import Breadcrumb from '../../../components/breadcrumb/main'
import Message from '../../../components/message/main'
import Table from './components/table'

/*======== Service ======== */
import Service from '../../../config/service/service_admin'

/*======== Css ======== */
import './style.scss'

class Template extends Component {
    constructor(props) {
        super(props)
        this.state={
            list:[],
            pageNo: 1,
            pageSize: 10,
            total:0
        }
    }

    searchList(){
        let {lockStatus,pageNo,pageSize} = this.state,
            params={
                lockStatus,
                pageNo,
                pageSize,
            },header={};
        Service.searchRoleList(params,header).then(res=>{
            if(res.code == window.CODE.SUCCESS){
                this.setState({
                    list:res.data.list,
                    total:res.data.total
                })
            }else{
                Message.warning(res.msg,2)
            }
        })
    }

    _paginationChange(pageNo,pageSize){
        this.setState({
            pageNo
        },res=>{
            this.searchList()
        })
    }

    componentWillMount() {
        this.searchList();
    }

    render() {
        const {list=[],total=0} = this.state;
        return(
            <div className="role-list">
                <Breadcrumb breadcrumb={{childName:'角色管理',parentName:'角色'}}/>
                <div className="center">
                    <Table
                        _list={list}
                        _total={total}
                        _searchList={this.searchList.bind(this)}
                        _paginationChange={this._paginationChange.bind(this)}
                    />
                </div>
            </div>
        )

    }
}

export default Template;