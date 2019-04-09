/*======== React ======== */
import React, {Component} from 'react';

/*======== Antd ======== */
import {Form, Input, Button} from 'antd';

/*======== Components ======== */
import Breadcrumb from '../../../components/breadcrumb/main'
import ModalPwd from '../../../components/modal/modal_pwd/modal_pwd'
import Message from '../../../components/message/main'

/*======== Service ======== */
import Service from '../../../config/service/service_role'

class Template extends Component {
    constructor(props){
        super(props)
        this.state={
            role:[],
            values:''
        }
    }

    _onOk(data){
        let {values} = this.state,
            {payPwd} = data,
            params={
                roleName: values.role
            },
            header = {
                'isNeedPassword':true,
                'login-password':payPwd
            };
        Service.addRole(params,header).then(res=>{
            if(res.code == window.CODE.SUCCESS){
                Message.success('添加用户成功',2,res=>{
                    this.props.history.push('/role/list')
                })
            }else{
                Message.warning(res.msg,1)
            }
            this.refs.modalpwd.handleCancle();
        })
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.refs.modalpwd.showModal();
                this.setState({
                    values
                })
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="admin_add">
                <Breadcrumb breadcrumb={{childName:'添加用户',parentName:'用户'}}/>
                <div className="center">
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Item
                            label="角色名称"
                            labelCol={{ span: 3}}
                            wrapperCol={{ span: 6}}
                        >
                            {
                                getFieldDecorator('role', {
                                    rules: [{ required: true, message: '请输入角色名称' }],
                                })
                                (
                                    <Input placeholder="请输入角色名称"/>
                                )
                            }
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{ span: 21, offset: 3 }}
                        >
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                    <ModalPwd
                        ref="modalpwd"
                        _title = '添加角色'
                        _onOk={this._onOk.bind(this)}
                    />
                </div>
            </div>
        )
    }
}

const WrappedApp = Form.create()(Template);

export default WrappedApp;
