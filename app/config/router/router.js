import React,{Component} from 'react'

import {HashRouter,Route,Switch,Redirect} from 'react-router-dom'

import {LocaleProvider} from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'

import store from '../redux/store'
import {Provider}from 'react-redux'

import Box from '../../components/box/main'

class ReactRoute extends Component{
    render(){
        return(
            <Provider store={store}>
                <HashRouter>
                    <LocaleProvider locale={zh_CN}>
                        <Switch>
                            <Route path='/' component={Box}/>
                        </Switch>
                    </LocaleProvider>
                </HashRouter>
            </Provider>
        )
    }
}

export default ReactRoute