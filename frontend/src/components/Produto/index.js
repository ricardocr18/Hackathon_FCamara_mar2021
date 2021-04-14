import React from "react";

import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

function Produto({ img, nome, valor }) {
  return (
    <Card id="styleCard">
      <Card.Img variant="top" className="imgProduto" src={img} />
      <Card.Body>
        <Card.Title className="tituloProduto">{nome}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem className="infoProdutos">Valor: {valor}</ListGroupItem>
      </ListGroup>
      <Card.Body></Card.Body>
    </Card>
  );
}

export default Produto;
