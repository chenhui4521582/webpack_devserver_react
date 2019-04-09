/*======== React ======== */
import React,{Component} from 'react';

/*======== Antd ======== */
import {DatePicker} from 'antd';
const {RangePicker}= DatePicker;
import locale from 'antd/lib/date-picker/locale/zh_CN';

class component_time extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let {time_propsFn} = this.props;
        return(
            <RangePicker onChange={time_propsFn} locale={locale}/>
        )
    }
}

export default component_time