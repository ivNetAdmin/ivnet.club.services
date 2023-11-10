import { Layout, List } from '@/views/services';

export default {
    path: '/services',
    component: Layout,
    children: [
        { path: '', redirect: 'list' },
        { name: 'service-list', path: 'list', component: List }
    ]
};
