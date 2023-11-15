
import { Layout } from '@/views';
import { Login, Register } from '@/views/account';

export default {
    path: '/account',
    component: Layout,
    children: [
        { path: '', redirect: 'login' },
        { name: 'login', path: 'login', component: Login },
        { name: 'register', path: 'register', component: Register }
    ]
};
