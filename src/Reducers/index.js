import { combineReducers } from "redux";
import { projectsReducer } from "./projectsReducer";
import { palettesReducer } from "./palettesReducer";
import { currentProjectReducer } from "./currentProjectReducer";
import { currentPaletteReducer } from "./currentPaletteReducer";

export const rootReducer = combineReducers({
	projects: projectsReducer,
	palettes: palettesReducer,
	currentProject: currentProjectReducer,
	currentPalette: currentPaletteReducer,
});