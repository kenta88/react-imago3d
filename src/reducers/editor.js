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
    objects: []
});

export const getIsAddingMode = (store: Store) => {
    return store.getIn(['editor', 'isAddingMode']);
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
        case EDITOR.ADD_OBJECT: {
            const objects = state.get('objects');
            let next = state.set('isAddingMode', false);
            next = next.set('objects', objects.push(action.payload.currentObject));
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
