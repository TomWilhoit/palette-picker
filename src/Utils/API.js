export const fetchData = async url => {
  try {
    const response = await fetch(url)
    if (response.ok){
      return await response.json()
    } 
  } catch(error) {
      return error
  }
};

export const updatePalette = async (palette, id) => {
  const url = `http://localhost:3000/api/v1/palettes/${id}`
  try {
    const response = await fetch (url, {
      method: 'PUT',
      body: JSON.stringify(palette),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const updatedPalette = await response.json()
    return updatedPalette
  } catch(error) {
    return error.message
  }
}

export const addPalette = async (palette, projectId) => {
  const url = `http://localhost:3000/api/v1/projects/${projectId}/palettes`
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(palette),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      const addedPalette = await response.json()
      return addedPalette
  } catch (error) {
    return error.message
  }
}