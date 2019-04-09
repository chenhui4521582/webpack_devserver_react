import React,{Component} from 'react';

class summary extends Component{
    componentDidMount(){

    }
    componentReceiveProps(){
        console.log(this.props)
    }
    render(){
        return(
            <div className="summary">
                summary
            </div>
        )
    }
}

export default summary