import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';

function CustomCard(props) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.imageSrc} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.content}</Card.Text>
        <Button variant="secondary" onClick={props.onLevelUpClick}>Level Up</Button>
      </Card.Body>
    </Card>
  );
}

export default CustomCard;
