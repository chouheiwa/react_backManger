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

baseApi.selectChainUsers = "chainUserApi/selectUsers";
baseApi.createChainUser = "chainUserApi/createChainUser";
baseApi.updateChainUser = "chainUserApi/updateUser";
baseApi.deleteChainUser = "chainUserApi/deleteUser";

baseApi.actionTransfer = "actionApi/transferAction";
baseApi.actionCreateAsset = "actionApi/createAssetAction";

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
    getChainById: function (id) {
        return {
            paramter : {
                id:id
            },
            apiLocation : baseApi.getChainById,
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
    },
    
    selectChainUsers: function (chainTableId) {
        return {
            paramter : {
                chainTableId : chainTableId,
            },
            apiLocation : baseApi.selectChainUsers,
        }
    },

    createChainUser: function (chainId, userName, userPrivateKey, userAlies) {
        return {
            paramter : {
                chainId : chainId,
                userName : userName,
                userPrivateKey : userPrivateKey,
                userAlies : userAlies,
            },
            apiLocation : baseApi.createChainUser,
        }
    },
    updateChainUser: function (id,chainId, userName, userPrivateKey, userAlies) {
        return {
            paramter : {
                id : id,
                chainId : chainId,
                userName : userName,
                userPrivateKey : userPrivateKey,
                userAlies : userAlies,
            },
            apiLocation : baseApi.updateChainUser,
        }
    },
    deleterChainUser: function (id,chainTableId) {
        return {
            paramter : {
                id: id,
                chainTableId : chainTableId
            },
            apiLocation : baseApi.deleteChainUser,
        };
    },
    actionTransfer: function (chainTableId,chainUserId,toAccount,symbol,amount,memo) {
        return {
            paramter : {
                chainTableId:chainTableId,
                chainUserId:chainUserId,
                toAccount:toAccount,
                symbol:symbol,
                amount:amount,
                memo:memo,
            },
            apiLocation : baseApi.actionTransfer,
        }
    },
    actionCreateAsset: function (chainTableId,chainUserId,assetSymbol,precision,maxSupply,baseAmount,quoteAmount,description,bitAsset) {
        return {
            paramter : {
                chainTableId:chainTableId,
                chainUserId:chainUserId,
                assetSymbol:assetSymbol,
                precision:precision,
                maxSupply:maxSupply,
                baseAmount:baseAmount,
                quoteAmount:quoteAmount,
                description:description,
                bitAsset:bitAsset
            },
            apiLocation : baseApi.actionCreateAsset,
        }
    },
}