/**
 *  用户 ajax 请求
 **/
import Api from "./Api";

class admin extends Api{
    constructor(props){
        super(props)
    }

    searchAdminRoleList(params,header){
        return this.GET('/roleManager/admin-role-list',params,header)
    }

    addRole(params,header){
        return this.GET('/roleManager/add-role',params,header)
    }

    removeRole(params,header){
        return this.GET('/roleManager/delete_role',params,header)
    }

    memuRoleList(params,header){
        return this.GET('/roleManager/menu-role-list',params,header)
    }


}
export default new admin()