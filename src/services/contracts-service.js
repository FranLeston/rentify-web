import http from "./base-http-service";

const createContract = contract => {
  const data = new FormData();
  Object.keys(contract).forEach(key => {
    data.append(key, contract[key]);
  });
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  return http.post("/contract", data, config).then(response => response.data);
};
const deleteContract = id =>
  http.delete(`/contract/${id}`).then(response => response.data);

const list = () => http.get("/contract").then(response => response.data);

const getContract = id =>
  http.get(`/contract/${id}`).then(response => response.data);

const updateContract = (id, contract) => {
  const data = new FormData();

  Object.keys(contract).forEach(key => {
    data.append(key, contract[key]);
  });

  return http.put(`/contract/${id}`, data).then(response => response.data);
};

export default {
  createContract,
  deleteContract,
  list,
  getContract,
  updateContract
};
