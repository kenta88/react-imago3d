import { call, takeEvery } from 'redux-saga/effects';

import { OBJECTS3DAPI } from '../constants';

export function fetchPostsApi() {
    return fetch('http://swapi.co/api/people')
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        return { data: json };
    });
}

function* fetchData() {
    try {
        const data = yield call(fetchPostsApi);
        console.log('try', data);
    } catch (e) {
        console.log(e);
    } finally {
        console.log('finally');
    }
}

function* objects3DApi() {
    yield takeEvery(OBJECTS3DAPI.GET_OBJECTS, fetchData);
}

export default objects3DApi;
