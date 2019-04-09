/*======== React ======== */
import React, {Component} from 'react';

/*======== Antd ======== */
import {Button,Checkbox} from 'antd';
const CheckboxGroup = Checkbox.Group;

/*======== Componetns ======== */
import Breadcrumb from '../../../../components/breadcrumb/main'
import Message from '../../../../components/message/main'

/*======== util ======== */
import util from '../../../../util/uitl'

/*======== Service ======== */
import Service from '../../../../config/service/service_role'

const plainOptions = ['Apple', 'Pear', 'Orange'];
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
            checkedList:"",
            indeterminate: true,
            checkAll: false

        }
    }

    onChange(checkedList){
        this.setState({

        });
    }

    extendList(data){
        let newData = [];
        data.map((item,index)=>{
            newData[index] = {};
            newData[index].list = []
            newData[index].title = item.menuName
            item.menuRoleDtoList.map(item=>{
                newData[index].list.push(item.menuName)
            })
        })
        this.setState({
            checkedList:newData
        })
    }

    searchList(){
        let roleId = util.Qstring().roleId,
            params = {
                roleId,
            },header={}
        Service.memuRoleList(params,header).then(res=>{
            if(res.code== window.CODE.SUCCESS){
                this.extendList(res.data)
            }else{
                Message.warning(res.msg,1)
            }
        })
    }

    componentDidMount() {
        this.searchList()
    }

    render() {
        const {checkedList} = this.state;
        if(checkedList==""){return false}
        return (
            <div className="amin-users-detail">
                <Breadcrumb breadcrumb={{parentName:'用户',childName:'登录信息详情'}} />
                <div className="center">
                    {
                        checkedList.map((item,index)=>{
                            return(
                                <div key={index}>
                                    <Checkbox
                                        indeterminate={this.state.indeterminate}
                                        onChange={this.onCheckAllChange}
                                        checked={this.state.checkAll}
                                    >
                                        {item.title}
                                    </Checkbox>
                                    <CheckboxGroup
                                        options={item.list}
                                        value={item.list}
                                        onChange={this.onChange.bind(this)} />
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        )
    }
}

export default Template;