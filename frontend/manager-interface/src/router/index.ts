import ForgetPage from "@/pages/authentication/forget-page.vue";
import LoginPage from "@/pages/authentication/login-page.vue";
import { useMainStore } from "@/stores";
import MainView from "@/views/main-view.vue";
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
    meta: {
      show: false,
      title: "登录",
    },
  },
  {
    path: "/forget",
    name: "Forget",
    component: ForgetPage,
    meta: {
      show: false,
      title: "忘记密码",
    },
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
        meta: {
          show: true,
          title: "账户管理",
        },
      },
    ],
    meta: {
      show: true,
      title: "授权管理",
    },
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
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
