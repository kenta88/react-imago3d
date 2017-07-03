// @flow

import { EDITOR } from '../constants';

export const createObject = (objectType: string, currentObject: Object) => ({
    type: EDITOR.CREATE_OBJECT,
    payload: {
        objectType,
        currentObject,
    }
});

export const editObject = (objectId: string) => ({
    type: EDITOR.EDIT_OBJECT,
    payload: {
        objectId
    }
});

export const exitEditMode = () => ({
    type: EDITOR.EXIT_EDIT_MODE,
});

export const exitAddingMode = () => ({
    type: EDITOR.EXIT_ADDING_MODE,
});
