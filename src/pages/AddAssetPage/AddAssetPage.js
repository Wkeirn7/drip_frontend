import React, { useContext, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getStockInfo, getStockOverview } from '../../api/third_party_api';
import UserContext from '../../contexts/UserContext';
import { saveAsset } from '../../api/internal_api';
import './AddAssetPage.css';

const AddAssetPage = (props) => {
    let navigate = useNavigate()
    let user = useContext(UserContext);
    let { graphID } = useParams()

    useEffect(() => {
        if(!user.isLoggedIn){
            navigate('/login')
        }
    });

    const handleSubmission = async (e) => {
        e.preventDefault()
        let ticker = e.target.elements[0].value;
        let shares = e.target.elements[1].value;
        let priceInfo = await callStockPriceInfo(ticker);
        let overviewInfo = await callGetOverview(ticker);
        let assetObj = {
            "ticker": "",
            "company_name": "",
            "price_per_share": "",
            "div_yield": "",
            "shares": "",
            "company_overview": ""
        }

        assetObj['ticker'] = ticker;
        assetObj['company_name'] = overviewInfo['Name']
        assetObj['price_per_share'] = parseFloat(priceInfo['05. price']).toFixed(2).toString()
        assetObj['div_yield'] = parseFloat(overviewInfo['DividendYield']).toFixed(2).toString()
        assetObj['shares'] = shares;
        assetObj['company_overview'] = overviewInfo['Description']

        callSaveAsset(assetObj);
        return navigate(`/graphs/${graphID}`)
    }

    const callStockPriceInfo = async (ticker) => {
        let stockResp = null;
        stockResp = await getStockInfo(ticker)
        if(stockResp){
            return stockResp['Global Quote'];
        }else{
            alert('invalid asset entry');
        }
    }

    const callGetOverview = async (ticker) => {
        let overViewResp = null;
        overViewResp = await getStockOverview(ticker)
        if(overViewResp){
            return overViewResp;
        }else{
            alert('invalid asset entry');
        }
    }

    const callSaveAsset = async (assetObj) => {
        if(Number(assetObj['shares']) <= 0){
            alert('invalid asset entry')
        }else{
            let saveResp = null;
            saveResp = await saveAsset(graphID, assetObj, localStorage.getItem('user'));
            if(saveResp){
                return saveResp;
            }else{
                alert('error saving asset');
            }
        }
    }
    
    return (
        <div className='AssetFormArea'>
            <Form onSubmit={handleSubmission}>
                <Form.Group className="mb-3" controlId="formTicker">
                    <Form.Label>Ticker Symbol</Form.Label>
                    <Form.Control placeholder="Enter Ticker Symbol" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formShares">
                    <Form.Label>Shares Owned</Form.Label>
                    <Form.Control placeholder="Enter Shares Owned" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
  )
}

export default AddAssetPage;
