import React,{Component} from 'react';

class google extends Component{
    componentDidMount(){

    }
    componentReceiveProps(){
        console.log(this.props)
    }
    render(){
        return(
            <div className="google">
                google
            </div>
        )
    }
}

export default google