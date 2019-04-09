/*======== React ======== */
import React,{Component} from 'react';

/*======== Antd ======== */
import {Modal,Button} from 'antd'
let confirm = Modal.confirm;

/*======== Component ======== */
import {Template_t,Template_c} from './tpl'

/*======== config ======== */
import config from './config'

class KYC_NO extends Component{
    constructor(props){
        super(props);
        this.state={
            payPwd:'',
            select:'',
            textarea:'',
            disabled:true,
            visible:false,
            confirmLoading:false,
            params:''
        }
    }

    /*======== 显示Modal ======== */
    showModal(params){
        this.setState({
            visible:true
        })
    }

    /*======== 关闭Modal ======== */
    handleCancle(){
        this.setState({
            confirmLoading:false,
            visible:false
        })
    }

    /*======== 传递给子组件（Template_c）input改变 ======== */
    handleChange(event){
        this.setState({
            payPwd:event.target.value
        },res=>{
            this.isDisable()
        })
    }

    /*======== 传递给子组件（Template_c）键盘输入 ======== */
    handleKeydown(event){
        let code = event.keyCode;
        if(code == 13&&!this.state.disabled){
            this.handleOk();
        }
    }

    /*======== 传递给子组件（Template_c）下啦选择 ======== */
    handleSelect(event){
        this.setState({
            select:event
        },res=>{
            this.isDisable()
        })
    }

    /*======== 传递给子组件（Template_c）textarea ======== */
    handleText(event){
        let value = event.target.value;
        this.setState({
            textarea:value
        },res=>{
            this.isDisable()
        })
    }

    /*======== 判断是否可以提交 ======== */
    isDisable(){
        let reg = /^\w{1,50}$/
        if(reg.test(this.state.payPwd)&&this.state.select!=''&&!this.state.textarea!=''){
            this.setState({
                disabled:false
            })
        }else{
            this.setState({
                disabled:true
            })
        }
    }

    /*======== 提交父级组件（table）传来的方法_onOk ======== */
    handleOk(){
        const {_onNo} = this.props;
        const {payPwd,select,textarea} = this.state;
        _onNo(
            {
                payPwd,
                select,
                textarea:config[select-1].EN
            }
        );
    }

    /*======== 生命周期 ======== */
    componentDidMount(){}

    /*======== render ======== */
    render(){
        const {_title} = this.props;
        return(
            <div className="div">
                <Modal
                    title={<Template_t _title={_title}/>}
                    visible={this.state.visible}
                    centered
                    confirmLoading={this.state.confirmLoading}
                    okButtonProps={{ disabled: this.state.disabled}}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancle.bind(this)}
                >
                    <Template_c
                        _payPwd={this.state.payPwd}
                        _select = {this.state.select}
                        _textarea = {this.state.textarea}
                        _onChange={this.handleChange.bind(this)}
                        _onKeydown = {this.handleKeydown.bind(this)}
                        _onSelect = {this.handleSelect.bind(this)}
                        _onText = {this.handleText.bind(this)}
                    />
                </Modal>
            </div>
        )
    }
}

export default KYC_NO