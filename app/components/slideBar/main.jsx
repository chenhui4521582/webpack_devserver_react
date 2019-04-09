import React,{Component} from 'react';
import {Link} from 'react-router-dom';

import { Layout, Menu, Icon } from 'antd';
const {Sider} = Layout;
const { SubMenu } = Menu;

import Services from '../../config/service/service_commonusers'
import MenuList from './menuList'

import {Localstorage} from '../../util/uitl'
import './style.scss'

class SlideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            menu:[],
            childID:'',
            parentID:'',
            openKey:''
        }
    }

    menuInit(){
        Services.getMenuList().then(res=>{
            let data = MenuList.screenMenuList(res.data);
            let path = this.props._location.pathname;
            this.setState(res=>({
                menu:data.menulist,
                childID:data.roleList[path]?data.roleList[path].childID.toString():'0',
                parentID:data.roleList[path]?data.roleList[path].parentID.toString():'0',
                openKey:data.roleList[path]?data.roleList[path].parentID.toString():'0',
            }))
        })
    }
    onOpenChange(openKeys){
        this.setState({
            openKey:openKeys[1]
        })
    }

    componentWillMount(){
         this.menuInit();
    }

    render() {
        let {parentID,childID,openKey} = this.state;
        if(!parentID&&!childID){return null}
        return (
            <Sider width={200}>
                <Menu
                    defaultSelectedKeys={[childID]}
                    defaultOpenKeys={[parentID]}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                    openKeys={[openKey]}
                    onOpenChange={this.onOpenChange.bind(this)}
                >
                    {
                        this.state.menu.map((item,index)=>(
                                item.isShow
                                &&
                                <SubMenu key={item.id} title={<span><Icon type={item.icon}/><span>{item.name}</span></span>} className="ant-menu-submenu-selected">
                                    {
                                        item.nodes.map((item1)=>(
                                            item1.isShow
                                            &&
                                            <Menu.Item key={item1.id}><Link to={{pathname:item1.url}}>{item1.name}</Link></Menu.Item>
                                        ))
                                    }
                                </SubMenu>
                            )
                        )
                    }
                </Menu>
            </Sider>
        );
    }
}

export default SlideBar

