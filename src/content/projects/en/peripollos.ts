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
    {
      type: "text",
      props: {
        title: "Estrategia Direct-to-Consumer & Cero Comisiones",
        text: "Las aplicaciones tradicionales de delivery retienen entre el 20% y 30% del margen operativo de los restaurantes locales. PeriPollos Web fue concebida para brindar una experiencia digital ágil, elegante y directa al consumidor.<br/><br/>La plataforma elimina cualquier fricción de registro: el comensal explora la carta, personaliza combos y guarniciones, y con un solo toque genera una comanda estructurada y codificada lista para ser enviada por la API directa de WhatsApp del negocio, permitiendo una conversión inmediata sin intermediarios ni costes extra.",
      },
    },
    {
      type: "list",
      props: {
        title: "Ingeniería Frontend & Experiencia de Usuario",
        items: [
          "<strong>Carrito de Compras Reactivo</strong>: Gestión del estado en cliente con cálculo dinámico de subtotales, recargos de envío y validación de pedidos mínimos.",
          "<strong>Personalización de Productos</strong>: Selección fluida de variantes, piezas, cremas y bebidas con reglas de selección obligatoria y opcional.",
          "<strong>Generador de Comanda WhatsApp</strong>: Algoritmo de codificación URI que estructura automáticamente un mensaje limpio y legible con saltos de línea y especificaciones para cocina.",
          "<strong>Carga Instantánea Mobile-First</strong>: Diseño adaptado para pantallas táctiles con bundle ultra liviano y óptimo rendimiento en redes móviles.",
          "<strong>CI/CD Automatizado</strong>: Despliegue continuo en la red global de Netlify a partir de cada push en el repositorio de GitHub.",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Stack Tecnológico & Métricas",
        items: [
          "<strong>Frontend Core</strong>: React 18 & TypeScript",
          "<strong>Estilos & UI</strong>: Tailwind CSS con diseño responsive personalizado",
          "<strong>Bundler & Build</strong>: Vite (compilación y optimización de assets)",
          "<strong>Infraestructura & CDN</strong>: Netlify Edge Hosting con certificado SSL automático",
          "<strong>Rendimiento</strong>: Puntuación 95+ en Google Lighthouse para rendimiento móvil",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
