const ALPHAVANTAGE_TOKEN = 'VWMJO5GDS82YC2BP';

const getStockInfo = async (ticker) => {
    let STOCK_PRICE_URL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${ALPHAVANTAGE_TOKEN}`
    let init = {
        headers: {
            'User-Agent': 'request',
            'Content-Type': 'application/json'
        },
        method: 'GET',
    }
    return await tryCatchFetch(STOCK_PRICE_URL, init);
}

const getStockOverview = async (ticker) => {
    let STOCK_OVERVIEW_URL = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${ALPHAVANTAGE_TOKEN}`
    let init = {
        headers: {
            'User-Agent': 'request',
            'Content-Type': 'application/json'
        },
        method: 'GET',
    }
    return await tryCatchFetch(STOCK_OVERVIEW_URL, init)
}

const getAssetNews = async (ticker) => {
    let NEWS_URL = `https://api.polygon.io/v2/reference/news?ticker=${ticker.toUpperCase()}&limit=5&apiKey=cmacGgKAkh0vwpQJQe_KDI2i1cMwppyd`
    let init = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET',
    }
    return await tryCatchFetch(NEWS_URL, init)
}

const tryCatchFetch = async (url, init = null) => {
    try {
        let response = await fetch(url, init)
        if(!response.ok){
            return null
        }else{
            return await response.json()
        }
    }catch(e) {
        console.error(e)
        return null
    }
}

export {
    getStockInfo,
    getStockOverview,
    getAssetNews
};