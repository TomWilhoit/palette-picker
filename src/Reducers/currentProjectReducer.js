export const currentProjectReducer = (state = 0, action) => {
	switch(action.type){
		case 'ADD_CURRENT_PROJECT':
			return action.project
		default:
		return state
	}
}