const CDN_BASE = import.meta.env.VITE_CDN_URL;
export const useResource = (path: string) => {
  if (!path) return "";
  return `${CDN_BASE}\\${path}`;
};
