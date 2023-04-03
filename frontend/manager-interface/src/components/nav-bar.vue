<template>
  <div class="w-full">
    <div class="n-tabs-tab-wrapper">
      <div
        data-name="oasis"
        class="n-tabs-tab n-tabs-tab--active n-tabs-tab--closable"
        v-for="route in history"
      >
        <span class="n-tabs-tab__label">
          {{ route.meta.title }}
        </span>
        <button
          type="button"
          tabindex="0"
          aria-disabled="false"
          aria-label="close"
          class="n-base-close n-tabs-tab__close"
          @click="history.delete(route)"
        >
          <i class="n-base-icon">
            <svg
              viewBox="0 0 12 12"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g fill="currentColor" fill-rule="nonzero">
                  <path
                    d="M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z"
                  ></path>
                </g>
              </g>
            </svg>
          </i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isNavigationFailure, type RouteLocationNormalized } from "vue-router";

const router = useRouter();
const history = ref<Set<RouteLocationNormalized>>(new Set());

router.afterEach((to, from, failure) => {
  if (isNavigationFailure(failure)) return;
  history.value.add(to);
});
</script>

<style scoped lang="scss"></style>
