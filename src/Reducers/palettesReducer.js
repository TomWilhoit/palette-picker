export const palettesReducer = (state = [], action) => {
	switch (action.type) {
		case "ADD_PALETTES":
			return action.palettes;
		case "ADD_PALETTE":
			return [...state, action.palette];
		case "CHANGE_PALETTE":
		return state.map(palette => {
			if (palette.id === action.palette.id) {
				palette = action.palette;
			}
			return palette;
		});
		case "REMOVE_PALETTE":
			return state.filter(palette => palette.id !== action.id);
		case "REMOVE_PROJECT_PALETTES":
			return state.filter(palette => palette.project_id !== action.id);	
		default:
			return state;
	}
}