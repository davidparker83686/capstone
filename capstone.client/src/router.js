import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('LandingPage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/search',
    name: 'SearchPage',
    component: loadPage('SearchPage')
  },
  {
    // path: '/profile',
    path: '/profile/:id',
    name: 'Profile',
    component: loadPage('ProfilePage')
  },
  {
    path: '/dashboard/:id',
    name: 'Dashboard',
    component: loadPage('DashboardPage'),
    beforeEnter: authGuard
  },
  {
    path: '/message',
    name: 'Message',
    component: loadPage('MessagePage'),
    beforeEnter: authGuard
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  }
]

const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})

export default router
