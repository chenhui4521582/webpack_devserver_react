/*======== React ======== */
import React,{Component} from 'react';
import {render} from 'react-dom';

/*======== router ======== */
import Router from '../config/router/router';

/*======== IE兼容 ======== */
import 'babel-polyfill'

/*======== 全局Ajax Code ======== */
import '../config/service/code'

render(
    <Router />,
    $('#App')[0]
);