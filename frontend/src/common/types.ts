export enum Type {
  HTTP = "HTTP",
  SAML = "SAML",
  SSH = "SSH",
  JDBC = "JDBC",
  ODBC = "ODBC",
}

export enum SubType {
  REST = "REST",
  SOAP = "SOAP",
}

export interface AppServiceData {
  application: {
    appCode: string;
  };
  serviceCode: string;
  name: string;
  type: Type;
  subType: SubType;
  description: string;
  lastModified: Date;
}

export interface ApplicationData {
  appCode: string;
  name: string;
  appGroup: string;
  appType: string;
  description: string;
  appCost: number | null;
  lastModified: Date;
}

export interface ApplicationTableData {
  appCode: string;
  name: string;
  appGroup: string;
  appType: string;
  description: string;
  appCost: number;
  lastModified: string;
  serviceNames: string[];
}

export interface AppServiceTableData {
  applicationName: string;
  appServiceIndexes: {
    serviceCode: string;
    name: string;
    type: string;
    subType: string;
    description: string;
    lastModified: string;
    appCode: string;
  }[];
}
