import http from "./base-http-service";

const createMaintenance = maintenance => {
  const data = new FormData();
  Object.keys(maintenance).forEach(key => {
    data.append(key, maintenance[key]);
  });
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  return http.post("/maintenance", data, config).then(response => response.data);
};
const deleteMaintenance = id =>
  http.delete(`/maintenance/${id}`).then(response => response.data);

const list = () => http.get("/maintenance").then(response => response.data);

const getMaintenance = id =>
  http.get(`/maintenance/${id}`).then(response => response.data);

const updateMaintenance = (id, maintenance) => {
  const data = new FormData();

  Object.keys(maintenance).forEach(key => {
    data.append(key, maintenance[key]);
  });

  return http.put(`/maintenance/${id}`, data).then(response => response.data);
};

const listOwn = () => http.get("/maintenance/own").then(response => response.data);

const getTenantMaintenance = () => http.get("/maintenance/rent").then(response => response.data);


export default {
  createMaintenance,
  deleteMaintenance,
  list,
  getMaintenance,
  updateMaintenance,
  listOwn,
  getTenantMaintenance
};
