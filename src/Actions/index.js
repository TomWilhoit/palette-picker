export const addProjects = projects => ({
  type: "ADD_PROJECTS",
  projects
});

export const addProject = project => ({
  type: "ADD_PROJECT",
  project
});

export const removeProject = id => ({
  type: "REMOVE_PROJECT",
  id
});

export const addPalettes = palettes => ({
  type: "ADD_PALETTES",
  palettes
});

export const addPalette = palette => ({
  type: "ADD_PALETTE",
  palette
});

export const changePalette = palette => ({
  type: "CHANGE_PALETTE",
  palette
})

export const removeProjectPalettes = id => ({
  type: "REMOVE_PROJECT_PALETTES",
  id
});

export const removePalette = id => ({
  type: "REMOVE_PALETTE",
  id
});

export const updateCurrentProject = project => ({
  type: "UPDATE_CURRENT_PROJECT",
  project
});

export const updateCurrentPalette = palette => ({
  type: "UPDATE_CURRENT_PALETTE",
  palette
});