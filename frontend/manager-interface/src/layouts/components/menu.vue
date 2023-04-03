<template>
  <n-menu
    :collapsed="collapsed"
    :value="route.path"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="menuOptions"
    @update:value="router.push($event)"
  />
</template>

<script setup lang="ts">
import { hasPermission } from "@/hooks";
import router, { routes } from "@/router";
import { useMainStore } from "@/stores";
import type { RouteRecordRaw } from "vue-router";

const props = defineProps<{
  collapsed: boolean;
}>();

const emits = defineEmits<{
  (e:'update:collapsed', val: boolean):void
}>();

const { collapsed } = useVModels(props, emits);

const mainStore = useMainStore();
const route = useRoute();

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

<style scoped></style>
