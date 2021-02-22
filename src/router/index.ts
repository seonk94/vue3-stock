import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const loadView = (path: string) => {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${path}.tsx`);
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: loadView("Home")
  },
  {
    path: "/about",
    name: "About",
    component: loadView("About")
  },
  {
    path: "/login",
    name: "Login",
    component: loadView("Login")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
