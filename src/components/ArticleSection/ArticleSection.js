import React from 'react';
import {Card, Button} from 'react-bootstrap';

const ArticleSection = (props) => {
  const cardClick = () => {
    window.location.href = props.article['article_url']
  }

  return (
    <div>
      <Card style={{ width: '25rem' }}>
            <Card.Body>
            <Card.Img variant="top" src={props.article['image_url']} />
            <Card.Title>{props.article['title']}</Card.Title>
                {props.article['published_utc'] && <div>Date: {props.article['published_utc']}</div>}
                {props.article['author'] && <div>Author ${props.article['author']}</div>}
                {props.article['description'] &&
                  props.article['description'].length > 300 
                  ? <div>{props.article['description'].substr(0, 300)}...</div>
                  : <div>{props.article['description']}</div>
                }
            <Button variant="primary" onClick={cardClick}>View Article</Button>
            </Card.Body>
        </Card>
    </div>
  )
}

export default ArticleSection;
