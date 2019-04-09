class menuList{
    constructor(){
        this.slideBar = [
            {
                id:100,
                role:'admin',
                name: '用户',
                icon:'user',
                nodes: [
                    {
                        id:101,
                        name: '登录信息',
                        url: '/admin/user',
                        originUrl:'admin/user'
                    },
                    {
                        id:102,
                        name: '添加用户',
                        url: '/admin/add',
                        originUrl:'admin/add'
                    }
                ]
            },
            {
                id:200,
                role:'role',
                name: '角色',
                icon:'team',
                nodes: [
                    {
                        id:201,
                        name: '角色管理',
                        url: '/role/list',
                        originUrl:'role/list'
                    },
                    {
                        id:202,
                        name: '添加角色',
                        url: '/role/add',
                        originUrl:'role/add'
                    }
                ]
            },
            {
                id:300,
                role:'commonusers',
                name: '用户管理',
                icon:'idcard',
                nodes:[
                    {
                        id:301,
                        name:'用户信息',
                        url: '/commonusers/user',
                        originUrl:'commonusers/commonusers'
                    },
                    {
                        id:302,
                        name:'KYC审核',
                        url: '/commonusers/kycs',
                        originUrl:'commonusers/kycs/verify'
                    },
                    {
                        id:303,
                        name:'C2C申述管理',
                        url: '/commonusers/c2c',
                        originUrl:'c2c/complaint'
                    },
                    {
                        id:304,
                        name: '免手续费名单',
                        url: '/commonusers/symbol_white_list',
                        originUrl:'commonusers/symbol-white-list',
                        isShow:true
                    }
                ]
            },
            {
                id:400,
                role:'coin',
                name: '资产管理',
                icon:'property-safety',
                nodes:[
                    {
                        id:401,
                        name:'充值记录',
                        url: '/coinin/btc',
                        originUrl:'coinin/:coinType'
                    },
                    {
                        id:402,
                        name: '提现记录',
                        url: '/coinout/btc',
                        originUrl:'coinout/:coinType'
                    },
                    {
                        id:403,
                        name: '体现审核',
                        url: '/coincheck/btc',
                        originUrl:'coincheck/:coinType'

                    },
                    {
                        id:404,
                        name: '内转审核',
                        url: '/interior/btc',
                        originUrl:'interior/:btc'
                    }
                ]
            },
            {
                id:500,
                role:'trade',
                name: '交易管理',
                icon:'dollar',
                nodes: [
                    {
                        id:501,
                        name: '交易查询',
                        url: '/trade/record',
                        originUrl:'trade/record'
                    },
                    {
                        id:502,
                        name: '委托查询',
                        url: '/trade/entrustRecord',
                        originUrl:'trade/entrustRecord'
                    }
                ]
            },
            {
                id:600,
                role:'setting',
                name: '上市管理',
                icon:'tool',
                nodes: [
                    {
                        id:601,
                        name: '币种列表',
                        url: '/setting/coin_config',
                        originUrl:'setting/coin-config'
                    },
                    {
                        id:602,
                        name: '增加新币',
                        url: '/setting/coin_add',
                        originUrl:'setting/coin-add'
                    },
                    {
                        id:603,
                        name: '交易配置',
                        url: '/setting/symbol_config',
                        originUrl:'setting/symbol-config'
                    },
                    {
                        id:604,
                        name: '增加交易',
                        url: '/setting/symbol_add',
                        originUrl:'setting/symbol-add'
                    },
                    {
                        id:605,
                        name: '通证列表',
                        url: '/setting/token-coin-config',
                        originUrl:'setting/token-coin-config'
                    },
                    {
                        id:606,
                        name: '新增通证',
                        url: '/setting/token-coin-add',
                        originUrl:'setting/token-coin-add'
                    },
                    {
                        id:607,
                        name: '通证交易配置',
                        url: '/setting/token-symbol-config',
                        originUrl:'setting/token-symbol-config'
                    },
                    {
                        id:608,
                        name: '增加通证交易',
                        url: '/setting/token-symbol-add',
                        originUrl:'setting/token-symbol-add'
                    },
                    {
                        id:609,
                        name: '交易区配置',
                        url: '/setting/switch-trade-config',
                        originUrl:'setting/switch-trade-config'
                    }
                ]
            },
            {
                id:700,
                role:'account',
                name: '控制面板',
                icon:'setting',
                nodes: [
                    {
                        id:701,
                        name: '密码管理',
                        url: '/account/set_pwd',
                        originUrl:'account/set-pwd'
                    },
                    {
                        id:702,
                        name: '谷歌验证',
                        url: '/account/google',
                        originUrl:'account/google'
                    },
                    {
                        id:703,
                        name: '登录信息',
                        url: '/account/login_info',
                        originUrl:'account/login-info'
                    }
                ]
            },
            {
                id:800,
                role:'users',
                name: '券商账户',
                icon:'money-collect',
                nodes: [
                    {
                        id:801,
                        name: '券商列表',
                        url: '/users/companylist',
                        originUrl:'users/companylist'
                    }
                ]
            },
            {
                id:900,
                role:'finance',
                name: '财务',
                icon:'safety-certificate',
                nodes: [
                    {
                        id:901,
                        name: '总报表',
                        url: '/finance/summary',
                        originUrl:'finance/summary'
                    },
                    {
                        id:902,
                        name: '用户资产状态',
                        url: '/finance/user_asset',
                        originUrl:'finance/userasset'
                    },
                    {
                        id:903,
                        name: '平台总资产状态',
                        url: '/finance/platform_asset_process',
                        originUrl:'finance/platformasset'
                    },
                    {
                        id:904,
                        name: '平台充值记录',
                        url: '/finance/plat_deposit',
                        originUrl:'finance/platdeposit'
                    },
                    {
                        id:905,
                        name: '平台提现记录',
                        url: '/finance/plat_withdraw',
                        originUrl:'finance/platwithdraw'
                    },
                    {
                        id:906,
                        name: '平台提币查询',
                        url: '/finance/platfrom_currency',
                        originUrl:'finance/financeplatformexportcurrency'
                    },
                    {
                        id:907,
                        name: '管理员调整资产记录',
                        url: '/finance/maneger_asset',
                        originUrl:'finance/manegerasset'
                    },
                    {
                        id:908,
                        name: '用户交易记录',
                        url: '/finance/trade',
                        originUrl:'finance/trade'
                    },
                    {
                        id:909,
                        name: '平台总资产过程',
                        url: '/finance/platform_asset_process',
                        originUrl:'finance/platformassetprocess'
                    },
                    {
                        id:910,
                        name: '区块链钱包明细',
                        url: '/finance/block_wallet',
                        originUrl:'finance/blockwallet'
                    },
                    {
                        id:911,
                        name: '区块链充值提现',
                        url: '/finance/block_depowith',
                        originUrl:'finance/blockdepowith'
                    },
                    {
                        id:912,
                        name: '平台钱包余额总表 ',
                        url: '/finance/block_wallet_sum',
                        originUrl:'finance/blockwalletsum'
                    },
                    {
                        id:913,
                        name: '平台面板',
                        url: '/finance/panel',
                        originUrl:'finance/panel'
                    }
                ]
            }
        ]
        this.roleList = {
            '/admin/user':{parentID:100,childID:101},
            '/admin/user/detail':{parentID:100,childID:101},
            '/admin/add':{parentID:100,childID:102},
            '/role/list':{parentID:200,childID:201},
            '/role/list/people':{parentID:200,childID:201},
            '/role/list/config':{parentID:200,childID:201},
            '/role/add':{parentID:200,childID:202},
            '/commonusers/user':{parentID:300,childID:301},
            '/commonusers/kycs':{parentID:300,childID:302},
            '/commonusers/c2c':{parentID:300,childID:303},
            '/commonusers/symbol_white_list':{parentID:300,childID:304},
            '/commonusers/personal_info/':{parentID:300,childID:301},
            '/commonusers/c2c/detail/':{parentID:300,childID:303},
            '/coinin/btc':{parentID:400,childID:401},
            '/coinout/btc':{parentID:400,childID:402},
            '/coincheck/btc':{parentID:400,childID:403},
            '/trade/record':{parentID:500,childID:501},
            '/trade/entrustRecord':{parentID:500,childID:501},
            '/setting/coin_config':{parentID:600,childID:601},
            '/setting/coin_add':{parentID:600,childID:602},
            '/setting/symbol_config':{parentID:600,childID:603},
            '/setting/symbol_add':{parentID:600,childID:604},
            '/setting/token-coin-config':{parentID:600,childID:605},
            '/setting/token-coin-add':{parentID:600,childID:606},
            '/setting/token-symbol-config':{parentID:600,childID:607},
            '/setting/token-symbol-add':{parentID:600,childID:608},
            '/setting/switch-trade-config':{parentID:600,childID:609},
            '/account/set_pwd':{parentID:700,childID:701},
            '/account/google':{parentID:700,childID:702},
            '/account/login_info':{parentID:700,childID:703},
            '/users/companylist':{parentID:800,childID:801},
            '/finance/summary':{parentID:900,childID:901},
            '/finance/user_asset':{parentID:900,childID:902},
            '/finance/platform_asset_process':{parentID:900,childID:903},
            '/finance/plat_deposit':{parentID:900,childID:904},
            '/finance/plat_withdraw':{parentID:900,childID:905},
            '/finance/platfrom_currency':{parentID:900,childID:906},
            '/finance/maneger_asset':{parentID:900,childID:907},
            '/finance/trade':{parentID:900,childID:908},
            '/finance/platform_asset_process':{parentID:900,childID:909},
            '/finance/block_wallet':{parentID:900,childID:910},
            '/finance/block_depowith':{parentID:900,childID:911},
            '/finance/block_wallet_sum':{parentID:900,childID:912},
            '/finance/panel':{parentID:600,childID:913},
            '/finance/platfrom_collection':{parentID:900,childID:914},
            '/finance/collection_success':{parentID:900,childID:914},
            '/finance/collection_failed':{parentID:900,childID:914},
        }
    }
    screenMenuList(data){
        if($.isEmptyObject(data) === true){
            return false
        }
        let serverUrl = [];
        $.map(data,item=>{
            serverUrl.push(item.menuModule)
        })
        $.map(this.slideBar,item=>{
            if(item.nodes){
                $.map(item.nodes,(nodes_item,index)=>{
                    if(serverUrl.indexOf(nodes_item.originUrl) > -1 ){
                        nodes_item.isShow = true;
                        item.isShow = true;
                    }else{
                        nodes_item.isShow = false;
                    }
                })
            }
        })
        window.$role = serverUrl;
        return {menulist:this.slideBar,roleList:this.roleList};
    }
}

export default new menuList();
