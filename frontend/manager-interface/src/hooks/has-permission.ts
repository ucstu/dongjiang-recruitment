import { useMainStore } from "@/stores";

export const hasPermission = (permission: string | undefined): boolean => {
  const mainStore = useMainStore();
  if (mainStore.account?.authorities?.some(({ name }) => name === permission))
    return true;
  if (
    mainStore.account?.groups.some((group) =>
      group.authorities.some(({ name }) => name === permission)
    )
  )
    return true;
  return false;
};
