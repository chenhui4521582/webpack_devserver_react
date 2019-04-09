/*======== React ======== */
import React,{Component} from 'react';
import {render} from 'react-dom';

/*======== Antd ======== */
import { Layout, Menu, Breadcrumb,Form, Icon, Input, Button,message } from 'antd';
const {Content} = Layout;

/*======== 工具 ======== */
import {Cookie,Localstorage} from '../util/uitl';
import SERVICES from '../config/service/service_login'

/*======== Component ======== */
import Header from '../components/nav/main'
import Footer from '../components/footer/main'

/*======== Css ======== */
import '../static/css/style.scss'

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            size:'large'
        }
    }
    componentDidMount(){

    }

    /*======== 登录提交 ======== */
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            if (!err) {
                let params = {
                    account:values.userName
                },
                header = {
                    'login-password':values.password,
                    'account-no':values.userName,
                    'google-code':values.code
                };
                SERVICES.login(params,header).then(res=>{
                    if (res.code === window.CODE.SUCCESS) {
                        Cookie.setCookie('role', res.data.role);
                        Cookie.setCookie('LOGIN_TOKEN_ADMIN', res.data.token);
                        //谷歌绑定、重置密码信息
                        Localstorage.set('bound-google',res.data.boundGoogle);
                        Localstorage.set('set-pwd-flag',res.data.setPwdFlag);
                        Localstorage.set('account-no',values.userName);

                        //根据不同角色权限 跳转不同的默认功能
                        if(res.data.role === 'ADMIN'){
                            window.location.href = "./index.html#/admin/user";
                        }else{
                            if(!res.data.boundGoogle ){
                                window.location.href = "./index.html#/account/google";
                            }else{
                                if(!res.data.setPwdFlag){
                                    window.location.href = "./index.html#/account/set-pwd";
                                }else{
                                    window.location.href = "./index.html#/commonusers/user";
                                }
                            }
                        }
                    }else{
                        message.config({top: 65});
                        message.warning(res.msg);
                    }
                })
            }
        });
    }
    render() {
        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        return (
            <Layout>
                <Header />
                <Content style={{ padding: '30px'}}>
                    <div className="login">
                        <h3>GTE管理后台</h3>
                        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                            <FormItem>
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: '请输入您的手机号' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入您的手机号" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入登录密码' }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入登录密码" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('code', {
                                    rules: [{ required: true, message: '请输入谷歌秘钥' }],
                                })(
                                    <Input prefix={<Icon type="qrcode" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入谷歌秘钥" />
                                )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit" className="login-form-button" block>
                                    登录
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                </Content>
                <Footer />
            </Layout>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(Login);

render(
    <WrappedNormalLoginForm />,
    $('#App')[0]
);






