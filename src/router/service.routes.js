import { Layout } from '@/views';
import { List } from '@/views/services';
import { MyInformation } from '@/views/services';
import { Fixtures } from '@/views/services';

export default {
    path: '/services',
    component: Layout,
    children: [
        { path: '', redirect: 'list' },
        { name: 'service-list', path: 'list', component: List },
        { name: 'my-information', path: 'myinformation', component: MyInformation },
        { name: 'fixtures', path: 'fixtures', component: Fixtures }
    ]
};
