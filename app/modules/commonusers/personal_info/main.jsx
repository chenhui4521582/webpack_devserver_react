/*======== React ======== */
import React,{Component} from 'react';

/*======== Antd ======== */
import {List,Table,Modal} from 'antd';

/*======== Component ======== */
import Basic from './components/basic';
import Level from './components/level';
import Asset from './components/asset';
import Kyc from './components/kyc';
import Breadcrumb from '../../../components/breadcrumb/main'
import Message from '../../../components/message/main'

/*======== 工具 ======== */
import Service from '../../../config/service/service_commonusers'
import util from '../../../util/uitl'

/*======== Config ======== */
import config from './config'

/*======== Css ======== */
import './style.scss'


class presonal_info extends Component{
    constructor(props){
        super(props)
        this.state = {
            basic:[],
            level:[],
            asset:{},
            kyc:{}
        }
        this.judge_phone = (data)=>{
            let {cardPhoto='',cardHandhold=''} = data;
            cardPhoto = JSON.parse(cardPhoto)||[]
            cardHandhold = JSON.parse(cardHandhold)||[]
            return [cardPhoto[0]||'',cardPhoto[1]||'',cardHandhold[0]||'']
        }

        this.judge_cardType = (data)=>{
            let type = data.cardType
            if(type == 'PASSOORT'){
                return '护照'
            }
            if(type == 'ID_CARD'){
                return '身份证'
            }
        }

        this.judge_expireDate = (data)=>{
            let date = data.expireDate;
            if(!date){
                return '未实名'
            }
            return util.countTime(date,'y-m-d h:m:s')
        }
    }
    componentWillMount(){
        this.personal_init();
    }

    updateBasic(data){
        let {userIdentification,userInfoDto} = data
        this.setState({
            basic:[
                {key:'用户名',value:userIdentification.fullName},
                {key:'UID',value:userInfoDto.uid},
                {key:'等级',value:userInfoDto.authLevel},
                {key:'状态',value:'正常'},
                {key:'注册时间',value:util.countTime(userInfoDto.createDate,'y-m-d h:m:s')},
                {key:'注册IP',value:userInfoDto.createip}
            ]
        })
    }
    updateLevel(data){
        let {userIdentification,userInfoDto} = data;
        this.setState({
            level:[
                {key:'真实姓名',value:userIdentification.fullName},
                {key:'证件类型',value:this.judge_cardType(userIdentification)},
                {key:'证件号码',value:userIdentification.cardNo},
                {key:'证件有效期',value:this.judge_expireDate(userIdentification)},
                {key:'初级实名',value:this.judge_phone(userIdentification),isMap:true}
            ]
        })
    }
    updateAsset(data){
        let newAsset = {};
        $.extend(true,newAsset,config.asset);
        for(var i in data){
            let array =[],
            item = data[i];
            item.forEach((item,index)=>{
                array.push({
                    key:index,
                    assetCode:item.assetCode,
                    assetAmount:item.amountAvailable+item.amountLock,
                    assetUsable:item.amountAvailable,
                    assetLock:item.amountLock
                })
            })
            let num = Math.ceil(item.length / 2);
            newAsset.data[i] = [array.slice(0, num), array.slice(num, num * 2)]
        }
        this.setState({
            asset:newAsset
        })
    }
    updateKyc(data){
        let kyc = {},
        {userIdentifications} = data;
        $.extend(true,kyc,config.kyc);
        userIdentifications.forEach((item,index)=>{
            kyc.data.push({
                key:index,
                updateDate:util.countTime(item.updateDate,'y-m-d h:m:s'),
                auditType:'初级实名',
                auditStatus:item.auditStatus=='OK'?'通过':'',
                auditUid:item.auditUid,
                auditMessage:item.auditMessage||'暂无备注'
            })
        })
        this.setState({
            kyc
        })
    }
    personal_init(){
        let AccountParams = {
                uid:util.Qstring().uid
            },
            DetailParams = {
                type:'UID',
                value:util.Qstring().uid
            },
            header={};
        Service.userAccounts(AccountParams).then(res=>{
            if(res.code == window.CODE.SUCCESS){
                this.updateAsset(res.data);
            }
        })

        Service.user_detail(DetailParams).then(res=>{
            if(res.code == window.CODE.SUCCESS){
                this.updateBasic(res.data);
                this.updateLevel(res.data);
                this.updateKyc(res.data);
            }else{
                Message.warning(res.msg,2)
            }
        })
    }

    render(){
        const {basic=[],level=[],asset={},kyc={}} = this.state;
        return(
            <div className="presonal">
                <Breadcrumb breadcrumb={{parentName:'用户',childName:'用户详情'}}></Breadcrumb>
                <div className="center">
                    <div className="panel">
                        <Basic _list={basic}/>
                    </div>
                    <div className="panel">
                        <Level _list={level}/>
                    </div>
                    <div className="panel">
                        <Asset _list={asset}/>
                    </div>
                    <div className="panel">
                        <Kyc _list={kyc}></Kyc>
                    </div>

                </div>
            </div>
        )
    }
}

export default presonal_info;
