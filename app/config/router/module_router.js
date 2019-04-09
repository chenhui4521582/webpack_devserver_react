import React,{Component} from 'react';
import {Route,Redirect,Switch} from 'react-router-dom';

/*
*   用户          ADMIN
*   登录信息       ADMIN_USER
*   添加用户       ADMIN_USER
*   登录信息        ADMIN_USER_DETAIL
*/
import admin_user from '../../modules/admin/user/main'
import admin_user_detail from '../../modules/admin/user/detail/main'
import admin_add from '../../modules/admin/add/main'

/*
*   角色            ROLE
*   角色管理        ROLE_LIST
*   添加角色        ROLE_ADD
*   人员查看        ROLE_PEOPLE
*   人员管理        ROLE_CONFIG
*/
import role_list from '../../modules/role/list/main'
import role_add from '../../modules/role/add/main'
import role_people from '../../modules/role/list/peopleList/main'
import role_config from '../../modules/role/list/roleConfig/main'

/*
*   用户管理        COMMONUSERS
*   用户信息        COMMONUSERS_USER
*   KYC审核        COMMONUSERS_KYC
*   C2C审核        COMMONUSERS_C2C
*   免手续费名单        SETTING_SYMBOLWHITELIST
*   用户详情        COMMOMUSERS_PRESONAL_INFO
*   C2C审核详情        COMMONUSERS_C2C_DETAIL
*/
import commonusers_users from '../../modules/commonusers/users/main'
import commonusers_kyc from '../../modules/commonusers/kyc/main'
import commonusers_C2C from '../../modules/commonusers/c2c/main'
import setting_symbolWhiteList from '../../modules/commonusers/symbol_white_list/main'
import commonusers_personal_info from '../../modules/commonusers/personal_info/main'
import commonusers_C2C_detail from '../../modules/commonusers/c2c/detail/main'

/*
*   资产管理        COIN
*   充值记录        COININ
*   体现记录        COINOUT
*   体现审核        COINCHECK
*   内转审核        INTERIOR
*/
import coin_in from '../../modules/coin/coin_in/main'
import coin_out from '../../modules/coin/coin_out/main'
import coin_check from '../../modules/coin/coin_check/main'
import coin_interior from '../../modules/coin/coin_out/main'

/*
*   交易管理        TRADE
*   交易查询        TRADE_RECORD
*   委托查询        TRADE_ENTRUSRECORD
*/
import trade_record from '../../modules/trade/record/main'
import trade_entrustRecord from '../../modules/trade/entrustRecord/main'

/*
*   网站维护        SETTING
*   币种列表        SETTING_COINCONFIG
*   增加新币        SETTING_COINADD
*   交易配置        SETTING_SYMBOLCONFIG
*   增加交易        SETTING_SYMBOLADDS

*/
import setting_coinConfig from '../../modules/setting/coin_config/main'
import setting_coinAdd from '../../modules/setting/coin_add/main'
import setting_symbolConfig from '../../modules/setting/symbol_config/main'
import setting_symbolAdd from '../../modules/setting/symbol_add/main'

/*
*   控制面板        ACCOUNT
*   密码管理        ACCOUNT_SETPWD
*   谷歌验证        ACCOUNT_GOOGLE
*   登录信息        ACCOUNT_LOGININFO
*/
import account_setPwd from '../../modules/account/set_pwd/main'
import account_google from '../../modules/account/google/main'
import account_loginInfo from '../../modules/account/login_info/main'


/*
*   券商账户        USERS
*   券商列表        USERS_COMPANYLIST
*/
import users_companylist from '../../modules/users/company_list/main'

/*
*   财务         FINANCE
*   总报表        FINANCE_SUMMARY
*   归集失败        FINANCE_COLLECTION_FAILED
*   归集成功        FINANCE_COLLECTION_SUCCESS
*   平台面板        FINANCE_PANEL
*   用户资产状态        FINANCE_USER_ASSET
*   平台充值记录        FINANCE_PLAT_DEPOSIT
*   平台提现记录        FINANCE_PLAT_WHITHDRAW
*   平台提币查询        FINANCE_PLATFORM_CURRENCY
*   用户交易记录        FINANCE_TRADE
*   平台总资产过程        FINANCE_PLAT_FORM_ASSET_PROCESS
*   区块链钱包明细        FINANCE_BLOCK_WALLET
*   平台总资产状态        FINANCE_PLATFROM_ASSET
*   区块链充值提现        FINANCE_BLOCK_DEPOWITH
*   平台钱包余额总表        FINANCE_BLOCK_WALLET_SUM
*   平台账户归集查询        FINANCE_PLATFORM_COLLECTION
*   管理员调整资产记录        FINANCE_MANEGERASSET
*/
import finance_summary from '../../modules/finance/summary/main'
import finance_collection_failed from '../../modules/finance/collection_failed/main'
import finance_collection_success from '../../modules/finance/collection_success/main'
import finance_panel from '../../modules/finance/panel/main'
import finance_user_asset from '../../modules/finance/user_asset/main'
import finance_plat_deposit from '../../modules/finance/plat_deposit/main'
import finance_plat_withdraw from '../../modules/finance/plat_withdraw/main'
import finance_platfrom_currency from '../../modules/finance/platfrom_currency/main'
import finance_trade from '../../modules/finance/trade/main'
import finance_platform_asset_process from '../../modules/finance/platfrom_asset_process/main'
import finance_block_wallet from '../../modules/finance/block_wallet/main'
import finance_platfrom_asset from '../../modules/finance/platfrom_asset/main'
import finance_block_depowith from '../../modules/finance/block_depowith/main'
import finance_block_wallet_sum from '../../modules/finance/block_wallet_sum/main'
import finance_platfrom_collection from '../../modules/finance/platfrom_collection/main'
import finance_maneger_asset from '../../modules/finance/maneger_asset/main'

class ReactRoutes extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){

    }

    render(){
        return (
            <Switch>
                <Route exact path='/admin/user' component={admin_user}/>
                <Route path='/admin/user/detail' component={admin_user_detail}/>
                <Route path='/admin/add' component={admin_add}/>

                <Route path='/commonusers/user' component={commonusers_users}/>
                <Route path='/commonusers/kycs' component={commonusers_kyc}/>
                <Route exact path='/commonusers/c2c' component={commonusers_C2C}/>
                <Route path='/commonusers/c2c/detail' component={commonusers_C2C_detail}/>
                <Route path='/commonusers/symbol_white_list' component={setting_symbolWhiteList} />
                <Route path='/commonusers/personal_info' component={commonusers_personal_info} />

                <Route exact path='/role/list' component={role_list}/>
                <Route path='/role/add' component={role_add}/>
                <Route path='/role/list/people' component={role_people}/>
                <Route path='/role/list/config' component={role_config}/>

                <Route path='/coin_in/:id' component={coin_in} />
                <Route path='/coin_out/:id' component={coin_out} />
                <Route path='/coin_check/:id' component={coin_check} />
                <Route path='/coin_interior/:id' component={coin_interior} />

                <Route path='/trade/record' component={trade_record} />
                <Route path='/trade/entrustRecord' component={trade_entrustRecord} />

                <Route path='/setting/coin_config' component={setting_coinConfig} />
                <Route path='/setting/coin_add' component={setting_coinAdd} />
                <Route path='/setting/symbol_config' component={setting_symbolConfig} />
                <Route path='/setting/symbol_add' component={setting_symbolAdd} />

                <Route path='/account/set_pwd' component={account_setPwd} />
                <Route path='/account/google' component={account_google} />
                <Route path='/account/login_info' component={account_loginInfo} />

                <Route path='/users/companylist' component={users_companylist} />

                <Route path='/finance/summary' component={finance_summary} />
                <Route path='/finance/collection_failed' component={finance_collection_failed} />
                <Route path='/finance/collection_success' component={finance_collection_success} />
                <Route path='/finance/panel' component={finance_panel} />
                <Route path='/finance/user_asset' component={finance_user_asset} />
                <Route path='/finance/plat_deposit' component={finance_plat_deposit} />
                <Route path='/finance/plat_withdraw' component={finance_plat_withdraw} />
                <Route path='/finance/platfrom_currency' component={finance_platfrom_currency} />
                <Route path='/finance/trade' component={finance_trade} />
                <Route path='/finance/platform_asset_process' component={finance_platform_asset_process} />
                <Route path='/finance/block_wallet' component={finance_block_wallet} />
                <Route path='/finance/platfrom_asset' component={finance_platfrom_asset} />
                <Route path='/finance/block_depowith' component={finance_block_depowith} />
                <Route path='/finance/block_wallet_sum' component={finance_block_wallet_sum} />
                <Route path='/finance/platfrom_collection' component={finance_platfrom_collection} />
                <Route path='/finance/maneger_asset' component={finance_maneger_asset} />
            </Switch>
        )
    }
}

export default ReactRoutes;