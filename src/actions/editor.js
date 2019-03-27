// @flow

import { EDITOR } from '../constants';

export const createObject = (currentObject: Object) => ({
  type: EDITOR.CREATE_OBJECT,
  payload: {
    currentObject,
  },
});

export const editObject = (currentObject: Object) => ({
  type: EDITOR.EDIT_OBJECT,
  payload: {
    currentObject,
  },
});

export const addObject = (currentObject: Object) => ({
  type: EDITOR.ADD_OBJECT,
  payload: {
    currentObject,
  },
});

export const setObjectWillSelected = (objectUUID: String) => ({
  type: EDITOR.SET_OBJECT_WILL_SELECTED,
  payload: {
    objectUUID,
  },
});

export const deleteObject = (currentObjectUUID: String) => ({
  type: EDITOR.DELETE_OBJECT,
  payload: {
    currentObjectUUID,
  },
});

export const levelUp = () => ({
  type: EDITOR.LEVEL_UP,
});

export const levelDown = () => ({
  type: EDITOR.LEVEL_DOWN,
});

export const exitAddingMode = () => ({
  type: EDITOR.EXIT_ADDING_MODE,
});

export const exitEditingMode = () => ({
  type: EDITOR.EXIT_EDITING_MODE,
});
