// @flow
import {
    fromJS,
    type Map,
} from 'immutable';
import type { Store, Action } from 'redux';

import { EDITOR } from '../constants';

export const initialState: Map<string, any> = fromJS({
    isEditMode: false,
    isAddingMode: false,
    currentObject: null,
    objectWillSelected: null,
    objects: [],
});


export const getObjectWillSelected = (store: Store) => {
    return store.getIn(['editor', 'objectWillSelected']);
};
export const getIsAddingMode = (store: Store) => {
    return store.getIn(['editor', 'isAddingMode']);
};
export const getIsEditMode = (store: Store) => {
    return store.getIn(['editor', 'isEditMode']);
};
export const getCurrentObject = (store: Store) => {
    return store.getIn(['editor', 'currentObject']);
};
export const getObjects = (store: Store) => {
    return store.getIn(['editor', 'objects']);
};

export default (state: Store = initialState, action: Action) => {
    switch (action.type) {
        case EDITOR.CREATE_OBJECT: {
            const next = state.set('isAddingMode', true);
            return next.set('currentObject', action.payload.currentObject);
        }
        case EDITOR.EDIT_OBJECT: {
            const next = state.set('isEditMode', true);
            return next.set('currentObject', action.payload.currentObject);
        }
        case EDITOR.ADD_OBJECT: {
            const objects = state.get('objects');
            const next = state.set('objects', objects.push(action.payload.currentObject));
            return next;
        }
        case EDITOR.DELETE_OBJECT: {
            const objects = state.get('objects').filter((object) => {
                return action.payload.currentObjectUUID !== object.uuid;
            });
            return state.set('objects', objects);
        }
        case EDITOR.SET_OBJECT_WILL_SELECTED: {
            return state.set('objectWillSelected', action.payload.objectUUID);
        }
        case EDITOR.EXIT_EDITING_MODE: {
            const next = state.set('isEditMode', false);
            return next.set('currentObject', null);
        }
        case EDITOR.EXIT_ADDING_MODE: {
            const next = state.set('isAddingMode', false);
            return next.set('currentObject', null);
        }
        default: {
            return state;
        }
    }
};
