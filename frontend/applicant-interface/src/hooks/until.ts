import type { Ref } from "vue";

export const until = (ready: Ref<boolean>, callback: () => void) => {
  const finish = watch(ready, (value) => {
    console.log("until", value);

    if (value) {
      callback();
      finish();
    }
  });
};
