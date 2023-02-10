import React, { useState, useEffect, useContext } from 'react';
import Graph from '../../components/Graph/Graph';
import UserContext from '../../contexts/UserContext';
import { userGraphDetail, userAssetDelete} from '../../api/internal_api';
import { useNavigate, useParams } from 'react-router-dom';
import AssetCard from '../../components/AssetCard/AssetCard';
import { Button, Spinner } from 'react-bootstrap';
import './GraphDetailPage.css';


const GraphDetailPage = (props) => {
  const [deleted, setDeleted] = useState();
  const [graph, setGraph] = useState();
  const [avgDiv, setAvgDiv] = useState();
  const [displayLoading, setDisplayLoading] = useState(false);
  const [totalEquity, setTotalEquity] = useState();
  const initializeState = () => !!JSON.parse('"' + localStorage.getItem('user') + '"');
  const [userToken, setUserToken] = useState(initializeState);
  const user = useContext(UserContext);
  const navigate = useNavigate();
  let { graphID } = useParams();
  
  useEffect(() => {
    const getGraph = async (token, graphID) => {
      setDisplayLoading(true);
      let resp = null;
      resp = await userGraphDetail(token, graphID);
      if(resp){
        setDisplayLoading(false);
        return resp;
      }else{
        setDisplayLoading(false);
        console.log('api call failed');
      }
    }
    
    const setGraphState = async() =>{
      if(!userToken){
          navigate('/login')
      }else{
          let userGraph = await getGraph(localStorage.getItem('user'), graphID)
          setGraph(userGraph)
      }
    }
    
    setGraphState()
    // eslint-disable-next-line
  }, [user, deleted, userToken]);

  const callDeleteAsset = async (token, graph, asset) => {
    let resp = await userAssetDelete(token, graph, asset)
    if(resp === 'deleted object'){
        setDeleted(true);
    }else{
        alert('error deleting asset')
    }
  };
 
  const generateAssets = () => {
    return graph.assets.map((asset, index) => {
      return <AssetCard className={'card'} asset={asset} handleDelete={callDeleteAsset} key={index} />
    });
  }
  
  const newAssetClick = () => {
    navigate(`/graphs/${graphID}/new_asset`)
  }

  const getDivAndEquity = (div, equity) => {
    setAvgDiv(div)
    setTotalEquity(equity)
  }

  return (
    <div className={'graphContainer'}>
      {graph && <Graph 
        assetProps={graph.assets} 
        reinvestmentPeriod={graph.reinvestment_period} 
        reinvestmentAmount={graph.reinvestment_amount} 
        startYear={graph.date_created.substr(0,4)}
        grabDivAndEquity={getDivAndEquity} 
        className={'pageGraph'}/> 
      }
      {graph &&
        <div>
          <h1>{graph.graph_name}</h1>
          <p>created: {graph.date_created.substr(0,10)}</p>
          {
            (totalEquity && avgDiv) ?
            <p>
              Showing invested initial amount of ${totalEquity.toFixed(2)}, 
              with an average portfolio dividend yield of {(avgDiv/graph.assets.length) * 100}%,
              with an annual manual reinvestment amount of ${graph.reinvestment_amount},
              over 65 years.
            </p> :
            <div></div>
          }
          <p>**Adding assets with 0% div yield may result in incorrect data**</p>
          <Button onClick={newAssetClick}>Add Asset</Button>
        <div className={'assetList'}>
          {
            displayLoading 
          ?   <Spinner 
                animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            : generateAssets()
          }
        </div>
        </div>
      }
    </div>
  )
};

export default GraphDetailPage;
