const BASE_URL = 'https://drip-backend.herokuapp.com/'

const createUser = async (userObj) => {
    let url = BASE_URL + 'accounts/create_user/'
    let init = {
        headers: { 'Content-Type': 'application/json' },
        method: "POST",
        body: JSON.stringify(userObj)
    }
    return await tryCatchFetch(url, init)
}

const getToken = async (userObj) => {
    let url = BASE_URL + 'accounts/get_token/'
    let init = {
        headers: { 'Content-Type': 'application/json' },
        method: "POST",
        body: JSON.stringify(userObj)
    }
    return await tryCatchFetch(url, init)
}

const userGraphList = async (token) => {
    let url = BASE_URL + 'api/graphs/'
    let init = {
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Token ${token}`
        },
        method: 'GET'
    }
    return await tryCatchFetch(url, init)
}

const newGraph = async (token, graphData) => {
    let url = BASE_URL + 'api/graphs/'
    let init = {
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Token ${token}`
        },
        method: 'POST',
        body: JSON.stringify(graphData)

    }
    return await tryCatchFetch(url, init)
}

const userGraphDetail = async (token, graphID) => {
    let url = BASE_URL + `api/graphs/${graphID}/`
    let init = {
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Token ${token}`
        },
        method: 'GET',
    }
    return await tryCatchFetch(url, init)
}

const userGraphDelete = async (token, graphID) => {
    let url = BASE_URL + `api/graphs/${graphID}/`
    let init = {
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Token ${token}`
        },
        method: 'DELETE'
    }
    return await tryCatchFetch(url, init)
}

const userAssetDetail = async (token, graphID, assetID) => {
    let url = BASE_URL + `api/graphs/${graphID}/${assetID}/`
    let init = {
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Token ${token}`
        },
        method: 'GET',
    }
    return await tryCatchFetch(url, init)
}

const userAssetDelete = async (token, graphID, assetID) => {
    let url = BASE_URL + `api/graphs/${graphID}/${assetID}/`
    let init = {
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Token ${token}`
        },
        method: 'DELETE'
    }
    return await tryCatchFetch(url, init)
}

const saveAsset = async (graphID, assetObj, token) => {
    let url = BASE_URL + `api/graphs/${graphID}/addasset/`
    let init = {
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Token ${token}`
        },
        method: 'POST',
        body: JSON.stringify(assetObj)
    }
    return await tryCatchFetch(url, init)
}

const tryCatchFetch = async (url, init = null) => {
    try {
        let response = await fetch(url, init)
        if(!response.ok){
            return null
        }else{
            if(response.status !== 204){
                return await response.json()
            }else{
                return 'deleted object';
            }
        }
    }catch(e) {
        console.error(e)
        return null
    }
}

export {
    createUser, 
    getToken,
    userGraphList,
    newGraph,
    userGraphDetail,
    userAssetDetail,
    saveAsset,
    userGraphDelete,
    userAssetDelete,
};