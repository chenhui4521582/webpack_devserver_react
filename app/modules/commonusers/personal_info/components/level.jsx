/*======== React ======== */
import React, {Component} from 'react';

/*======== Antd ======== */
import {List,Button,Modal} from 'antd';


class Picture extends Component {
    constructor(props){
        super(props)
    }
    showConfirm(src) {
        function Html (){
            return(
                <img src={`/exchange_manager/common/photo?name=${src}`} alt="" style={{width:'100%',height:'100%'}}/>
            )
        }
        Modal.success({
            title: '',
            content:<Html/>,
            maskClosable:true,
            width:'400px',
            iconType:'none'
        });
    }
    render(){
        let {item} = this.props;
        if(item.value instanceof Array){
            return(
                <List.Item>
                    <span className='list_key'>{item.key}</span>
                    <div className="list_value">
                        {
                            item.value.map((item,index)=> {
                                if(index == 0&&item){
                                    return(
                                        <div className="phone_item" key={index} onClick={()=>{
                                            this.showConfirm(item)
                                        }}>
                                            <div className='phone_img'>
                                                <img src="../../../static/img/my.png" alt=""/>
                                            </div>
                                            <span className='phone_text'>证件正面</span>
                                        </div>
                                    )
                                }
                                if(index == 0&&!item){
                                    return(
                                        <div className="phone_item" key={index}>
                                            <span className='phone_text'>暂无正面照片</span>
                                        </div>
                                    )
                                }
                                if(index == 1&&item){
                                    return(
                                        <div className="phone_item" key={index} onClick={()=>{
                                            this.showConfirm(item)
                                        }}>
                                            <div className='phone_img'>
                                                <img src="../../../static/img/my.png" alt=""/>
                                            </div>
                                            <span className='phone_text'>证件反面</span>
                                        </div>
                                    )
                                }
                                if(index == 1&&!item){
                                    return(
                                        <div className="phone_item" key={index}>
                                            <span className='phone_text'>暂无反面照片</span>
                                        </div>
                                    )
                                }
                                if(index == 2&&item){
                                    return(
                                        <div className="phone_item" key={index} onClick={()=>{
                                            this.showConfirm(item)
                                        }}>
                                            <div className='phone_img'>
                                                <img src="../../../static/img/my.png" alt=""/>
                                            </div>
                                            <span className='phone_text'>手持证件</span>
                                        </div>
                                    )
                                }
                                if(index == 2&&!item){
                                    return(
                                        <div className="phone_item" key={index}>
                                            <span className='phone_text'>暂无手持照片</span>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </List.Item>
            )
        }else{
            return null
        }
    }
}

class LevelList extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {item} = this.props;
        return(
            <List.Item>
                <span className='list_key'>{item.key}</span>
                <span className='list_value'>{item.value}</span>
            </List.Item>
        )
    }
}

class Template extends Component {
    constructor(props) {
        super(props)
        this.state={
            list:[],
            loading:true
        }
    }

    componentWillReceiveProps(props){
        const {_list} = props;
        if(_list.length>0){
            this.setState({
                list:_list,
                loading:false
            })
        }
    }
    render() {
        const {list,loading} = this.state;
        return(
            <List
                size="small"
                header={<div className='list_header'>实名信息( 未实名-LEVEL0 )</div>}
                bordered
                loading={loading}
                dataSource={list}
                renderItem={item=>
                    item.isMap
                        ?
                    <Picture item={item}/>
                        :
                    <LevelList item={item}/>
                }
            />
        )

    }
}

export default Template;