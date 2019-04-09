/*======== React ======== */
import React, {Component} from 'react';

/*======== antd ======== */
import {Icon,Button,Input,Alert,Row,Col,Select} from 'antd';
const Option = Select.Option;
const { TextArea } = Input;

/*======== config ======== */
import config from './config'


/*======== Component  ======== */
class Template_t extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {_title} = this.props
        return(
            <div style={{fontWeight:'normal'}}>
                <Icon type="close-circle" style={{color:'red',fontSize:'22px',verticalAlign:'middle'}}/>
                <span style={{marginLeft:'5px',verticalAlign:'middle'}}>{_title}</span>
            </div>
        )
    }
}
class Template_c extends Component {
    render() {
        let {_payPwd,_onChange,_onKeydown,_onSelect,_onText} = this.props;
        return(
            <Row>
                <Row style={{marginBottom:'24px'}}>
                    <Col span={16} offset={4}>
                        <Alert message="拒绝原因" type="warning" showIcon/>
                    </Col>
                </Row>
                <Row style={{marginBottom:'24px'}}>
                    <Col span={16} offset={4}>
                        <Select defaultValue="请选择拒绝原因"
                                style={{width:'100%'}}
                                size="large"
                                onChange={_onSelect}
                        >
                            {
                                config.map((item,index)=>
                                    <Option value={item.ID} key={index}>{item.CN}</Option>
                                )
                            }
                        </Select>
                    </Col>
                </Row>
                <Row style={{marginBottom:'24px'}}>
                    <Col span={16} offset={4}>
                        <TextArea
                            placeholder="请输入拒绝理由"
                            autosize={{ minRows: 4, maxRows: 6 }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={16} offset={4}>
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                               type="password"
                               size="large"
                               placeholder="请输入当前账号密码"
                               value={_payPwd}
                               onChange={_onChange}
                               onKeyDown={_onKeydown}
                        />
                    </Col>
                </Row>

            </Row>

        )
    }
}

export {Template_t,Template_c};