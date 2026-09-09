export const social = [
  { url: "mailto:lioneldavora1@gmail.com", name: "mail" },
  { url: "https://wa.me/51902377567", name: "whatsapp" },
  { url: "https://github.com/lxionel", name: "github" },
  { url: "https://www.linkedin.com/in/lionel-aguirre-gomero-53a7052a9", name: "linkedin" },
] as const satisfies { url: string; name: "mail" | "github" | "instagram" | "linkedin" | "x" | "whatsapp" }[];
