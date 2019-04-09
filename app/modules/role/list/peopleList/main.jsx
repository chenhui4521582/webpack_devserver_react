/*======== React ======== */
import React, {Component} from 'react';

/*======== Antd ======== */
import {Button,Table} from 'antd';

/*======== Componetns ======== */
import Breadcrumb from '../../../../components/breadcrumb/main'
import Pagination from '../../../../components/pagination/main'
import Message from '../../../../components/message/main'

/*======== util ======== */
import util from '../../../../util/uitl'

/*======== Service ======== */
import Service from '../../../../config/service/service_role'


class Template extends Component {
    constructor(props) {
        super(props)
        this.columns=[
            {title:'角色名称',dataIndex:'roleName',key:'roleName',width:'20%'},
            {title:'用户名称',dataIndex:'adminName',key:'adminName',width:'20%'},
            {title:'添加时间',dataIndex:'createDate',key:'createDate',width:'20%'},
        ]
        this.state={
            pageNo:1,
            pageSize:10,
            total:0,
            loading:true,
            list:[]
        }
    }

    paginationChange(pageNo,pageSize){
        this.setState({pageNo},res=>{this.searchList()})
    }

    extendList(data){
        const {list=[],total=0}=data;
        list.map((item,index)=>{
            item.key=index
            item.createDate = util.countTime(item.createDate,'y-m-d h:m:s')
        })
        this.setState({
            list,
            total,
            loading:false
        })


    }

    searchList(){
        let roleId = util.Qstring().roleId,
            {pageNo,pageSize}=this.state,
            params = {
                roleId,
                pageNo,
                pageSize,
            },header={}
        Service.searchAdminRoleList(params,header).then(res=>{
            if(res.code== window.CODE.SUCCESS){
                if(res.data.list.length>0){
                    this.extendList(res.data)
                    return false
                }
                this.setState({
                    loading:false
                })
            }else{
                Message.warning(res.msg,1)
            }
        })
    }

    componentDidMount() {
        this.searchList()
    }

    render() {
        const {list,total,loading} = this.state;
        return (
            <div className="role-list-people">
                <Breadcrumb breadcrumb={{parentName:'角色',childName:'人员查看'}} />
                <div className="center">
                    <div className="title">
                        角色人员列表
                    </div>
                    <Table
                        columns={this.columns}
                        dataSource={list}
                        bordered
                        loading={loading}
                        pagination={false}
                    />
                    <Pagination
                        total={total}
                        propsFn={this.paginationChange.bind(this)}
                    />
                </div>
            </div>
        )
    }
}

export default Template;