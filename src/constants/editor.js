// @flow
import { createConstants } from 'redux-module-builder';

export default createConstants('editor')(
    'CREATE_OBJECT',
    'EDIT_OBJECT',
    'EXIT_EDIT_MODE',
    'EXIT_ADDING_MODE',
);
