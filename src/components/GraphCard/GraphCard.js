import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './GraphCard.css';

const GraphCard = (props) => {
  let navigate = useNavigate();
  
  const cardClick = () => {
    navigate(`/graphs/${props.graphInfo['id']}`);
  }

  const deleteClick = async () => {
    let id = props.graphInfo['id'];
    let token = localStorage.getItem('user');
    return props.handleDelete(token, id)
  }

  return (
    <div className="GraphCard">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{props.graphInfo['graph_name']}</Card.Title>
          <Card.Text>
            Date Created: {props.graphInfo['date_created'].substr(0,10)}
          </Card.Text>
          <Button variant="primary" onClick={cardClick}>View Graph</Button>
          <Button variant="danger" onClick={deleteClick}>Delete</Button>
        </Card.Body>
      </Card>
    </div>
  )
};

export default GraphCard;
