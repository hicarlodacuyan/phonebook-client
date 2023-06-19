import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    common: {
      "Content-Type": "multipart/form-data",
    },
  },
});

function setToken(newToken) {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
}

async function getPersons() {
  const response = await apiClient.get("/persons");
  return response.data;
}

async function createPerson(person) {
  const response = await apiClient.post("/persons", person);
  return response.data;
}

async function updatePerson(id, person) {
  const response = await apiClient.put(`/persons/${id}`, person);
  return response.data;
}

async function deletePerson(id) {
  const response = await apiClient.delete(`/persons/${id}`);
  return response.status;
}

export default {
  getPersons,
  createPerson,
  updatePerson,
  deletePerson,
  setToken,
};
