
import { Card, Button } from "react-bootstrap";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";



export default function BookCard({ book, handleDelete, userToken, handleUpdate }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
        <div className="d-flex justify-content-end gap-2">
          <Button onClick={() => handleUpdate(book)}> {/* Use the passed prop */}
            <FaPencilAlt size={20} />
          </Button>
          <Button onClick={() => handleDelete(userToken, book.id)}>
            <FaRegTrashAlt size={20} />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
