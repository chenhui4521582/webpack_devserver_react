/*======== React ======== */
import React,{Component} from 'react';

/*======== Antd ======== */
import {Modal,Icon,Button,Input,Alert,Row,Col} from 'antd';
let confirm = Modal.confirm;

class Modal_t extends Component{
    constructor(props) {
        super(props)
    }
    render() {
        const {_title} = this.props
        return(
            <div style={{fontWeight:'normal'}}>
                <Icon type="check-circle" style={{color:'#52c41a',fontSize:'22px',verticalAlign:'middle'}}/>
                <span style={{marginLeft:'5px',verticalAlign:'middle'}}>{_title}</span>
            </div>
        )
    }
}

class Template extends Component{
    constructor(props){
        super(props);
        this.state={
            payPwd:'',
            disabled:true,
            visible:false,
            confirmLoading:false
        }
    }

    /*======== 显示Modal ======== */
    showModal(){
        this.setState({
            visible:true
        })
    }

    /*======== 关闭Modal ======== */
    handleCancle(){
        this.setState({
            confirmLoading:false,
            visible:false,
            payPwd:''
        })
    }

    /*======== 传递给子组件（Template_c）input改变 ======== */
    handleChange(event){
        let reg = /^\w{1,50}$/
        this.setState({
            payPwd:event.target.value
        },res=>{
            if(reg.test(this.state.payPwd)){
                this.setState({
                    disabled:false
                })
            }else{
                this.setState({
                    disabled:true
                })
            }
        })
    }

    /*======== 传递给子组件（Template_c）键盘输入 ======== */
    handleKeydown(event){
        let code = event.keyCode;
        if(code == 13&&!this.state.disabled){
            this.handleOk();
        }
    }

    /*======== 提交父级组件（table）传来的方法_onOk ======== */
    handleOk(){
        const {_onOk} = this.props;
        const {payPwd} = this.state;
        this.setState({
            confirmLoading:true
        },res=>{
            _onOk({payPwd:payPwd});
        })
    }

    /*======== render ======== */
    render(){
        const {_title,size,type} = this.props;
        return(
            <Modal
                title={<Modal_t _title={_title}/>}
                visible={this.state.visible}
                centered
                confirmLoading={this.state.confirmLoading}
                okButtonProps={{ disabled: this.state.disabled}}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleCancle.bind(this)}
            >
                <Row>
                    <Row style={{marginBottom:'24px'}}>
                        <Col span={16} offset={4}>
                            <Alert message="请输入当前账号密码" type="warning" showIcon/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16} offset={4}>
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                               type="password"
                               placeholder="请输入当前账号密码"
                               value={this.state.payPwd}
                               onChange={this.handleChange.bind(this)}
                               onKeyDown={this.handleKeydown.bind(this)}
                               size="large"
                            />
                        </Col>
                    </Row>
                </Row>
            </Modal>
        )
    }
}

export default Template