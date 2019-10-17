export const apiCall = async (endpoint, options) => {
  const url = process.env.REACT_APP_BACKEND_URL + `api/v1/${endpoint}`;
  const response = await fetch(url, options);
  if(!response.ok) { throw new Error(`Error: ${response.json()}`)};
  return response.json()
  // switch(options.method) {
  //   case('DELETE'):
  //     return response;

  //   case('PATCH'):
  //     return response.json();
  //   default:
  //     const data = await response.json();
  //     return data;
  // }
}

export const fetchData = async (url, body) => {
  try {
    const response = await fetch(url, body);
    const data = await response.json();
    if(!response.ok) { throw new Error(`Fetch Unsuccessful ${data}`)};
    return data;
  } catch (error) {
    return error.message;
  }
};

export const updatePalette = async (palette, id) => {
  const url = process.env.REACT_APP_BACKEND_URL + `api/v1/palettes/${id}`;
  try {
    const response = await fetch (url, {
      method: 'PUT',
      body: JSON.stringify(palette),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const updatedPalette = await response.json();
    return updatedPalette;
  } catch(error) {
    return error.message;
  }
}

export const addNewPalette = async (palette, projectId) => {
  const url = process.env.REACT_APP_BACKEND_URL + `api/v1/projects/${projectId}/palettes`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(palette),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const addedPalette = await response.json();
    return addedPalette;
  } catch (error) {
    return error.message;
  }
}

export const deletePalette = async (id) => {
  const url =  process.env.REACT_APP_BACKEND_URL + `api/v1/palettes/${id}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({id: id}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const message = await response.json();
    return message;
  } catch(error) {
    return error.message;
  }
}

export const deleteProject = async (id) => {
  const url = process.env.REACT_APP_BACKEND_URL + `api/v1/projects/${id}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({id: id}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const message = await response.json();
    return message;
  } catch(error) {
    return error.message;
  }
}