/*======== React ======== */
import React,{Component} from 'react';
import render from 'react-dom';

/*======== Antd ======== */
import {Button,Modal,Table} from 'antd';
const confirm = Modal.confirm;

/*======== 工具方法 ======== */
import Service from '../../../../config/service/service_commonusers'
import message from '../../../../components/message/main'
import config from '../../../../components/modal/modal_kyc_no/config'
import util from '../../../../util/uitl'

/*======== 组件 ======== */
import ModalPwd from '../../../../components/modal/modal_pwd/modal_pwd';
import ModalKycNo from '../../../../components/modal/modal_kyc_no/modal_kyc_no';

class Component_phone extends Component{
    constructor(props){
        super(props)
    }
    showImg(src) {
        function Html (){
            return(
                <img src={`/exchange_manager/common/photo?name=${src}`} alt="" style={{width:'100%',height:'100%'}}/>
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
        let {items} = this.props;
        if(items instanceof Array){
            return (
                items.map((item,index)=> {
                    if(index == 0&&item){
                        return(
                            <div className="phone_item" key={index} onClick={()=>{
                                this.showImg(item)
                            }}>
                                <div className='phone_img'>
                                    <img src="../../../../static/img/my.png" alt=""/>
                                </div>
                                <span className='phone_text'>证件正面</span>
                            </div>
                        )
                    }else if(index == 0&&!item){
                        return(
                            <div className="phone_item" key={index}>
                                <span className='phone_text'>暂无正面照片</span>
                            </div>
                        )
                    }else if(index == 1&&item){
                        return(
                            <div className="phone_item" key={index} onClick={()=>{
                                this.showImg(item)
                            }}>
                                <div className='phone_img'>
                                    <img src="../../../../static/img/my.png" alt=""/>
                                </div>
                                <span className='phone_text'>证件反面</span>
                            </div>
                        )
                    }else if(index == 1&&!item){
                        return(
                            <div className="phone_item" key={index}>
                                <span className='phone_text'>暂无反面照片</span>
                            </div>
                        )
                    }else if(index == 2&&item){
                        return(
                            <div className="phone_item" key={index} onClick={()=>{
                                this.showImg(item)
                            }}>
                                <div className='phone_img'>
                                    <img src="../../../../static/img/my.png" alt=""/>
                                </div>
                                <span className='phone_text'>手持证件</span>
                            </div>
                        )
                    }else if(index == 2&&!item){
                        return(
                            <div className="phone_item" key={index}>
                                <span className='phone_text'>暂无手持照片</span>
                            </div>
                        )
                    }
                })
            )
        }else{
            return null
        }
    }
}

class Template extends Component{
    constructor(props){
        super(props)
        this.state={
            list:[],
            params:{},
            loading:true
        }
        this.column = [
            {title:'提交时间',dataIndex:'createDate',key:'createDate'},
            {title:'账户名',dataIndex:'email',key:'email'},
            {title:'uid',dataIndex:'uid',key:'uid'},
            {title:'类型',dataIndex:'id',key:'id'},
            {title:'姓名',dataIndex:'fullName',key:'fullName'},
            {title:'证件类型',dataIndex:'cardType',key:'cardType'},
            {title:'证件号',dataIndex:'cardNo',key:'cardNo'},
            {title:'有效期',dataIndex:'expiredDate',key:'expiredDate'},
            {
                title:'证件图片',
                dataIndex:'cardPhoto',
                key:'cardPhoto',
                render:(item,row,index)=>(
                    <div className="phone_items">
                        <Component_phone items={item} />
                    </div>
                )
            },
            {
                title:'操作',
                dataIndex:'edit',
                key:'edit',
                render:(items,row,index)=>
                    items.map((item,index)=>(
                        index == 0
                            ?
                            <Button
                                key={index}
                                size="small"
                                type='primary'
                                style={{marginRight:'5px'}}
                                onClick={this.showModal_pwd.bind(this,row.listID)}
                            >
                                通过
                            </Button>
                            :
                            <Button
                                key={index}
                                size="small"
                                type='danger'
                                onClick={this.showModal_kyc_no.bind(this,row.listID)}
                            >
                                拒绝
                            </Button>
                    ))
            }
        ]
    }

    /*======== 拼接字符串 cardPhoto ======== */
    judge_phone(data){
        let {cardPhoto,cardHandhold} = data;
        cardPhoto = JSON.parse(cardPhoto)||[]
        cardHandhold = JSON.parse(cardHandhold)||[]
        return [cardPhoto[0]||'',cardPhoto[1]||'',cardHandhold||'']
    }

    /*======== 拼接字符串 cardType ======== */
    judge_cardType(data){
        let type = data.cardType
        if(type == "PASSPORT"){
            return '护照'
        }
        if(type == 'ID_CARD'){
            return '身份证'
        }
    }

    /*======== 合并数据 list ======== */
    extendList(data){
        let list = [];
        if(data.length>0){
            data.forEach((item,index)=>{
                list.push({
                    key:index,
                    createDate:util.countTime(item.createDate,'y-m-d h:m:s'),
                    email:item.email,
                    uid:item.uid,
                    id:'初级实名',
                    fullName:item.fullName,
                    cardType:this.judge_cardType(item),
                    cardNo:item.cardNo,
                    expiredDate:util.countTime(item.expiredDate,'y-m-d'),
                    cardPhoto:this.judge_phone(item),
                    edit:['通过','拒绝'],
                    listID:item.id
                })
            })
        }
        return list
    }

    /*======== 提供给ModalPwd组件的回调方法 ======== */
    onOk(data){
        let {payPwd} = data,
        {id} = this.state.params,
        params = {
            AuditDealStatus: 'FINISH',
            auditMessage:'',
            auditMessageId:'',
            auditStatus: 'OK',
            id
        },header = {
            'isNeedPassword':true,
            'login-password':payPwd
        };
        Service.KYC_OK(params,header).then(res=>{
            if(res.code == window.CODE.SUCCESS){
                message.success('成功',res=>{
                    window.location.reload();
                });
            }else{
                message.warning(res.msg);
            }
            /*======== 调用子组件（modal_pwd）的关闭方法======== */
            this.refs.modalPwd.handleCancle()
        })
    }

    /*======== 提供给Modal_kyc_no组件的回调方法 ======== */
    onNo(data){
        let {payPwd,select,textarea} = data,
        {id} = this.state.params,
        params = {
            AuditDealStatus:'FINISH',
            auditMessage: textarea,
            auditMessageId: select,
            auditStatus: 'FAIL',
            id
        },header = {
            'isNeedPassword':true,
            'login-password':payPwd
        };
        Service.KYC_OK(params,header).then(res=>{
            if(res.code == window.CODE.SUCCESS){
                message.success('成功',res=>{
                    window.location.reload();
                });
            }else{
                message.warning(res.msg);
            }
            /*======== 调用子组件（modal_pwd）的关闭方法======== */
            this.refs.modalKycNo.handleCancle()
        })
    }

    /*======== 回调modal的内部打开方法 ======== */
    showModal_pwd(id){
        this.setState({
            params:{id}
        })
        this.refs.modalPwd.showModal()
    }

    showModal_kyc_no(id){
        this.setState({
            params:{id}
        })
        this.refs.modalKycNo.showModal()
    }

    /*======== 生命周期 接收props更新state======== */
    componentWillReceiveProps(props){
        let {_list=[]} = props
        this.setState({
            list:this.extendList(_list),
            loading:false
        })
    }

    /*======== Render ======== */
    render(){
        const {list,loading} = this.state;
        return(
            <div className="table">
                <Table
                    columns={this.column}
                    dataSource={list}
                    loading={loading}
                    bordered={true}
                    locale={{emptyText:'暂无数据'}}
                    pagination={false}
                />
                <ModalPwd
                    _title = "KYC审核通过"
                    _onOk={this.onOk.bind(this)}
                    ref="modalPwd"
                />
                <ModalKycNo
                    _title = "KYC审核拒绝通过"
                    _onNo={this.onNo.bind(this)}
                    ref="modalKycNo"
                />
            </div>
        )

    }
}

export default Template