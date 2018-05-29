import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import numberPickerReducer from './numberPickerReducer';

export default combineReducers({
  game: gameReducer,
  numberPicker: numberPickerReducer
});
