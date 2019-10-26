export const apiCall = async (endpoint, options) => {
  const url = process.env.REACT_APP_BACKEND_URL + `api/v1/${endpoint}`;
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`${response.json()}`);
  if (options.method === "DELETE") return;
  return response.json();
};

export const createOptions = (type, body) => ({
  method: type,
  body: JSON.stringify(body),
  headers: {
    "Content-Type": "application/json"
  }
});