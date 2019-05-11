export const currentPaletteReducer = (state = 0, action) => {
	switch(action.type){
		case 'ADD_CURRENT_PALETTE':
			return action.palette
		default:
		return state
	}
}