import {atom} from 'recoil';

export const modelsState = atom({
    key: 'modelsState',
    default: [],
});

export const selectModelState = atom({
    key: 'selectModelState',
    default: '',
});

export const userState = atom({
    key:'userState',
    default: ''
})