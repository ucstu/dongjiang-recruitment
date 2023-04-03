<template>
  <n-config-provider :theme-overrides="themeOverrides" class="h-full w-full">
    <n-notification-provider>
      <n-message-provider>
        <main-layout />
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import MainLayout from "@/layouts/main.vue";
import type { GlobalThemeOverrides } from "naive-ui";

const themeOverrides: GlobalThemeOverrides = {};
</script>
