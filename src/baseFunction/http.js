import axios from 'axios';
// 配置API接口地址
var root = 'http://localhost:8080/MyTest/';

class BaseResult {
    constructor(dic) {
        this.status = dic["status"];
        this.errorCode = dic["errorCode"];
        this.message = dic["message"];
        this.result = dic["result"];
    }
}

// 自定义判断元素类型JS
function toType (obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
    for (var key in o) {
        if (o[key] === null) {
            delete o[key]
        }
        if (toType(o[key]) === 'string') {
            o[key] = o[key].trim()
        } else if (toType(o[key]) === 'object') {
            o[key] = filterNull(o[key])
        } else if (toType(o[key]) === 'array') {
            o[key] = filterNull(o[key])
        }
    }
    return o
}
/*
 接口处理函数
 这个函数每个项目都是不一样的，我现在调整的是适用于
 https://cnodejs.org/api/v1 的接口，如果是其他接口
 需要根据接口的参数进行调整。参考说明文档地址：
 https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
 主要是，不同的接口的成功标识和失败提示是不一致的。
 另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
 */

function apiAxios (method, api, params, success, failure) {
    if (params) {
        params = filterNull(params)
    }
    axios({
        method: method,
        url: root + api,
        data: method === 'POST' || method === 'PUT' ? JSON.stringify(params) : null,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        params: method === 'GET' || method === 'DELETE' ? params : null,
        baseURL: root,
        withCredentials: false
    })
        .then(function (res) {
            var base = new BaseResult(res.data);

            if (base.status) {
                success(base.result);
            }else {
                failure(base.message);
            }

        })
        .catch(function (err) {
            let res = err.response;
            if (err) {
                console.log(err);
                window.alert('api error!')
            }
        })
}

// 返回在vue模板中的调用接口
export default {
    get: function (api, success, failure) {
        return apiAxios('GET', api.apiLocation, api.paramter, success, failure)
    },
    post: function (api, success, failure) {
        return apiAxios('POST', api.apiLocation, api.paramter, success, failure)
    },
    put: function (api, params, success, failure) {
        return apiAxios('PUT', api.apiLocation, api.paramter, success, failure)
    },
    delete: function (api, params, success, failure) {
        return apiAxios('DELETE', api.apiLocation, api.paramter, success, failure)
    }
}
