import Api from './Api'

class Services extends Api{
    constructor(props){
        super(props)
    }
    //登录
    login(params={},header={}){
        return this.GET('/admin/login',params,header)
    }
    //退出
    logout(params={},header={}){
        return this.GET('/admin/logout',params,header)
    }
}

export default new Services();