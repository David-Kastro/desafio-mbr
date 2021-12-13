import React, { ChangeEvent, FormEvent, useState } from "react";
import "./index.css";
import { Container, Row, Col, Alert } from "react-bootstrap";
import sendAddress from "../../services/sendAddress";

import AddressForm from "./AddressForm";

interface FormData {
  email: string;
  name: string;
  phone: string;
  cep: string;
  address: string;
  number: string;
  additionalInfo: string;
  neighborhood: string;
  city: string;
  state: string;
}

function Address() {
  const [formData, updateFormData] = useState<FormData>({
    email: "",
    name: "",
    phone: "",
    cep: "",
    address: "",
    number: "",
    additionalInfo: "",
    neighborhood: "",
    city: "",
    state: "",
  });
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    msg: "",
  });

  const handleChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    updateFormData({
      ...formData,
      [target.name]: target.value.trim(),
    });
  };

  const toggleAlert = () => {
    setAlert({
      ...alert,
      show: !alert.show,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    setValidated(true);
    setIsLoading(true);
    event.preventDefault();
    event.stopPropagation();

    try {
      const form = event.currentTarget as HTMLFormElement;

      if (form.checkValidity() === false) {
        setIsLoading(false);
        return;
      }

      const result = await sendAddress(formData);

      if (result.data.status) {
        setAlert({
          show: true,
          type: "success",
          msg: "Endereço enviado com sucesso!",
        });

        setIsLoading(false);
        return;
      }

      setAlert({
        show: true,
        type: "danger",
        msg: "Algo deu errado ao enviar o endereço.. tente novamente!",
      });

      setIsLoading(false);
    } catch (e) {
      setAlert({
        show: true,
        type: "danger",
        msg: "Algo deu errado ao enviar o endereço.. tente novamente!",
      });

      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center main-container flex-column">
      <Row>
        {alert.show && (
          <Alert variant={alert.type} onClose={toggleAlert} dismissible>
            <p>{alert.msg}</p>
          </Alert>
        )}
      </Row>
      <Row>
        <Col>
          <AddressForm
            validated={validated}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            isLoading={isLoading}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Address;
