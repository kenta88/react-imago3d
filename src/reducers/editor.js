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
    objects: [],
});

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
            // let next = state.set('isAddingMode', false);
            const next = state.set('objects', objects.push(action.payload.currentObject));
            // return next.set('currentObject', null);
            return next;
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
