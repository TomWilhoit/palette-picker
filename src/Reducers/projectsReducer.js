export const projectsReducer = (state = [], action) => {
	switch (action.type) {
		case "ADD_PROJECTS":
			return action.projects;
		case "ADD_PROJECT":
			return [...state, action.project];
		case "REMOVE_PROJECT":
      	return state.filter(project => project.id !== action.id);
		default:
			return state;
	}
}