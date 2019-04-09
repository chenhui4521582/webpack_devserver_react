/*======== React ======== */
import React, {Component} from 'react'

/*======== Antd ======== */
import {Button} from 'antd'

/*======== Service ======== */
import Service from '../../../../../config/service/service_commonusers'

/*======== Component ======== */
import Message from '../../../../../components/message/main'
import ModalPwd from '../../../../../components/modal/modal_pwd/modal_pwd'

class Template extends Component {
    constructor(props) {
        super(props)
    }
    back() {
        const {_history} = this.props;
        _history.push({
            pathname: '/commonusers/c2c'
        })
    }
    render() {
        const {_list} = this.props;
        let goBack = (
                <Button
                    onClick={this.back.bind(this)}
                    type="primary"
                >
                    返回
                </Button>
            ),
            transforForce = '',
            closeForce = '';
        if (_list.status&&_list.status == 'PROCESSING') {
            if (_list.complainType == 'BUY' && _list.transOrderStatus != 'FINISHED' && _list.transOrderStatus != 'CANCELED' && _list.transOrderStatus != 'OVERTIME') {
                transforForce = (
                    <Button
                        onClick={()=>{this.props._show({id:_list.complainId,type:'transforForce'})}}
                        type="danger"
                    >
                        强制打币
                    </Button>
                )
            }
            if (_list.complainType == 'SELL' && _list.transOrderStatus != 'FINISHED' && _list.transOrderStatus != 'CANCELED' && _list.transOrderStatus != 'OVERTIME') {
                closeForce = (
                    <Button
                        onClick={()=>{this.props._show({id:_list.complainId,type:'closeForce'})}}
                        type="danger"
                    >
                        关闭订单
                    </Button>
                )
            }
        }
        return (
            <div className="detail_edit">
                {goBack}
                {transforForce}
                {closeForce}
            </div>
        )
    }
}

export default Template;