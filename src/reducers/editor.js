// @flow
import {
    fromJS,
    type Map,
} from 'immutable';
import type { Store, Action } from 'redux';

import { EDITOR } from '../constants';

export const initialState: Map<string, any> = fromJS({
    addingCube: false,
});

export const getAddingCube = (store: Store) => {
    return store.getIn(['editor', 'addingCube']);
};

export default (state: Store = initialState, action: Action) => {
    switch (action.type) {
        case EDITOR.TOGGLE_ADD_CUBE: {
            return state.set('addingCube', !state.get('addingCube'));
        }
        default: {
            return state;
        }
    }
};
