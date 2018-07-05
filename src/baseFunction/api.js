let baseApi = {};

baseApi.login = "loginApi/login";
baseApi.register = "registerApi/register";
baseApi.getChainId = "chainManagerApi/getChainId";
baseApi.getChainCount = "chainManagerApi/numbersOfChain";
baseApi.getAllChains = "chainManagerApi/getChainList";
baseApi.getChainByPage = "chainManagerApi/getChainListByPage";
baseApi.getChainById = "chainManagerApi/getChainById";
baseApi.createChain = "chainManagerApi/createChain";
baseApi.updateChain = "chainManagerApi/updateChain";
baseApi.deleteChain = "chainManagerApi/deleteChain";

export default {
    login: function (userName, password) {
        return {
            paramter :
            {
                userName : userName,
                password : password
            },
            apiLocation : baseApi.login,
        };
    },
    register: function () {
        return baseApi.register;
    },
    getChainId: function () {
        return baseApi.getChainId;
    },
    getChainCount: function () {
        return baseApi.getChainCount;
    },
    getAllChains: function () {
        return {
            paramter : {},
            apiLocation : baseApi.getAllChains,
        };
    },
    getChainByPage: function () {
        return baseApi.getChainByPage;
    },
    getChainById: function () {
        return baseApi.getChainById;
    },
    createChain: function () {
        return baseApi.createChain;
    },
    updateChain: function () {
        return baseApi.updateChain;
    },
    deleteChain: function () {
        return baseApi.deleteChain;
    }
}