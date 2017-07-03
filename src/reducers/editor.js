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
    objectType: '', // wall, floor, window, doors
    currentObject: null,
    objects: []
});

// TODO: REFACTORING REDUCER FOR PROPER EDITOR

export const getEditorStore = (store: Store) => {
    return store.get('editor').toJS();
};

export default (state: Store = initialState, action: Action) => {
    switch (action.type) {
        case EDITOR.CREATE_OBJECT: {
            const next = state.set('isAddingMode', true);
            return next.set('objectType', action.payload.objectType);
        }
        case EDITOR.EDIT_OBJECT: {
            let next = state.set('isEditMode', true);
            next = next.set('currentObject', action.payload.currentObject);
            return next.set('objectType', action.payload.objectType);
        }
        case EDITOR.EXIT_ADDING_MODE: {
            let next = state.set('isAddingMode', false);
            next = next.set('currentObject', null);
            return next.set('objectType', null);
        }
        case EDITOR.EXIT_EDIT_MODE: {
            let next = state.set('isEditMode', false);
            next = next.set('currentObject', null);
            return next.set('objectType', null);
        }
        default: {
            return state;
        }
    }
};
