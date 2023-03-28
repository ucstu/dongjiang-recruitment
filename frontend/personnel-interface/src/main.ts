import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { createPinia } from "pinia";
import PiniaPluginPersist from "pinia-plugin-persist";
import VueECharts from "vue-echarts";
import App from "./App.vue";
import router from "./router";

const pinia = createPinia();
pinia.use(PiniaPluginPersist);

createApp(App)
  .use(router)
  .use(pinia)
  .component("v-chart", VueECharts)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .mount("#app");
