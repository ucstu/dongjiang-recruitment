<template>
  <div class="h-full w-full">
    <header class="h-16">header</header>
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
          <n-menu
            class="w-full"
            :collapsed="collapsed"
            :value="route.path"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
            @update:value="router.push($event)"
          />
        </n-layout-sider>
        <n-layout>
          <nav-bar />
          <keep-alive>
            <router-view />
          </keep-alive>
        </n-layout>
      </n-layout>
    </div>
  </div>
</template>

<script setup lang="ts">
import { hasPermission } from "@/hooks";
import router, { routes } from "@/router";
import { useMainStore } from "@/stores";
import type { RouteRecordRaw } from "vue-router";

const mainStore = useMainStore();
const route = useRoute();

const collapsed = ref(false);

const convertRouteToMenuOption = (route: RouteRecordRaw): any => {
  if (route.children && route.children.length > 0) {
    return {
      type: "group",
      key: route.path,
      label: route.meta?.title || route.name,
      show:
        (route.meta?.show !== false && hasPermission(route.meta?.pms)) ||
        mainStore.account?.userName === "2219454275@qq.com",
      children: route.children.map(convertRouteToMenuOption).filter(Boolean),
    };
  } else {
    return {
      key: route.path,
      label: route.meta?.title || route.name,
      show:
        (route.meta?.show !== false && hasPermission(route.meta?.pms)) ||
        mainStore.account?.userName === "2219454275@qq.com",
    };
  }
};

const menuOptions = ref<any[]>([]);
watch(
  () => mainStore.account?.authorities,
  () => {
    menuOptions.value = routes.map(convertRouteToMenuOption).filter(Boolean);
  }
);
</script>

<style scoped lang="scss"></style>
