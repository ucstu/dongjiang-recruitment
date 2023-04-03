<template>
  <div class="h-full w-full">
    <header class="h-16 border-b-2">
      <header-cmp />
    </header>
    <div class="flex" style="height: calc(100% - 64px)">
      <n-layout has-sider class="h-full">
        <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :collapsed="collapsed"
          show-trigger
          @collapse="collapsed = true"
          @expand="collapsed = false"
        >
          <menu-cmp
            v-model:collapsed="collapsed"
            class="w-full h-full overflow-auto"
          />
        </n-layout-sider>
        <n-layout>
          <nav-bar-cmp />
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </n-layout>
      </n-layout>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "@/stores";
import { axios, AxiosError } from "@dongjiang-recruitment/service-common";
import type { MessageReactive } from "naive-ui";
import HeaderCmp from "./components/header.vue";
import MenuCmp from "./components/menu.vue";
import NavBarCmp from "./components/nav-bar.vue";

const collapsed = ref(false);

const router = useRouter();
// @ts-ignore
window.$message = useMessage();
const mainStore = useMainStore();

let timer: NodeJS.Timeout;
let loading: MessageReactive;
axios.interceptors.request.use(
  (config) => {
    timer = setTimeout(() => {
      loading = $message.loading("处理中...", {
        duration: 3000,
      });
    }, 2000);
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${mainStore.token}`,
      } as any,
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 添加响应拦截器，当返回401时，跳转到登录页面
axios.interceptors.response.use(
  (response) => {
    clearTimeout(timer);
    loading?.destroy();
    return response;
  },
  (error) => {
    if (error instanceof AxiosError) {
      switch (error.response?.status) {
        case 400:
          $message.error(error.response.data.error);
          break;
        case 401:
          $message.error("登录过期，请重新登录");
          mainStore.token = "";
          router.replace({ name: "Login" });
          break;
        case 403:
          $message.error("您没有权限访问该资源");
          break;
        case 404:
          $message.error("请求的资源不存在");
          break;
        case 500:
          $message.error("服务器内部错误");
          break;
        default:
          $message.error("服务器连接错误");
          break;
      }
    } else {
      $message.error("服务器连接错误");
    }
    clearTimeout(timer);
    loading?.destroy();
    return Promise.reject(error);
  }
);

nextTick(() => {
  if (mainStore.token === "") {
    router.replace({ name: "Login" });
  }
});
</script>

<style scoped lang="scss"></style>
