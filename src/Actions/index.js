export const addProjects = (projects) => ({
  type: 'ADD_PROJECTS',
  projects
})

export const addProject = (project) => ({
  type: 'ADD_PROJECT',
  project
})

export const deleteProject = (project) => ({
  type: 'DELETE_PROJECT',
  project
})

export const addPalettes = (palettes) => ({
  type: 'ADD_PALETTES',
  palettes
})

export const addPalette = (palette) => ({
  type: 'ADD_PALETTE',
  palette
})

export const deletePalette = (palette) => ({
  type: 'DELETE_PALETTE',
  palette
})

export const addCurrentProject = (project) => ({
  type: 'ADD_CURRENT_PROJECT',
  project
})

export const addCurrentPalette = (palette) => ({
  type: 'ADD_CURRENT_PALETTE',
  palette
})