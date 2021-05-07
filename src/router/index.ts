import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const loadView = (path: string) => {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${path}`);
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: loadView('Login'),
  },
  {
    path: '/',
    name: 'Home',
    component: loadView('Home'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
