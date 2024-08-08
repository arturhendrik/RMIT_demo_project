import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { AppServiceData, SubType, Type } from "../common/types";
import getRequest from "../services/getRequest";
import { Link } from "react-router-dom";
import postRequest from "../services/postRequest";

const MAX_DESCRIPTION_LENGTH = 20000;

const AppServiceForm: React.FC = () => {
  const [formData, setFormData] = useState<AppServiceData>({
    application: {
      appCode: "",
    },
    serviceCode: "",
    name: "",
    type: Type.HTTP,
    subType: SubType.REST,
    description: "",
    lastModified: new Date(),
  });

  const [applicationCodes, setApplicationCodes] = useState<string[] | null>(
    null
  );
  const [error, setError] = useState<Error | null>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getRequest("applications/codes");
        setApplicationCodes(result);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <>
        <Alert variant="danger">Error: {error.message}</Alert>
        <Link to="/home">
          <Button variant="secondary">Back to home</Button>
        </Link>
      </>
    );
  }

  if (applicationCodes === null) {
    return <div>Loading...</div>;
  }

  if (applicationCodes && applicationCodes.length === 0) {
    return (
      <>
        <Alert variant="danger">
          No Applications found. Please create a new Application first.
        </Alert>
        <Link to="/home">
          <Button variant="secondary">Back to home</Button>
        </Link>
      </>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "appCode") {
      setFormData({
        ...formData,
        application: {
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!formData.application.appCode.trim())
      errors.push("App Code cannot be empty or whitespace.");
    if (!formData.serviceCode.trim())
      errors.push("Service Code cannot be empty or whitespace.");
    if (!formData.name.trim())
      errors.push("Name cannot be empty or whitespace.");

    setFormErrors(errors);

    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    try {
      const result = await postRequest(formData, "services");
      setSubmitMessage(`Success: ${result}`);
    } catch (error) {
      if (error instanceof Error) {
        setSubmitMessage(`Failed to submit: ${error.message}`);
      } else {
        setSubmitMessage("Failed to submit: An unknown error occurred.");
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container>
      <h2>Add new application service</h2>
      {formErrors.length > 0 && (
        <Alert variant="danger">
          <ul>
            {formErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}
      {submitMessage && (
        <Alert
          variant={submitMessage.startsWith("Success") ? "success" : "danger"}
        >
          {submitMessage}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formAppCode">
          <Form.Label>App Code</Form.Label>
          <Form.Control
            as="select"
            name="appCode"
            value={formData.application.appCode}
            onChange={handleChange}
            required
          >
            <option value={""}>-- Choose an App Code --</option>
            {applicationCodes.map((appCode) => (
              <option key={appCode} value={appCode}>
                {appCode}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formServiceCode">
          <Form.Label>Service Code</Form.Label>
          <Form.Control
            type="text"
            name="serviceCode"
            value={formData.serviceCode}
            onChange={handleChange}
            placeholder="Enter Service Code"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formType">
          <Form.Label>Type</Form.Label>
          <Form.Control
            as="select"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            {Object.values(Type).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formSubType">
          <Form.Label>SubType</Form.Label>
          <Form.Control
            as="select"
            name="subType"
            value={formData.subType}
            onChange={handleChange}
            required
          >
            {Object.values(SubType).map((subType) => (
              <option key={subType} value={subType}>
                {subType}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Description"
            rows={3}
            maxLength={20000}
          />
          <div className="d-flex justify-content-between mt-2">
            <small className="text-muted">
              {formData.description.length} / {MAX_DESCRIPTION_LENGTH}{" "}
              characters
            </small>
          </div>
        </Form.Group>
        <div className="d-flex justify-content-between">
          <Link to="/home">
            <Button variant="secondary">Back to home</Button>
          </Link>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AppServiceForm;
