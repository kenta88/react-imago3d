// @flow
import { createConstants } from 'redux-module-builder';

export default createConstants('editor')(
    'CREATE_OBJECT',
    'ADD_OBJECT',
    'EXIT_ADDING_MODE',
);
