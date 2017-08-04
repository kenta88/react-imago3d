// @flow
import * as THREE from 'three';
import {
    fromJS,
    type Map,
} from 'immutable';
import type { Store, Action } from 'redux';

import { EDITOR } from '../constants';
import SAMPLE from '../constants/sample';

let persistedObjects = localStorage.getItem('objects') ? JSON.parse(localStorage.getItem('objects')) : [];
if (!persistedObjects.length && !localStorage.getItem('firstTimeVisit')) {
    persistedObjects = SAMPLE;
    localStorage.setItem('firstTimeVisit', true);
    localStorage.setItem('objects', JSON.stringify(SAMPLE));
}

export const initialState: Map<string, any> = fromJS({
    isEditMode: false,
    isAddingMode: false,
    currentObject: null,
    objectWillSelected: null,
    objects: [],
    level: 0,
}).set('objects', fromJS([]).concat(persistedObjects));

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
export const getLevel = (store: Store) => {
    return store.getIn(['editor', 'level']);
};

export default (state: Store = initialState, action: Action) => {
    switch (action.type) {
        case EDITOR.CREATE_OBJECT: {
            const position = action.payload.currentObject.position;
            const objectToCreate = {
                ...action.payload.currentObject,
                position: new THREE.Vector3(0, 0, 0),
            };
            objectToCreate.level = state.get('level');
            objectToCreate.position.set(
                position.x,
                position.y + (21 * objectToCreate.level),
                position.z,
            );
            const next = state.set('isAddingMode', true);
            return next.set('currentObject', objectToCreate);
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
        case EDITOR.LEVEL_UP: {
            return state.set('level', state.get('level') + 1);
        }
        case EDITOR.LEVEL_DOWN: {
            const currentLevel = state.get('level');
            const nextLevel = (currentLevel > 1) ? currentLevel - 1 : 0;
            return state.set('level', nextLevel);
        }
        default: {
            return state;
        }
    }
};
