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
import Service from '../../../../config/service/service_admin'


class Template extends Component {
    constructor(props) {
        super(props)
        this.columns=[
            {title:'时间',dataIndex:'createDate',key:'createDate',width:'20%'},
            {
                title:'类型',
                dataIndex:'operType',
                key:'operType',
                width:'20%',
                render:(text)=><span>{text=='LOGIN'?'登录':'登出'}</span>
            },
            {title:'IP',dataIndex:'ipAddress',key:'ipAddress',width:'20%'},
            {title:'地点',dataIndex:'ipCity',key:'ipCity',width:'20%'},
            {title:'其他',dataIndex:'remark',key:'remark',width:'20%'}
        ]
        this.state={
            pageNo:1,
            pageSize:10,
            total:0,
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
            total
        })
    }

    searchList(){
        let uid = util.Qstring().uid,
            {pageNo,pageSize}=this.state,
            params = {
                adminId:uid,
                pageNo,
                pageSize
            },header={}
        Service.search_user_detail(params,header).then(res=>{
            if(res.code== window.CODE.SUCCESS){

                res.data.list.length>0&&this.extendList(res.data)
            }else{
                Message.warning(res.msg,1)
            }
        })
    }

    componentDidMount() {
        this.searchList()
    }

    render() {
        const {list,total} = this.state;
        return (
            <div className="amin-users-detail">
                <Breadcrumb breadcrumb={{parentName:'用户',childName:'登录信息详情'}} />
                <div className="center">
                    <Table
                        columns={this.columns}
                        dataSource={list}
                        bordered
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