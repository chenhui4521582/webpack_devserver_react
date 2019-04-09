/**
 *  用户 ajax 请求
 *  search_user  查询管理端用户
 *  search_user_detail  用户登录信息
 **/
import Api from "./Api";

class admin extends Api{
    constructor(props){
        super(props)
    }

    search_user(params,header){
        return this.GET('/admin/list',params,header)
    }

    search_user_detail(params,header){
        return this.GET('/admin/operlog-query',params,header)
    }

    user_lock(params,header){
        return this.POST('/admin/lock',params,header)
    }

    reset_google(params,header){
        return this.GET('/manager/googlecode-reset',params,header)
    }

    reset_pwd(params,header){
        return this.POST('/admin/reset-login-password',params,header)
    }

    user_unlock(params,header){
        return this.POST('/admin/unlock',params,header)
    }

    searchRoleList(params,header){
        return this.GET('/roleManager/role-list',params,header)
    }

    addUser(params,header){
        return this.POST('/admin/new',params,header)
    }

}
export default new admin()