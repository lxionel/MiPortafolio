export type PageId = "inicio" | "proyectos" | "sobre-mi" | "contacto";

export interface NavItem {
  id: PageId;
  label: string;
  hash: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "inicio", label: "Inicio", hash: "#inicio" },
  { id: "proyectos", label: "Proyectos", hash: "#proyectos" },
  { id: "sobre-mi", label: "Sobre Mí", hash: "#sobre-mi" },
  { id: "contacto", label: "Contacto", hash: "#contacto" },
];
