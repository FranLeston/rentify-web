import http from './base-http-service';

const createContract = (contract) => {
  const data = new FormData();
  Object.keys(contract).forEach(key => {
    data.append(key, contract[key]);
  })
  console.log(data)
  console.log(data.get('attachment'))
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  } 
  return http.post('/contract', data, config)
  .then(response => response.data);
}
  const deleteContract = (id) => http.delete(`/contract/${id}`)
  .then(response => response.data);

  const list = () => http.get('/contract')
  .then(response => response.data);


export default {
  createContract,
  deleteContract,
  list

}