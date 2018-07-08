/**
 * Created by chouheiwa on 2018/7/6.
 */

const common = {};
/**
 * 获取url地址
 * @param name
 */

common.getQueryString = function (name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r !== null) return unescape(r[2]);
    return null;
};

/**
 * 获取url地址--NEW ,如果该方法获取不到会重新用上面的方法获取
 * @param _that
 * @param name
 * @returns {*}
 */

common.localQuery = function (_that, name) {
    let value = '';
    if (!this.isEmpty(_that) &&
        !this.isEmpty(_that.props) &&
        !this.isEmpty(_that.props.location) &&
        !this.isEmpty(_that.props.location.query)) {
        value = _that.props.location.query[name];
    }
    if (this.isEmpty(value)) {
        value = this.getQueryString(name);
    }
    return value;
};
/**
 * 判断是不是空的或者undefined
 * @param obj
 * @returns {boolean}
 */

common.isNull = function (obj) {
    return obj === null || typeof obj === 'undefined' || obj === undefined;
};

/**
 * 判断是不是空的字符串
 * @param obj
 * @returns {boolean}
 */

common.isEmpty = function (obj) {
    return this.isNull(obj) || obj === '';
};

export default common;