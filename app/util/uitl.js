class util {
    constructor(props) {

    }
    cookie(){
        return{
            getCookie:(name)=>{
                let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg))
                    return (arr[2]);
                else
                    return null;
            },
            setCookie:(c_name, value, expiredays)=>{
                let exdate = new Date();
                exdate.setDate(exdate.getDate() + expiredays);
                document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
            },
            clearCookie:(name)=>{
                let exp = new Date();
                exp.setTime(exp.getTime() - 1);
                console.log(this)
                let cval = this.cookie().getCookie(name);
                if (cval != null)
                    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
            }
        }
    }
    localstorage(){
        let storage=window.localStorage;
        return {
            get(key){
                let data = storage.getItem(key);
                if(!data){return false}
                let jsonData = JSON.parse(data);
                return jsonData;
            },
            set(key,value){
                if(typeof value === 'string'){
                    storage.setItem(key,value);
                }
                let stringData = JSON.stringify(value);
                storage.setItem(key,stringData);
            },
            remove(key){
                storage.removeItem(key)
            }
        }
    }
    countTime(date,type){
        date = new Date(date);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        m = m < 10 ? `0${m}` : m;
        d = d < 10 ? `0${d}`: d;
        h = h < 10 ? `0${h}` : h;
        minute = minute < 10 ? `0${minute}` : minute;
        second = second < 10 ? `0${second}` : second;
        if(type == 'y-m-d h:m:s'){
            return `${y}-${m}-${d} ${h}:${minute}:${second}`
        }
        if(type == 'y-m-d'){
            return `${y}-${m}-${d}`
        }
    }
    Qstring() {
        let req = window.location.hash.split(/[\&\?]/);
        let theRequest = {};
        for (let i = 0; i < req.length; i++) {
            let temp = req[i].split("=");
            theRequest[temp[0]] = decodeURIComponent(temp[1]);
        }
        return theRequest;
    }
}

let commonUtil = new util(),
    Cookie = commonUtil.cookie(),
    Localstorage = commonUtil.localstorage();
export {Cookie,Localstorage,commonUtil}
export default commonUtil

