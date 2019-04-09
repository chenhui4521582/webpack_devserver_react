import React,{Component} from 'react';

class record extends Component{
    componentDidMount(){

    }
    componentReceiveProps(){
        console.log(this.props)
    }
    render(){
        return(
            <div className="record">
                record
            </div>
        )
    }
}

export default record