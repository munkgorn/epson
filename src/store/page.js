import {atom} from 'recoil';

export const breadcrumbState = atom({
    key: 'breadcrumbState',
    default: [
        {title: 'Home', href: '/'}  
    ],
});

export const titleState = atom({
    key: 'titleState',
    default: 'Home'
})