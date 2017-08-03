import objects3DApi from './objects3DApi';

export default function* rootSaga() {
    yield [
        objects3DApi(),
    ];
}
