<script setup lang="ts">
import { onHide, onLaunch, onShow } from "@dcloudio/uni-app";
import { request } from "@dongjiang-recruitment/request-hooks";
onLaunch(() => {
  request.config.BASE = import.meta.env.VITE_BASE_URL;
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
