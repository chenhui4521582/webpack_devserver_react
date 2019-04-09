/*======== React ======== */
import React, {Component} from 'react';

/*======== Antd ======== */
import {Form, Select, Input, Button} from 'antd';
const { Option } = Select;

/*======== Components ======== */
import Breadcrumb from '../../../components/breadcrumb/main'
import ModalPwd from '../../../components/modal/modal_pwd/modal_pwd'
import Message from '../../../components/message/main'

/*======== Service ======== */
import Service from '../../../config/service/service_admin'

class Template extends Component {
    constructor(props){
        super(props)
        this.state={
            role:[],
            values:''
        }
    }

    searchRole(){
        let params = {
                pageNo:1,
                pageSize:999
            },
            header = {};
        Service.searchRoleList(params,header).then(res=>{
            if(res.code == window.CODE.SUCCESS){
                this.setState({
                    role:res.data.list
                })
            }else {
                Message.warning(res.msg,1)
            }
        })
    }

    _onOk(data){


    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let params={
                        account: values.mobile,
                        password: '123456',
                        roleId: values.role,
                        userName: values.name
                    },
                    header={};
                Service.addUser(params,header).then(res=>{
                    if(res.code == window.CODE.SUCCESS){
                        Message.success('添加用户成功',2)
                    }else{
                        Message.warning(res.msg,1)
                    }
                })
            }
        });
    }

    validateMobile(rule, value, callback){
        const form = this.props.form;
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
        if(!reg.test(value)) {
            callback('请输入正确手机号');
        }
        callback();
    }

    componentWillMount(){
        this.searchRole()
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="admin_add">
                <Breadcrumb breadcrumb={{childName:'添加用户',parentName:'用户'}}/>
                <div className="center">
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Item
                            label="账号"
                            labelCol={{ span: 3 }}
                            wrapperCol={{ span: 6 }}
                        >
                            {
                                getFieldDecorator('mobile', {
                                    rules: [
                                        { required:false,message:'请输入手机号'},
                                        { validator:this.validateMobile.bind(this)}
                                    ],
                                })
                                (
                                    <Input placeholder="请输入手机号"/>
                                )
                            }
                        </Form.Item>
                        <Form.Item
                            label="角色"
                            labelCol={{ span: 3 }}
                            wrapperCol={{ span: 6 }}
                        >
                            {
                                getFieldDecorator('role', {
                                    rules: [{ required: true, message: '请选择角色!' }],
                                })
                                (
                                    <Select
                                        placeholder="请选择角色"
                                    >
                                        {
                                            this.state.role.map((item,index)=>
                                                <Option value={item.roleId} key={index}>{item.roleName}</Option>
                                            )
                                        }
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item
                            label="用户名"
                            labelCol={{ span: 3 }}
                            wrapperCol={{ span: 6 }}
                        >
                            {
                                getFieldDecorator('name', {
                                    rules: [{ required: true, message: '请输入真实姓名' }],
                                })
                                (
                                    <Input placeholder="请输入真实姓名"/>
                                )
                            }
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            labelCol={{ span: 3 }}
                            wrapperCol={{ span: 6 }}
                        >
                            <Input type="text" disabled={true} value="123456"/>
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
                        _title = '添加用户'
                        _onOk={this._onOk.bind(this)}
                    />
                </div>
            </div>
        )
    }
}

const WrappedApp = Form.create()(Template);

export default WrappedApp;
