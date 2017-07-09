// @flow
import { createConstants } from 'redux-module-builder';

export default createConstants('editor')(
    'CREATE_OBJECT',
    'EDIT_OBJECT',
    'ADD_OBJECT',
    'EXIT_ADDING_MODE',
    'EXIT_EDITING_MODE',
);
