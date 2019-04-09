/*======== React ======== */
import React, {Component} from 'react';

/*======== Antd ======== */
import {Button} from 'antd';

/*======== Component ======== */
import Breadcrumb from '../../../components/breadcrumb/main'
import Message from '../../../components/message/main'
import Select from './components/select'
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
            lockStatus: 'UNLOCK',
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
        Service.search_user(params,header).then(res=>{
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

    _receiveData(data){
        let {lockStatus='UNLOCK'} = data;
        this.setState({
            lockStatus
        },res=>{
            this.searchList()
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
            <div className="amin-users">
                <Breadcrumb breadcrumb={{childName:'登录信息',parentName:'用户'}}/>
                <div className="center">
                    <Select _receiveData={this._receiveData.bind(this)}/>
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