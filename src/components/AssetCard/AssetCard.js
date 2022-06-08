import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import './AssetCard.css';

const AssetCard = (props) => {
    let navigate = useNavigate();
    let { graphID } = useParams();

    const cardClick = () => {
        navigate(`/graphs/${graphID}/${props.asset.id}`);
    }

    const deleteClick = async () => {
        let graph = graphID;
        let assetID = props.asset.id;
        let token = localStorage.getItem('user');
        return props.handleDelete(token, graph, assetID)
    }
    
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                <Card.Title>{props.asset['ticker'].toUpperCase()}</Card.Title>
                    <div>{props.asset['company_name']}</div>
                    <div>Price Per Share: ${props.asset['price_per_share']}</div>
                    <div>Shares Owned: {props.asset['shares']}</div>
                    <div>Dividend Yield: {(Number(props.asset['div_yield']) * 100).toString()}%</div>
                <Button variant="primary" onClick={cardClick}>View Asset</Button>
                <Button variant="danger" onClick={deleteClick}>Delete</Button>
                </Card.Body>
            </Card>
        </div>
    )
};

export default AssetCard;
