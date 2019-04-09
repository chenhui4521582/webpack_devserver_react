import {createStore} from 'redux';

let defaultState = {
    breadcrumb:{
        childName:'',
        pardentName:''
    }
}

let reducer = function(state=defaultState,action){
    let newDate;
    switch (action.type){
        case 'BREADCRUMB':
            newDate = Object.assign({},action.payload)
            return newDate
        default :
            return state
    }
}

const store = createStore(reducer);

export default store;