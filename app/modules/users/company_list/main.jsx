import React,{Component} from 'react';

class company_list extends Component{
    componentDidMount(){

    }
    componentReceiveProps(){
        console.log(this.props)
    }
    render(){
        return(
            <div className="company_list">
                company_list
            </div>
        )
    }
}

export default company_list