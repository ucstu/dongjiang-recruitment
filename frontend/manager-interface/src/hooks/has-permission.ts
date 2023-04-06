import { useMainStore } from "@/stores";

export const hasPermission = (permission: string | undefined): boolean => {
  if (!permission) return true;
  const mainStore = useMainStore();
  if (mainStore.account?.authorities?.some(({ name }) => name === permission))
    return true;
  if (
    mainStore.account?.authorityGroups?.some((group) =>
      group.authorities.some(({ name }) => name === permission)
    )
  )
    return true;
  return false;
};
