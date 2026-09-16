export interface Project {
  id: string;
  title: string;
  category: string;
  badge: string;
  description: string;
  thumbnail: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  highlights: string[];
}

export const projects: Project[] = [
  {
    id: "metabit",
    title: "MetaBit Android",
    category: "Móvil Nativo",
    badge: "Offline-First",
    description: "Aplicación móvil nativa en Kotlin para planificación financiera y metas de ahorro con persistencia local en Room Database (SQLite) y arquitectura MVVM.",
    thumbnail: "assets/projects/metabit.png",
    tags: ["Kotlin", "Android SDK", "Room DB", "MVVM", "Coroutines"],
    githubUrl: "https://github.com/lxionel",
    highlights: [
      "Operatividad 100% offline sin dependencia de servicios en la nube.",
      "Arquitectura limpia (MVVM) con flujos asíncronos reactivos en StateFlow.",
      "Algoritmos de proyección inteligente para metas y ritmos de ahorro."
    ]
  },
  {
    id: "peripollos-pos",
    title: "Sistema POS PeriPollos",
    category: "Software Transaccional",
    badge: "ACID",
    description: "Sistema de punto de venta e inventario desarrollado con Java 17 y Microsoft SQL Server, asegurando consistencia atómica mediante procedimientos almacenados.",
    thumbnail: "assets/projects/pos.png",
    tags: ["Java 17", "SQL Server", "ACID", "JDBC", "Stored Procedures"],
    githubUrl: "https://github.com/lxionel",
    highlights: [
      "Transacciones ACID estrictas para cuadre de caja, facturación y stock.",
      "Control de pedidos por mesa, delivery y atención en mostrador.",
      "Pool de conexiones JDBC de alto rendimiento y control de roles."
    ]
  },
  {
    id: "peripollos-web",
    title: "PeriPollos Web & Pedidos",
    category: "Web Frontend",
    badge: "Producción",
    description: "Carta digital interactiva desarrollada con React y TypeScript, con carrito reactivo y generador de pedidos directo a la API de WhatsApp.",
    thumbnail: "assets/projects/peripollos.png",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "Netlify"],
    githubUrl: "https://github.com/lxionel",
    liveUrl: "https://peripollos.netlify.app/",
    highlights: [
      "Generación automática de comanda estructurada para WhatsApp.",
      "Diseño responsive optimizado para carga instantánea en móviles.",
      "Despliegue continuo (CI/CD) en la red global de Netlify."
    ]
  }
];