/*api*/
import Axios from 'axios'
import message from '../../components/message/main'
import {Cookie,Localstorage} from '../../util/uitl'
import './code'


Axios.interceptors.request.use(function (config) {
    return config
}, function (error) {
    console.log('通讯失败')
});

Axios.interceptors.response.use(function (response) {
    // 没有拿到登录 LOGIN_TOKEN_ADMIN 跳转到登录页
    const token = Cookie.getCookie('LOGIN_TOKEN_ADMIN');
    let path = window.location.pathname.split('/')[1];
    if (!token&&path!='login.html'||response.data.code == 105108) {
        message.warning('登录超时',2,res=>{
            window.location.href = `./login.html`;
        })
    }
    return response.data;
}, function (error) {
    message.warning('通讯失败',2)
});


class Api {
    constructor(){
        this.BROCKER_ID = '10003';
    }
    stringHeader(header){
        let result = [];
        if($.isEmptyObject(header) === true){
            return ''
        }else{
            $.map(header,(item,key)=>{
                result.push(`${key}=${item}`)
            });
            return result.join(',')
        }
    };

    getAuthHeader(header) {
        let headers = {
            'Content-Type': "application/json; charset=utf-8",
            'accept-language': 'zh-CN'
        };
        let token = Cookie.getCookie('LOGIN_TOKEN_ADMIN');

        let auth = {};

        if (token) {
            auth.token = token;
        }

        if (header && $.isEmptyObject(header) === false) {
            auth = $.extend(auth , header);
        }

        if ($.isEmptyObject(auth) === false) {
            headers.authorization = this.stringHeader(auth);
        }
        return headers;
    };

    GET(url, params = {}, header) {
        if(!params.brokerId&&params.brokerId!=='' ){
            params.brokerId = this.BROCKER_ID;
        }
        let headers = this.getAuthHeader(header);
        return Axios.get(`/exchange_manager${url}`,{
            headers,
            params
        })
    };

    POST(url, params = {}, header={}) {
        if(!params.brokerId&&params.brokerId!=='' ){
            params.brokerId = this.BROCKER_ID;
        }
        let headers = this.getAuthHeader(header);
        return Axios({
            method: 'post',
            url:`/exchange_manager${url}`,
            data: params,
            headers
        })
    };
}

export default Api;