<template>
  <div class="w-full">
    <div
      class="w-fit flex justify-center items-center h-5 p-2 space-x-1 border- border-lime-500"
      v-for="route in history"
      :key="route.path"
    >
      <span>
        {{ route.meta?.title }}
      </span>
      <n-icon>
        <CloseCircleOutline />
      </n-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CloseCircleOutline } from "@vicons/ionicons5";
import { isNavigationFailure, type RouteLocationNormalized } from "vue-router";

const router = useRouter();
const history = ref<Set<RouteLocationNormalized>>(new Set());

onMounted(() => {
  history.value.add(router.currentRoute.value);
});

router.afterEach((to, from, failure) => {
  if (isNavigationFailure(failure)) return;
  history.value.add(to);
});
</script>

<style scoped lang="scss"></style>
