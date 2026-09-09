const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

export const useRouter = () => {
  const formatPath = (p: string) => {
    if (base && !p.startsWith(base) && p.startsWith("/")) {
      return `${base}${p}`;
    }
    return p;
  };

  const push = (path: string) => {
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", formatPath(path));
    }
  };

  const replace = (path: string) => {
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", formatPath(path));
    }
  };

  const back = () => {
    if (typeof window !== "undefined") {
      window.history?.back?.();
    }
  };

  return {
    push,
    replace,
    back,
  };
};
