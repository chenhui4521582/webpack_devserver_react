import React, {Component} from 'react';

import {Button,Table,List} from 'antd';

class Templat extends Component {
    constructor(props) {
        super(props)
        this.listData=[
            {title:'用户账户-法币', name:'cashList'},
            {title:'用户账户-币',name:'coinList'},
            {title:'用户账户-通证',name:'tokenList'}]
        this.state={
            list:{},
            loading:true
        }
    }
    componentWillReceiveProps(props){
        const {_list} = props;
        this.setState({
            list:_list,
            loading:false
        })
    }

    render() {
        const {list,loading} = this.state;
        if($.isEmptyObject(list)){return false}
        return(
                <List
                    size="small"
                    header={<div className='list_header'>用户资产</div>}
                    bordered
                    loading={loading}
                    dataSource={this.listData}
                    renderItem={item => (
                        <List.Item>
                            <div className="asset">
                                <div className="title">{item.title}</div>
                                <div className="table_list">
                                    <Table
                                        columns={list.columns||[]}
                                        dataSource={list.data[item.name][0]}
                                        bordered={true} locale={{emptyText:'暂无数据'}}
                                        pagination={false}
                                        size="middle"
                                    />
                                    <Table
                                        columns={list.columns||[]}
                                        dataSource={list.data[item.name][1]}
                                        bordered={true} locale={{emptyText:'暂无数据'}}
                                        pagination={false}
                                        size="middle"
                                    />
                                </div>
                            </div>
                        </List.Item>
                    )}
                />
            )
    }
}

export default Templat;