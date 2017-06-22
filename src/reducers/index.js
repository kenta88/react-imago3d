import { combineReducers } from 'redux-immutable';

import editorReducer from './editor';

export default combineReducers({
    editor: editorReducer,
});

