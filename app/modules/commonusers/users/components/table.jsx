/*======== React ======== */
import React, {Component} from 'react';
import { Router, Route, hashHistory } from 'react-router';

/*======== Antd ======== */
import {Button,Table} from 'antd';

/*======== Component ======== */
import ComponentPagination from '../../../../components/pagination/main'

/*======== 工具 ======== */
import commonUtil from '../../../../util/uitl'



class tpl extends Component {
    constructor(props) {
        super(props)
        this.columns=[
            {title: '时间', key: 'create_date', dataIndex:'create_date', sorter:true},
            {title: 'UID', key: 'uid', dataIndex:'uid', sorter:true},
            {title: '邮箱', key: 'email', dataIndex:'email', sorter:true},
            {title: '手机号', key: 'mobile', dataIndex:'mobile', sorter:true},
            {title: '姓名', key: 'fullname', dataIndex:'fullname', sorter:true},
            {title: '实名情况', key: 'id', dataIndex:'id'},
            {title: '状态', key: 'status', dataIndex:'status'},
            {title: '最近登录时间', key: 'login_time', dataIndex:'login_time'},
            {title: '最近登录ip', key: 'login_ip', dataIndex:'login_ip'},
            {title: '操作', key: 'edit', dataIndex:'edit',
                render:(text,row,index)=>{
                    return(
                        <Button
                            size="small"
                            icon="user"
                            onClick={()=>{
                                this.LINK(row.uid)
                            }}
                        >
                            {text}
                        </Button>
                    )
                }
            }
        ];
        this.state={
            data:[],
            total:0,
            loading:true
        }
    }

    /*======== 拼装数据 ======== */
    extendList(data){

        let newData = [];
        data.list&&data.list.map((item,index)=>{
            newData.push({
                key:index,
                create_date: commonUtil.countTime(item.createDate,'y-m-d h:m:s') || '-',
                uid: item.uid ||'-',
                email: item.email||'-',
                mobile:item.mobile ||'-',
                fullname: item.fullname ||'-',
                id: item.authLevel == 'LEVEL2' ? '高级实名' :item.authLevel == 'LEVEL1' ? '初级实名' : item.authLevel == 'LEVEL0' ? '未实名' :'',
                status:'正常',
                login_time:commonUtil.countTime(item.loginDate,'y-m-d h:m:s'),
                login_ip:item.ip,
                edit:'详情'
            })
        })
        this.setState({
            total:data.total,
            data:newData,
            loading:false
        })
    }

    /*======== 跳转 ======== */
    LINK(id){
        const {_history} = this.props;
        _history.push({pathname:`/commonusers/personal_info/?uid=${id}`})
    }

    /*======== 生命组件 ======== */
    componentWillReceiveProps(props){
        let {_list=[]} = props
        this.setState({
            list:this.extendList(_list)
        })
    }

    render() {
        const {_list,_tableChange,_paginationChange} = this.props;
        const {total,data,loading} = this.state;
        return(
            <div className="select_conter">
                <Table
                    columns={this.columns}
                    dataSource={data||[]}
                    bordered={true}
                    loading={loading}
                    onChange={_tableChange}
                    pagination={false}
                    locale={{emptyText:'暂无数据'}}
                />
                <ComponentPagination
                    total={total||0}
                    propsFn={_paginationChange}>
                </ComponentPagination>
            </div>
        )
    }
}

export default tpl;