/// <reference types="vite/client" />
/// <reference types="pinia-plugin-persist"  />


import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    menu?: boolean;
    icon?: string;
    title?: string;
  }
}

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

import { MessageApiInjection } from "naive-ui/lib/message/src/MessageProvider";
declare global {
  interface window {
    $message: MessageApiInjection;
  }
  const $message: MessageApiInjection;
}
