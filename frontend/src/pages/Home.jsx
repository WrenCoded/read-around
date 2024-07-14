import { Container, Row, Col, Button } from "react-bootstrap";

export default function Home() {
  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Row>
        <Col>
          <h1 className="text-center">Welcome to Our Website</h1>
          <div className="container d-flex justify-content-center mt-4 space-evenly
          ">
            <Button variant="primary" href="/signup" className="mr-5">
              Sign Up
            </Button>
            <Button variant="secondary" href="/login">
              Login
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
