import React, { ChangeEvent, FormEvent } from "react";
import "./index.css";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

interface AddressFormProps {
  validated: boolean;
  handleSubmit: (e: FormEvent) => void;
  handleChange: (e: ChangeEvent) => void;
  isLoading: boolean;
}

function AddressForm({
  validated,
  handleSubmit,
  handleChange,
  isLoading,
}: AddressFormProps) {
  return (
    <Card className="mt-3 mb-3">
      <Card.Body>
        <Card.Title>Envie seu endereço para receber o brinde!</Card.Title>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-md-3">
            <Form.Group
              className="mb-2 mb-md-0"
              as={Col}
              md="12"
              controlId="validationCustom01"
            >
              <Form.Label>Nome completo</Form.Label>
              <Form.Control
                name="name"
                required
                type="text"
                onChange={handleChange}
                disabled={isLoading}
                placeholder="ex: João Paulo da Silva"
              />
              <Form.Control.Feedback type="invalid">
                Informe um nome.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-md-3">
            <Form.Group
              className="mb-2 mb-md-0"
              as={Col}
              md="6"
              controlId="validationCustom01"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                required
                type="email"
                onChange={handleChange}
                disabled={isLoading}
                placeholder="example@gmail.com"
              />
              <Form.Control.Feedback type="invalid">
                Informe um email válido.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-2 mb-md-0"
              as={Col}
              md="6"
              controlId="validationCustom01"
            >
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                name="phone"
                required
                type="text"
                pattern="^(\+\d{2})?\s?(\(\d{2}\)|\d{2})\s?\d?\d{4}-?\d{4}$"
                onChange={handleChange}
                disabled={isLoading}
                placeholder="(99) 99999-9999"
              />
              <Form.Control.Feedback type="invalid">
                Informe um número válido.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-md-3">
            <Form.Group
              className="mb-2 mb-md-0"
              as={Col}
              md="4"
              controlId="validationCustom05"
            >
              <Form.Label>CEP</Form.Label>
              <Form.Control
                name="cep"
                type="text"
                onChange={handleChange}
                disabled={isLoading}
                placeholder="99999-999"
                required
                pattern="^(\d{5}-\d{3}|\d{8})$"
              />
              <Form.Control.Feedback type="invalid">
                Informe um CEP Válido
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-2 mb-md-0"
              as={Col}
              md="8"
              controlId="validationCustom03"
            >
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                name="address"
                type="text"
                onChange={handleChange}
                disabled={isLoading}
                placeholder="ex: Quadra 999 Rua 9.."
                required
              />
              <Form.Control.Feedback type="invalid">
                Informe um endereço.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-md-3">
            <Form.Group
              className="mb-2 mb-md-0"
              as={Col}
              md="4"
              controlId="validationCustom04"
            >
              <Form.Label>Número</Form.Label>
              <Form.Control
                name="number"
                type="text"
                onChange={handleChange}
                disabled={isLoading}
                placeholder="ex: Casa 9"
                required
              />
              <Form.Control.Feedback type="invalid">
                Informe um número.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-2 mb-md-0"
              as={Col}
              md="8"
              controlId="validationCustom03"
            >
              <Form.Label>Complemento/Referência</Form.Label>
              <Form.Control
                name="additionalInfo"
                type="text"
                onChange={handleChange}
                disabled={isLoading}
                placeholder="Opcional"
              />
            </Form.Group>
          </Row>
          <Row className="mb-md-3">
            <Form.Group
              className="mb-2 mb-md-0"
              as={Col}
              md="5"
              controlId="validationCustom05"
            >
              <Form.Label>Bairro</Form.Label>
              <Form.Control
                name="neighborhood"
                type="text"
                onChange={handleChange}
                disabled={isLoading}
                placeholder="ex: Águas Claras"
                required
              />
              <Form.Control.Feedback type="invalid">
                Informe um Bairro
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-2 mb-md-0"
              as={Col}
              md="5"
              controlId="validationCustom03"
            >
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                name="city"
                type="text"
                onChange={handleChange}
                disabled={isLoading}
                placeholder="ex: Brasília"
                required
              />
              <Form.Control.Feedback type="invalid">
                Informe uma cidade.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-2 mb-md-0"
              as={Col}
              md="2"
              controlId="validationCustom04"
            >
              <Form.Label>Estado</Form.Label>
              <Form.Control
                name="state"
                type="text"
                onChange={handleChange}
                disabled={isLoading}
                placeholder="ex: DF"
                required
              />
              <Form.Control.Feedback type="invalid">
                Informe um Estado.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Check
              disabled={isLoading}
              required
              label="Aceito os termos e condições"
              feedback="Você deve concordar com os termos antes de enviar"
              feedbackType="invalid"
            />
          </Form.Group>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Enviando" : "Enviar"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddressForm;
