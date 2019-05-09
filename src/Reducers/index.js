import { combineReducers } from 'redux';
import { projectsReducer } from './projectsReducers'
import { palettesReducer } from './palettesReducer';

export const rootReducer = combineReducers({
	projects: projectsReducer,
	palettes: palettesReducer
})