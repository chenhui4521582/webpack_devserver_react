/*======== Antd ======== */
import React,{Component} from 'react'

/*======== Antd ======== */
import {Layout} from 'antd'
const {Content} = Layout;

/*======== Component ======== */
import Nav from '../nav/main'
import SlideBar from '../slideBar/main'
import Footer from '../footer/main'
import MainComponents from '../../config/router/module_router'

/*======== Css ======== */
import '../../static/css/style.scss'

class RouterBox extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let {location} = this.props;
        return(
            <Layout>
                <Nav />
                <Layout>
                    <SlideBar _location={location}/>
                    <Layout>
                        <Content>
                            <MainComponents/>
                        </Content>
                        <Footer />
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default RouterBox