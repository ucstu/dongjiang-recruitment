import ForgetPage from "@/pages/authentication/forget-page.vue";
import LoginPage from "@/pages/authentication/login-page.vue";
import RegisterPage from "@/pages/authentication/register-page.vue";
import { useMainStore } from "@/stores";
import MainView from "@/views/main-view.vue";
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/forget",
    name: "Forget",
    component: ForgetPage,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
  },
  {
    path: "/",
    name: "Manage",
    component: MainView,
    children: [
      {
        path: "account",
        name: "Account",
        component: () => import("@/pages/account-manage/account-manage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const whiteList = ["Login", "Forget", "Register"];
router.beforeEach((to, from, next) => {
  const mainStore = useMainStore();
  if (!mainStore.token && !whiteList.includes(to.name as string)) {
    $message?.error("请先登录");
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
