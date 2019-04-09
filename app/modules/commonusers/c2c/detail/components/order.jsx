/*======== React ======== */
import React, {Component} from 'react';

/*======== Antd ======== */
import {List} from 'antd';

/*======== Component ======== */
import {Loading_icon} from '../../../../../components/loading/main'

/*======== Config ======== */
import Config from '../../config'


class Bank extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const {item,list} = this.props;
        let bankHtml = '';
        if(list.transPayType == "BANK"){
            bankHtml = (
                <span className="bank_list">
                    <span>{list.c2cBasePayChannelDto.name||''}</span>
                    <span>{list.c2cBasePayChannelDto.bank||''}</span>
                    <span>{list.c2cBasePayChannelDto.subBank||''}</span>
                    <span>{list.c2cBasePayChannelDto.acnumber||''}</span>
                </span>
            )
        }
        if(list.transPayType == "ALIPAY"){
            bankHtml = (
                <span className="bank_list">
                    <span>{list.c2cBasePayChannelDto.name||''}</span>
                    <span>{list.c2cBasePayChannelDto.alipayNo||''}</span>
                </span>
            )
        }
        return(
            <List.Item>
                <span className='list_key'>{item.key}</span>
                {bankHtml}
            </List.Item>
        )
    }
}
class BankList extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const {item} = this.props
        return(
            <List.Item>
                <span className='list_key'>{item.key}</span>
                <span className='list_value'>{item.value}</span>
            </List.Item>
        )
    }
}

class Template extends Component {
    constructor(props) {
        super(props)
        this.state={
            list:[],
            loading:{indicator:Loading_icon}
        }
    }

    componentWillReceiveProps(props) {
        const {_list} = props;
        if(!$.isEmptyObject(_list)){
            this.setState({
                list:[
                    {key:'订单号',value:_list.transOrderId},
                    {key:'交易币种/类别',value:`${_list.assetCode} / ${Config.COMPLAIN[_list.complainType]}`},
                    {key:'交易金额',value:_list.money},
                    {key:'交易数量',value:_list.number},
                    {key:'付款方式',value:_list.transPayType},
                    {key:'付款账号',value:'',bank:true}
                ],
                all:_list,
                loading:false
            })
        }
    }

    render() {
        let {list,loading,all} = this.state;
        return(
            <div className="panel">
                <List
                    size="small"
                    header={<div className="list_header">订单信息</div>}
                    loading={loading}
                    bordered
                    dataSource={list}
                    renderItem={item=>(
                        item.bank
                            ?
                        <Bank item={item} list={all}/>
                            :
                        <BankList item={item}/>
                    )}
                />
            </div>
        )



    }
}

export default Template;