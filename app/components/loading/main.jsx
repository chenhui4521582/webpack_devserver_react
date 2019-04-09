/*======== React ======== */
import React, {Component} from 'react';

/*======== Antd ======== */
import {Spin,Icon} from 'antd';

/*======== Css ======== */
import './style.scss'

const Loading_icon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
class Template extends Component {
    constructor(props) {
        super(props)
    }
    render() {

        return(
            <div className="component_loading">
                <Spin indicator={antIcon}/>
            </div>
        )
    }
}

export default Template;
export {Loading_icon}