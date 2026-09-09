import peripollosImage from "../../../assets/images/projects/peripollos/peripollos-1.png";
import type { ProjectContent } from "../../types";

export default {
  title: "PeriPollos Web & Pedidos",
  theme: "light",
  tags: ["react", "javascript"],
  live: "https://peripollos.netlify.app/",
  source: "https://github.com/lxionel",
  description:
    "Carta digital interactiva y pasarela de pedidos en línea desplegada en producción con Netlify CI/CD.<br/><br/>Desarrollada en React, optimizada para carga instantánea en navegadores móviles. Integra cálculo dinámico de pedidos en memoria y genera un mensaje estructurado directo para checkout vía WhatsApp sin comisiones de intermediarios.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: peripollosImage,
        alt: "PeriPollos Web - Carta Digital",
        caption: "Plataforma web responsiva desplegada en producción en Netlify",
      },
    },
  ],
} as const satisfies ProjectContent;
