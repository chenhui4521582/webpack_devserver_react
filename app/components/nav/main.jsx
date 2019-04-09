/*======== React ======== */
import React,{Component} from 'react'

/*======== Antd ======== */
import { Layout,Icon,message,Button,Menu,Dropdown} from 'antd';
const {Header} = Layout;

/*======== 工具 ======== */
import {Localstorage,Cookie} from "../../util/uitl";
import Services from '../../config/service/service_login'
import Message from '../message/main'

/*======== CSS ======== */
import './style.scss'

class Logout extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const {_logout} = this.props;
        return(
            <Menu>
                <Menu.Item key="1" onClick={_logout}><Icon type="logout" />退出</Menu.Item>
            </Menu>
        )
    }
}

class LoginEnd extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const {_account_name='',_logout} = this.props;
        return(
            <Header>
                <div className="logo">
                    <img src="../../static/img/icon.png" alt=""/>
                    GTE控制中心
                </div>
                <div className="userInfo">
                    <div className='logout'>
                        <Dropdown overlay={<Logout _logout={_logout}/>} placement="bottomLeft">
                            <Button icon="user">{_account_name}</Button>
                        </Dropdown>
                    </div>
                </div>
            </Header>
        )
    }

}

class NoLogin extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Header>
                <div className="logo">
                    <img src="../../static/img/icon.png" alt=""/>
                    GTE控制中心
                </div>
            </Header>
        )
    }
}

class Nav extends Component{
    constructor(props){
        super(props);
        this.state={
            isLogin:false,
            account_name:''
        }


    }
    componentDidMount(){
        let pathName = window.location.pathname.split('/')[1];
        if(pathName === 'login.html'){
            this.setState({
                isLogin:false
            })
        }else{
            this.setState({
                isLogin:true,
                account_name:Localstorage.get('account-no')
            })
        }
    }

    logout(){
        let params={},header={'account-no':this.state.account_name}
        Services.logout(params,header).then(res=>{
            Message.success('退出成功',2,res=>{
                Cookie.clearCookie('LOGIN_TOKEN_ADMIN')
                Localstorage.remove('account-no');
                Localstorage.remove('bound-google');
                Localstorage.remove('set-pwd-flag');
                window.location.href = 'login.html';
            })
        })
    }

    render(){
        const {account_name,isLogin} = this.state
        return this.state.isLogin ? <LoginEnd _account_name={account_name} _logout={this.logout.bind(this)}/> : <NoLogin/>
    }
}

export default Nav