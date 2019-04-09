/*======== React ======== */
import React ,{Component} from 'react';

/*======== Antd ======== */
import {Pagination} from 'antd'

/*======== Css ======== */
import './style'

class pagination extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let {total=0,propsFn,currpage} = this.props;
        return(
            <div className="pagination">
                <Pagination currpage={currpage} defaultCurrent={1} total={total} onChange={propsFn} ></Pagination>
            </div>
        )
    }
}

export default pagination