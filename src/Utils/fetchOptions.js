export const fetchOptions = (type, body) => ({
  method: type,
  body: JSON.stringify(body),
  headers:{
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'localhost:3000/api/v1/projects'
  }
})