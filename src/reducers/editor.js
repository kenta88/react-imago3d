// @flow
import {
    fromJS,
    type Map,
} from 'immutable';
import type { Store, Action } from 'redux';

import { EDITOR } from '../constants';

export const initialState: Map<string, any> = fromJS({
    isEditMode: false,
    objectType: null,
});

export const getEditorStore = (store: Store) => {
    return store.get('editor').toJS();
};

export default (state: Store = initialState, action: Action) => {
    switch (action.type) {
        case EDITOR.CREATE_OBJECT: {
            const next = state.set('isEditMode', true);
            return next.set('objectType', action.payload.type);
        }
        case EDITOR.EXIT_EDIT_MODE: {
            const next = state.set('isEditMode', false);
            return next.set('objectType', null);
        }
        default: {
            return state;
        }
    }
};
