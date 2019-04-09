/*======== React ======== */
import React,{Component} from 'react';

/*======== Component ======== */
import ComponentBreadcrumb from '../../../components/breadcrumb/main'
import Message from '../../../components/message/main'
import Select from './components/select'
import Table from './components/table'

/*======== 工具 ======== */
import Service from '../../../config/service/service_commonusers'

/*======== Css ======== */
import './style.scss'

class Template extends Component{
    constructor(props){
        super(props)
        this.state={
            _list:[],
            _total:0,
            pageNo: 1,
            pageSize: 10,
            status: 'PROCESSING',
            complainType:""
        }
    }

    submit(){
        const {pageNo,pageSize,status,complainType} = this.state;
        let params={
            pageNo,
            pageSize,
            status,
            complainType,
            _list:[]
        },header={}
        Service.C2C(params,header).then(res=>{
            if(res.code == window.CODE.SUCCESS){
                this.setState({
                    _list:res.data.list,
                    _total:res.data.total
                })
            }else{
                Message.warning(res.msg,2)
            }
        })
    }

    _receiveData(callback){
        var data = Object.assign(this.state,callback)
        this.setState({
            data
        },res=>{
            this.submit();
        })
    }

    _paginationChange(page,pageSize){
        this.setState({
            pageNo:page
        },res=>{
            this.submit();
        })
    }

    componentWillMount(){
        this.submit();
    }

    render(){
        const {_list,_total} = this.state;
        const {history} = this.props;
        return(
            <div className="C2C">
                <ComponentBreadcrumb breadcrumb={{childName:'申述',parentName:'C2C'}}/>
                <div className="center">
                    <Select
                        _receiveData={this._receiveData.bind(this)}
                    />
                    <Table
                        _list={_list}
                        _total={_total}
                        _paginationChange={this._paginationChange.bind(this)}
                        _history = {history}
                    />
                </div>
            </div>
        )
    }
}

export default Template