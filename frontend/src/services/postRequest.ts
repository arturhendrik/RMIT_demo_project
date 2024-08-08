import { ApplicationData, AppServiceData } from "../common/types";
import backendEndpoint from "../config";

const postRequest = async (
  data: AppServiceData | ApplicationData,
  requestEndPoint: string
) => {
  try {
    let url = `${backendEndpoint}/${requestEndPoint}`;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, requestOptions);

    const responseBody = await response.text();

    if (!response.ok) {
      throw new Error(responseBody || response.statusText);
    }
    return responseBody;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default postRequest;
