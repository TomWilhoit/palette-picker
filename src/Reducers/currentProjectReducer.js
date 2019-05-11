export const currentProjectReducer = (state = null, action) => {
	switch(action.type){
		case 'ADD_CURRENT_PROJECT':
			return action.project
		default:
		return state
	}
}