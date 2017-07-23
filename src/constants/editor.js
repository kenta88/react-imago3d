// @flow
import { createConstants } from 'redux-module-builder';

export default createConstants('editor')(
    'CREATE_OBJECT',
    'EDIT_OBJECT',
    'ADD_OBJECT',
    'UPDATE_UUID',
    'DELETE_OBJECT',
    'EXIT_ADDING_MODE',
    'EXIT_EDITING_MODE',
    'SET_OBJECT_WILL_SELECTED',
    'LEVEL_UP',
    'LEVEL_DOWN',
);
