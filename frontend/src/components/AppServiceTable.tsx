import React from "react";
import { Table, Container } from "react-bootstrap";
import { AppServiceTableData } from "../common/types";

interface AppServiceTableProps {
  data: AppServiceTableData[];
}

const AppServiceTable: React.FC<AppServiceTableProps> = ({ data }) => {
  return (
    <Container>
      {data.map((item, index) => {
        const headers = [
          "Service Code",
          "Name",
          "Type",
          "Sub Type",
          "Description",
          "Last Modified",
          "App Code",
        ];

        return (
          <div key={index} className="mb-4">
            <h5>Found by the following application:</h5>
            <ul>
              <li key={item.applicationName}>{item.applicationName}</li>
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
                {item.appServiceIndexes.map((service) => (
                  <tr>
                    <td>{service.serviceCode}</td>
                    <td>{service.name}</td>
                    <td>{service.type}</td>
                    <td>{service.subType}</td>
                    <td>{service.description}</td>
                    <td>{service.lastModified}</td>
                    <td>{service.appCode}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        );
      })}
    </Container>
  );
};

export default AppServiceTable;
