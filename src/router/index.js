import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { currentUser } from '@/stores/currentUserStore.js'

function guardMyroute(to, from, next)
{
 if(currentUser.authenticated != 'true') 
 {
  next('/'); // go to login
 } 
 else
 {
  next(); // allow to enter route
 }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/sandbox',
      name: 'sandbox',
      component: () => import('../views/SandBoxView.vue')
    },
    {
      path: '/services',
      name: 'services',
      beforeEnter : guardMyroute,
      component: () => import('../views/ServicesView.vue')
    },
    {
      path: '/personaldetails',
      name: 'personaldetails',
      beforeEnter : guardMyroute,
      component: () => import('../views/PersonalDetailsView.vue')
    },
    {
      path: '/rinkbooking',
      name: 'rinkbooking',
      beforeEnter : guardMyroute,
      component: () => import('../views/RinkBookingView.vue')
    },
    {
      path: '/fixturelist',
      name: 'fixturelist',
      beforeEnter : guardMyroute,
      component: () => import('../views/FixtureListView.vue')
    },
    {
      path: '/cpw',
      name: 'cpw',
      beforeEnter : guardMyroute,
      component: () => import('../views/ChangePasswordView.vue')
    },
    {
      path: '/clubadmin',
      name: 'clubadmin',
      beforeEnter : guardMyroute,
      component: () => import('../views/ClubAdminView.vue')
    }
  ]
})

export default router
