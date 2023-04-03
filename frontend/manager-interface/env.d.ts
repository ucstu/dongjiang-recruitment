/// <reference types="vite/client" />
/// <reference types="pinia-plugin-persist"  />

import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    show?: boolean;
    icon?: string;
    title?: string;
    keep?: boolean;
    pms?: string;
  }
}

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_CDN_URL: string;
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
