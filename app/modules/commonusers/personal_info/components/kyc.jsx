import React, {Component} from 'react';

import {Button,List,Table} from 'antd';

class Template extends Component {
    constructor(props) {
        super(props)
        this.state={
            list:{},
            loading:true
        }
    }

    componentWillReceiveProps(props){
        const {_list} = props;

        if(!$.isEmptyObject(_list)){
            this.setState({
                list:_list,
                loading:false
            })
        }
    }
    render() {
        const {list,loading} = this.state;
        return(
            <List
                size="small"
                header={<div className='list_header'>基本信息</div>}
                bordered
                loading={loading}
                dataSource={[1]}
                renderItem={item => (
                    <List.Item>
                        <Table
                            style={{'width':'100%'}}
                            columns={list.columns}
                            dataSource={list.data}
                            bordered={true}
                            locale={{emptyText:'暂未通过实名认证'}}
                            pagination={false}
                            size="middle"
                        />
                    </List.Item>
                )}
            />
        )

    }
}

export default Template;