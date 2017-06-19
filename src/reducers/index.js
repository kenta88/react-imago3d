import { combineReducers } from 'redux';
import { fromJS } from 'immutable';

export const initialState = fromJS({
    list: [1, 2, 3],
});

const test = (state = initialState, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
};

export default combineReducers({
    test,
});

