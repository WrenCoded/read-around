import { Card } from "react-bootstrap";

export default function BookCard({ book }){
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
};
