import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import About from '@/views/About.vue';
import Login from '@/views/Login.vue';
import * as NavigationGuardFunction from './NavigationGuard';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'About',
    component: About,
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(NavigationGuardFunction.default.CheckLogin);

export default router;
