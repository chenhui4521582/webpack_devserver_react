/*======== React ======== */
import React, {Component} from 'react';

/*======== Antd ======== */
import {List} from 'antd';

/*======== Component ======== */
import {Loading_icon} from '../../../../../components/loading/main'

/*======== 工具 ======== */
import util from '../../../../../util/uitl'

/*======== Config ======== */
import Config from '../../config'



class Template extends Component {
    constructor(props) {
        super(props)
        this.state={
            list:[],
            loading:{indicator:Loading_icon}
        }
        this.judge_time = (time)=>{
            return util.countTime(time,'y-m-d h:m:s')
        }
    }

    componentWillReceiveProps(props) {
        const {_list} = props;
        if(!$.isEmptyObject(_list)){
            this.setState({
                list:[
                    {key:'申诉时间',value:this.judge_time(_list.createDate)||''},
                    {key:'申诉编号',value:_list.complainId||''},
                    {key:'申诉类型',value:Config.TRADE_STATUS[_list.complainType]||''},
                    {key:'申诉原因',value:_list.complainReason||''},
                    {key:'买家联系方式',value:_list.buyPhone||''},
                    {key:'卖家联系方式',value:_list.sellPhone||''}
                ],
                loading:false
            })
        }
    }

    render() {
        let {list,loading} = this.state;
        return(
            <div className="panel">
                <List
                    size="small"
                    header={<div className="list_header">基本信息</div>}
                    bordered
                    dataSource={list}
                    loading={loading}
                    renderItem={item=>(
                        <List.Item>
                            <span className='list_key'>{item.key}</span>
                            <span className='list_value'>{item.value}</span>
                        </List.Item>
                    )}
                />
            </div>
            )



    }
}

export default Template;