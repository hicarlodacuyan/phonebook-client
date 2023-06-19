import axios from "axios";

const baseUrl = "http://localhost:8080/api/users";

export default async function register(credentials) {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
}
