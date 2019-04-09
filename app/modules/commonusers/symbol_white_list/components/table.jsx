/*======== React ======== */
import React, {Component} from 'react';

/*======== Antd ======== */
import {Table,Button,Icon} from 'antd';

/*======== util ======== */
import util from '../../../../util/uitl'

class Template extends Component {
    constructor(props) {
        super(props)
        this.columns=[
            {dataIndex:'createDate',key:'createDate',title:'创建时间',width:'25%'},
            {dataIndex:'id',key:'id',title:'ID',width:'25%'},
            {dataIndex:'uid',key:'uid',title:'UID',width:'25%'},
            {
                dataIndex:'edit',
                key:'edit',
                title:'操作',
                width:'25%',
                render:(text,row,index)=>(
                    <Button
                        type="danger"
                        size="small"
                        onClick={
                            ()=>{
                                this.props._show({id:row.uid,type:'remove'})
                            }
                        }
                    >
                        删除
                        <Icon type="delete"></Icon>
                    </Button>
                )
            }
        ]
        this.state={
            list:[],
            loading:true
        }
    }


    extendData(data){
        data.map((item,index)=>{
            item.key = index
            item.createDate = util.countTime(item.createDate,'y-m-d h:m:s')
        })
        this.setState({
            list:data,
            loading:false
        })
    }

    componentWillReceiveProps(props){
        const {_list} = props;
        if(_list.length>0){
            this.extendData(_list)
        }
    }

    render() {
        const {list,loading} = this.state;
        return(
            <div className="panel">
                <div className="symbol_title">
                    免手续费白名单
                </div>
                <Table
                    bordered
                    loading={loading}
                    columns={this.columns}
                    dataSource={list}
                    pagination={false}
                />
            </div>
        )
    }
}

export default Template;