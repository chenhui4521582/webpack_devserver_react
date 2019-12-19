import React, {Component} from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'
import {withLoadable} from '@/utils/utils'
/** ======== Components ======== **/
const Index = withLoadable(()=>import('@/views/index/index'));
const Task = withLoadable(()=>import('@/views/task/task'));
const Mall = withLoadable(()=>import('@/views/mall/mall'));
const My = withLoadable(()=>import('@/views/my/my'));

class Main extends Component{
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={Index} />
                    <Route path='/task' component={Task} />
                    <Route path='/mall' component={Mall} />
                    <Route path='/my' component={My} />
                </Switch>
            </HashRouter>
        )
    }
}

export default Main