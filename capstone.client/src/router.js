import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/search',
    name: 'Search',
    component: loadPage('SearchPage')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: loadPage('ProfilePage')
  },
  {
    path: '/dashboard',
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
