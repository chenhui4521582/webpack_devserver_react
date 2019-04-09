/*======== React ======== */
import React, {Component} from 'react';

/*======== Antd ======== */
import {List,Modal} from 'antd';

/*======== Component ======== */
import {Loading_icon} from '../../../../../components/loading/main'

/*======== config ======== */
import Config from '../../config'

class Picture extends Component{
    constructor(props){
        super(props)
    }
    showConfirm(src) {
        function Html (){
            return(
                <img src={`http://180.167.180.52:11088/exchange_manager/common/photo?name=${src}`} alt="" style={{width:'100%',height:'100%'}}/>
            )
        }
        Modal.success({
            title: '',
            content:<Html/>,
            maskClosable:true,
            width:'600px',
            iconType:'none'
        });
    }
    render(){
        const {item} = this.props;
        return(
            <List.Item>
                <span className='list_key'>{item.key}</span>
                <span className='list_picture' onClick={()=>{this.showConfirm(item.value)}}>
                    {item.value&&<img src={`http://180.167.180.52:11088/exchange_manager/common/photo?name=${item.value}`} alt=""/>}
                </span>
            </List.Item>
        )
    }
}

class Template extends Component {
    constructor(props) {
        super(props)
        this.state={
            list:[],
            loading:{indicator:Loading_icon}
        }
    }
    componentWillReceiveProps(props) {
        const {_list} = props;
        if(!$.isEmptyObject(_list)){
            this.setState({
                list:[
                    {key:'付款方式',value:Config.PAY_TYPE[_list.payType]||''},
                    {key:'交易流水号',value:_list.payNo||''},
                    {key:'交易截图',value:JSON.parse(_list.capture)[0]||'',picture:true}
                ],
                loading:false
            })
        }
    }
    render() {
        let {list,loading} = this.state;
        return (
            <div className="panel">
                <List
                    size="small"
                    bordered
                    header={<div className="list_header">付款证明</div>}
                    loading={loading}
                    dataSource={list}
                    renderItem={item => (
                        item.picture
                            ?
                        <Picture item={item}/>
                            :
                        <List.Item>
                            <span className='list_key'>{item.key}</span>
                            <span className='list_value'>{item.value}</span>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default Template;