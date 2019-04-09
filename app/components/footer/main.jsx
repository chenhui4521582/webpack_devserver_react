/*======== React ======== */
import React,{Component} from 'react'

/*======== Antd ======== */
import {Layout} from 'antd'
const {Footer} = Layout;

class footer extends Component{
    render(){
        return(
            <Footer style={{ textAlign: 'center' }}>
                ©2015-2018 Copyright GTE@gtesg.com
            </Footer>
        )
    }
}

export default  footer;