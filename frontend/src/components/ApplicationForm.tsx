import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { ApplicationData } from "../common/types";
import { Link } from "react-router-dom";
import postRequest from "../services/postRequest";

const MAX_DESCRIPTION_LENGTH = 20000;

const ApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState<ApplicationData>({
    appCode: "",
    name: "",
    appGroup: "",
    appType: "",
    description: "",
    appCost: null,
    lastModified: new Date(),
  });

  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!formData.appCode.trim())
      errors.push("App Code cannot be empty or whitespace.");
    if (!formData.name.trim())
      errors.push("Name cannot be empty or whitespace.");
    if (!formData.appGroup.trim())
      errors.push("App Group cannot be empty or whitespace.");
    if (!formData.appType.trim())
      errors.push("App Type cannot be empty or whitespace.");
    if (formData.appCost !== null && formData.appCost < 0)
      errors.push("App Cost must be a positive number or zero.");
    if (formData.appCost === null) errors.push("App Cost cannot be empty");

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
      const result = await postRequest(formData, "applications");
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
      <h2>Add new application</h2>
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
            type="text"
            name="appCode"
            value={formData.appCode}
            onChange={handleChange}
            placeholder="Enter App Code"
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
        <Form.Group className="mb-3" controlId="formAppGroup">
          <Form.Label>App Group</Form.Label>
          <Form.Control
            type="text"
            name="appGroup"
            value={formData.appGroup}
            onChange={handleChange}
            placeholder="Enter App Group"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAppType">
          <Form.Label>App Type</Form.Label>
          <Form.Control
            type="text"
            name="appType"
            value={formData.appType}
            onChange={handleChange}
            placeholder="Enter App Type"
            required
          />
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
        <Form.Group className="mb-3" controlId="formAppCost">
          <Form.Label>App Cost</Form.Label>
          <Form.Control
            type="number"
            min={0}
            step={0.1}
            name="appCost"
            value={formData.appCost !== null ? formData.appCost : ""}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "-" || e.key === "e") {
                e.preventDefault();
              }
            }}
            placeholder="Enter App Cost"
            required
          />
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

export default ApplicationForm;
