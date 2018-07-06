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
    getChainId: function (websocket) {
        return {
            paramter : {
                websocket:websocket
            },
            apiLocation : baseApi.getChainId,
        };
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
    getChainById: function (websocket) {
        return {
            paramter : {
                websocket:websocket
            },
            apiLocation : baseApi.getChainId,
        };
    },
    createChain: function (chainAlies,chainWebsocket,chainPrefix,chainId,testChain) {
        return {
            paramter : {
                chainAlies:chainAlies,
                chainWebsocket:chainWebsocket,
                chainPrefix:chainPrefix,
                chainId:chainId,
                testChain:testChain
            },
            apiLocation : baseApi.createChain,
        };
    },
    updateChain: function (id,chainAlies,chainWebsocket,chainPrefix,chainId,testChain) {
        return {
            paramter : {
                id:id,
                chainAlies:chainAlies,
                chainWebsocket:chainWebsocket,
                chainPrefix:chainPrefix,
                chainId:chainId,
                testChain:testChain
            },
            apiLocation : baseApi.updateChain,
        };
    },
    deleteChain: function (id) {
        return {
            paramter : {id:id},
            apiLocation : baseApi.deleteChain,
        };
    }
}