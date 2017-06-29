// @flow

import { EDITOR } from '../constants';

export const createObject = (type: string) => ({
    type: EDITOR.CREATE_OBJECT,
    payload: {
        type,
    }
});

export const exitEditMode = () => ({
    type: EDITOR.EXIT_EDIT_MODE,
});
