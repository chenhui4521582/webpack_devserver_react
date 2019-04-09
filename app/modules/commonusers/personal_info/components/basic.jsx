/*======== React ======== */
import React, {Component} from 'react';

/*======== Antd ======== */
import {List} from 'antd';


class Template extends Component {
    constructor(props) {
        super(props)
        this.state={
            list:[],
            loading:true
        }
    }
    componentWillReceiveProps(props){
        const {_list} = props;
        if(_list.length>0){
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
                dataSource={list}
                loading={loading}
                renderItem={item => (
                    <List.Item>
                        <span className='list_key'>{item.key}</span>
                        <span className='list_value'>{item.value}</span>
                    </List.Item>
                )}
            />
        )
    }
}

export default Template;