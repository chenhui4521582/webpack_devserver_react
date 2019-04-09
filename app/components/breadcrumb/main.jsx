/*======== React ======== */
import React ,{Component} from 'react';

/*======== Antd ======== */
import {Breadcrumb} from 'antd'

class componentBreadCrumb extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {breadcrumb=''} = this.props;
        if(!breadcrumb){return false}
        return(
            <div className="breadcrumb">
                <Breadcrumb>
                    <Breadcrumb.Item>{breadcrumb.parentName}</Breadcrumb.Item>
                    <Breadcrumb.Item>{breadcrumb.childName}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        )
    }
}

export default componentBreadCrumb;

