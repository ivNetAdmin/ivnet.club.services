import { Layout } from '@/views';
import { Fixtures } from '@/views/admin';

export default {
    path: '/admin',
    component: Layout,
    children: [
        { name: 'admin-fixtures', path: 'fixtures', component: Fixtures }
    ]
};