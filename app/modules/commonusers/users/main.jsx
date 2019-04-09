/*======== React ======== */
import React,{Component} from 'react';

/*======== Component ======== */
import ComponentBreadcrumb from '../../../components/breadcrumb/main'
import ComponentMessage from '../../../components/message/main'
import Select from './components/select'
import Table from './components/table'

/*======== 工具 ======== */
import Service from '../../../config/service/service_commonusers'

/*======== Css ======== */
import './style.scss'

class users extends Component{
    constructor(props){
        super(props)
        this.state={
            _list:[],
            pageNo:1,
            pageSize:10,
            inputValue:'',
            inputKey:'uid',
            sortOrder:'desc',
            sortProp:'create_date',
            startDate:'',
            endDate:''
        }
    }

    /*======== 生成 Ajax 参数 ======== */
    countParams(){
        let {pageNo,pageSize,inputValue,inputKey,sortOrder,sortProp,endDate,startDate,uid} =this.state;
        let params = {
            pageNo,
            pageSize,
            inputKey,
            sortOrder,
            sortProp,
        }
        if(inputValue&&inputKey){
            params[inputKey] = inputValue;
        }
        if(startDate){
            params['startDate'] = startDate;
        }
        if(endDate){
            params['endDate'] = endDate;
        }
        return params;
    }

    /*======== 请求数据 ======== */
    _submit(res){
        let newState = Object.assign(this.state,res);
        this.setState(res=>{
            newState
        })
        let params = this.countParams(),
            header={};
        Service.commonusers_user(params,header).then(res=>{
            if(res.code === window.CODE.SUCCESS){
                this.setState({
                    _list:res.data
                })
            }else{
                ComponentMessage.warning(res.msg,2)
            }

        })
    }

    /*======== 传递给组件(Table)按字段排序 ======== */
    _tableChange(pagination,filters,sorte){
        if(sorte.order){
            this.setState({
                sortOrder: sorte.order.replace(/end/g,''),
                sortProp: sorte.columnKey,
            },res=>{
                this._submit();
            })
        }
    }

    /*======== 传递给组件(Table)分页查询 ======== */
    _paginationChange(page,pageSize){
        this.setState({
            pageNo:page
        },res=>{
            this._submit();

        })

    };

    /*======== 生命周期 ======== */
    componentDidMount(){
        this._submit();
    }

    render(){
        let {childName='',parentName=''} = this.props.location.params||'';
        let {_list} = this.state;
        return(
            <div className="users">
                <ComponentBreadcrumb breadcrumb={{childName:'用户信息',parentName:'用户'}}/>
                <div className="center">
                    <Select
                        _submit={this._submit.bind(this)}
                    />
                    <Table
                        _list={_list}
                        _paginationChange={this._paginationChange.bind(this)}
                        _tableChange={this._tableChange.bind(this)}
                        _history = {this.props.history}
                    />
                </div>
            </div>
        )
    }
}

export default users