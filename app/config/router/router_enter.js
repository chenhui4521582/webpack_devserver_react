import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';

class PrivateRoute extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { component: Component,path="/",setSlideBar,id} = this.props;
        console.log(id);
        return (
            <Route  path={path}  render={(props)=>{
                setSlideBar(id.parentID,id.childID);
                return(<Component {...props} />)
            }} />
        )


    }
}

export default withRouter(PrivateRoute);
