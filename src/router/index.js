import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import('@/views/login/index.vue')
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    // 登录或者注册才可以往下进行
    next();
  } else {
    // 获取 token
    const token = localStorage.getItem("token");
    // token 不存在
    if (token === null || token === "") {
      next("/login");
    } else {
      next();
    }
  }
});
export default router
