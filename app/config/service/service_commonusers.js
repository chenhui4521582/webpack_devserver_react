/*
*   所有的api 接口
*/
import Api from './Api'
class Services extends Api{
    constructor(){
        super()
    }

    //获取Menu菜单
    getMenuList(params={},header={}){
        return this.GET('/roleManager/menu-admin-list',params={},header={})
    }

    //用户管理/ 用户信息
    commonusers_user(params={},header={}){
        return this.GET('/security/overseas/user-list',params,header)
    }
    //用户管理 / 导出用户数据
    exportUser(params={},header={}){
        return this.GET('/security/overseas/exportUserBaseList',params,header)
    }

    //用户账号
    userAccounts(params={},header={}){
        return this.GET('/asset/getUserAccounts-v2',params,header)
    }
    //用户详情
    user_detail(params={},header={}){
        return this.GET('/security/overseas/user-detail',params,header)
    }
    //KYC
    kyc_list(params={},header={}){
        return this.GET('/security/overseas/identities',params,header)
    }
    //KYC 通过
    KYC_OK(params={},header={}){
        return this.GET('/security/overseas/identity-audit',params,header)
    }
    //C2C
    C2C(params={},header={}){
        return this.GET('/c2ccomplaint/query',params,header)
    }
    //C2C 详情
    C2C_detail(params={},header={}){
        return this.GET('/c2ccomplaint/detail',params,header)
    }
    //C2C 关闭订单

    C2C_closeForce(params={},header={}){
        return this.GET('/c2ccomplaint/close-force',params,header)
    }
    //C2C 强制打币

    C2C_transforForce(params={},header={}){
        return this.GET('/c2ccomplaint/transfor-force',params,header)
    }

    //免手续费
    symbolWithList(params={},header={}){
        return this.GET('/whiteListconfig/query',params,header)
    }

    //添加免手续费
    addSymbolWithList(params={},header={}){
        return this.GET('/whiteListconfig/add',params,header)
    }
    //删除免手续费
    removeSymbolWithList(params={},header={}){
        return this.GET('/whiteListconfig/delete',params,header)
    }

}
export default new Services();