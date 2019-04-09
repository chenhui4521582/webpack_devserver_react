/*======== React ======== */
import React,{Component} from 'react';

/*======== 公共组件_breadcrumb ======== */
import ComponentBreadcrumb from '../../../components/breadcrumb/main'

/*======== 表格 ======== */
import Select from './components/select'
import Table from './components/table'

/*======== css ======== */
import './style.scss'

class kyc extends Component{
    constructor(props){
        super(props)
        this.state={
            list:[]
        }
    }
    receiveData(data){
        this.setState({
            list:data
        })
    }

    render(){
        let {childName='',parentName=''} = this.props.location.params||''
        let {list} = this.state;
        return(
            <div className="kyc">
                <ComponentBreadcrumb breadcrumb={{parentName:'用户',childName:'KYC审核'}}/>
                <div className="center">
                    <div className="select_head">
                        <Select _receiveData={this.receiveData.bind(this)} />
                    </div>
                    <div className="select_conter">
                        <Table _list={list}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default kyc