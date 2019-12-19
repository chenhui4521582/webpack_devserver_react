import React from 'react';
import Loadable from 'react-loadable';

function withLoadable (comp) {
    return Loadable({
        loader:comp,
        loading:()=>null,
        delay:0
    })
}

export {withLoadable}