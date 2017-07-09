// @flow

import { EDITOR } from '../constants';

export const createObject = (currentObject: Object) => ({
    type: EDITOR.CREATE_OBJECT,
    payload: {
        currentObject,
    }
});

export const editObject = (currentObject: Object) => ({
    type: EDITOR.EDIT_OBJECT,
    payload: {
        currentObject,
    }
});

export const addObject = (currentObject: Object) => ({
    type: EDITOR.ADD_OBJECT,
    payload: {
        currentObject,
    }
});

export const exitAddingMode = () => ({
    type: EDITOR.EXIT_ADDING_MODE,
});

export const exitEditingMode = () => ({
    type: EDITOR.EXIT_EDITING_MODE,
});
