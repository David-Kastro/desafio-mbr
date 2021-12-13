import React from "react";
import "./index.css";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

function Login() {
  return (
    <Container className="d-flex justify-content-center align-items-center main-container">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>
                Faça login para acessar a lista de endereços
              </Card.Title>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Endereço de Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
