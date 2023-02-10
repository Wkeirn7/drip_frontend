import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { userAssetDetail } from '../../api/internal_api';
import ArticleList from '../../components/ArticleList/ArticleList';
import './AssetDetailPage.css';

const AssetDetailPage = () => {
    const [asset, setAsset] = useState();
    const navigate = useNavigate();
    let { graphID, assetID } = useParams();
    const initializeState = () => !!JSON.parse('"' + localStorage.getItem('user') + '"');
    const [token, setToken] = useState(initializeState);
    
    useEffect(() => {
        const getAsset = async (token, graphID, assetID) => {
            let resp = null;
            resp = await userAssetDetail(token, graphID, assetID);
            if(resp){
                return resp;
            }else{
                console.log('api call failed')
            }
        }

        const setAssetState = async() => {
            if(!token){
                navigate('/login')
            }else{
                let userAsset = await getAsset(localStorage.getItem('user'), graphID, assetID)
                setAsset(userAsset);
            }   
        }
        setAssetState();
    }, []);

    return (
        <div>
            {asset && 
                <div>
                    <div className={'assetArea'}>
                        <h1>{asset.company_name}</h1>
                        <p>Price per share: {asset.price_per_share}</p>
                        <p>Shares Owned: {asset.shares}</p>
                        <h1>Company Description:</h1>
                        <p>{asset.company_overview}</p>
                    </div>
                    <h2>Relevant Articles: </h2>
                    <ArticleList ticker={asset.ticker}/>
                </div>
            }
        </div>
    )
}

export default AssetDetailPage;