import React from "react";
import { Table, Container } from "react-bootstrap";
import { ApplicationTableData } from "../common/types";

interface ApplicationTableProps {
  data: ApplicationTableData[];
}

const ApplicationTable: React.FC<ApplicationTableProps> = ({ data }) => {
  return (
    <Container>
      {data.map((item, index) => {
        const headers = [
          "App Code",
          "Name",
          "App Group",
          "App Type",
          "Description",
          "App Cost",
          "Last Modified",
        ];

        const values = [
          item.appCode,
          item.name,
          item.appGroup,
          item.appType,
          item.description,
          item.appCost,
          item.lastModified,
        ];

        return (
          <div key={index} className="mb-4">
            <h5>
              Application found by service(s):
            </h5>
            <ul>
              {item.serviceNames.map((serviceName, idx) => (
                <li key={idx}>{serviceName}</li>
              ))}
            </ul>

            <Table striped bordered hover>
              <thead>
                <tr>
                  {headers.map((header, idx) => (
                    <th key={idx}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {values.map((value, idx) => (
                    <td key={idx}>{value}</td>
                  ))}
                </tr>
              </tbody>
            </Table>
          </div>
        );
      })}
    </Container>
  );
};

export default ApplicationTable;
