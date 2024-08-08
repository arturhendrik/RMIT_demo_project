import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import ApplicationTable from "./ApplicationTable";
import AppServiceTable from "./AppServiceTable";
import { ApplicationTableData, AppServiceTableData } from "../common/types";
import getRequest from "../services/getRequest";

const Home: React.FC = () => {
  const [tableData, setTableData] = useState<
    ApplicationTableData[] | AppServiceTableData[] | null
  >(null);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("application");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showingTableFor, setShowingTableFor] = useState<string>("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = async () => {
    if (selectedCategory === "application") {
      try {
        const result = await getRequest(
          "services/search-by-application",
          searchQuery
        );
        setTableData(result);
        setShowingTableFor("service");
      } catch (error) {
        setShowingTableFor("");
      }
    } else if (selectedCategory === "service") {
      try {
        const result = await getRequest(
          "applications/search-by-service",
          searchQuery
        );
        setTableData(result);
        setShowingTableFor("application");
      } catch (error) {
        setShowingTableFor("");
      }
    }
  };
  return (
    <Container>
      <h2>Applications and App Services</h2>
      <p>Search by Application name or App Service name. Or add something new.</p>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Form.Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            style={{ maxWidth: "150px", marginRight: "10px" }}
          >
            <option value="application">By Application</option>
            <option value="service">By Service</option>
          </Form.Select>
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ maxWidth: "300px" }}
          />
          <Button
            variant="secondary"
            onClick={handleSearchClick}
            style={{ marginLeft: "10px" }}
          >
            Search
          </Button>
        </div>
        <div className="d-flex" style={{ gap: "10px" }}>
          <Link to={"/new-app-service"}>
            <Button variant="primary">+ Service</Button>
          </Link>
          <Link to={"/new-application"}>
            <Button variant="primary">+ Application</Button>
          </Link>
        </div>
      </div>
      <div className="mt-4">
        {showingTableFor === "service" &&
        tableData !== null &&
        tableData.length > 0 ? (
          <AppServiceTable
            data={tableData as AppServiceTableData[]}
          ></AppServiceTable>
        ) : showingTableFor === "application" &&
          tableData !== null &&
          tableData.length > 0 ? (
          <ApplicationTable
            data={tableData as ApplicationTableData[]}
          ></ApplicationTable>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </Container>
  );
};

export default Home;
