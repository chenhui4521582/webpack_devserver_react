/*======== Antd ======== */
import React,{Component} from 'react';

/*======== Antd ======== */
import {Button} from 'antd';

class Template extends Component{
    constructor(props){
        super(props)
    }
    go_detail(id){
        const {_history} = this.props;
        _history.push({pathname:`/commonusers/c2c/detail/?id=${id}`})
    }
    render(){
        const {item} = this.props;
        let transforForce = '';
        let closeForce = '';
        let Detail = (
            <Button
                onClick={()=>{this.go_detail(item.complainId)}}
                size="small"
                type="primary"
            >
                详情
            </Button>
        )
        if(item.status === 'PROCESSING'){
            if(item.complainType === 'BUY' && item.transOrderStatus !== 'FINISHED' && item.transOrderStatus !== 'CANCELED' && item.transOrderStatus !== 'OVERTIME'){
                transforForce =(
                    <Button
                        onClick={()=>{this.props._show({id:item.complainId,type:'transforForce'})}}
                        size="small"
                        type="danger"
                    >
                        强制打币
                    </Button>
                )
            }
            if(item.complainType === 'SELL' && item.transOrderStatus !== 'FINISHED' && item.transOrderStatus !== 'CANCELED' && item.transOrderStatus !== 'OVERTIME'){
                closeForce =(
                    <Button
                        onClick={()=>{this.props._show({id:item.complainId,type:'closeForce'})}}
                        size="small"
                        type="danger"
                    >
                        关闭订单
                    </Button>
                )
            }
        }

        return (
            <div className="c2c_edit">
                {Detail}
                {transforForce}
                {closeForce}
            </div>
        )
    }
}

export default Template