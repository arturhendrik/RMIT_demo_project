import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import AppServiceForm from "./components/AppServiceForm";
import { Container } from "react-bootstrap";
import React from "react";
import ApplicationForm from "./components/ApplicationForm";
import Home from "./components/Home";

const App: React.FC = () => {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to={"/home"} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/new-app-service" element={<AppServiceForm />} />
          <Route path="/new-application" element={<ApplicationForm />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
