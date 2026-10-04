export interface ProjectChallenge {
  challenge: string;
  solution: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ArchitectureLayer {
  name: string;
  role: string;
  tech: string;
}

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
  architectureSummary: string;
  databaseTech: string;
  concurrencyModel: string;
  challenges: ProjectChallenge[];
  metrics: ProjectMetric[];
  architectureLayers: ArchitectureLayer[];
}

export const projects: Project[] = [
  {
    id: "metabit",
    title: "MetaBit Android",
    category: "Móvil Nativo",
    badge: "Offline-First",
    description: "Aplicación móvil nativa en Kotlin para planificación financiera y metas de ahorro con persistencia local en Room Database (SQLite) y arquitectura limpia MVVM.",
    thumbnail: "assets/projects/metabit.png",
    tags: ["Kotlin", "Android SDK", "Room DB", "MVVM", "Coroutines"],
    githubUrl: "https://github.com/lxionel",
    highlights: [
      "Operatividad 100% offline sin dependencia de servicios en la nube.",
      "Arquitectura limpia (MVVM) con flujos asíncronos reactivos en StateFlow.",
      "Algoritmos de proyección inteligente para metas y ritmos de ahorro."
    ],
    architectureSummary: "Arquitectura limpia MVVM (Model-View-ViewModel) desacoplada con patrón Repositorio y persistencia local reactiva en Room SQLite.",
    databaseTech: "SQLite mediante Android Jetpack Room con DAOs y entidades fuertemente tipadas.",
    concurrencyModel: "Kotlin Coroutines en Dispatchers.IO con emisión reactiva continua a través de StateFlow.",
    challenges: [
      {
        challenge: "Garantizar disponibilidad y cálculos de ritmo de ahorro sin conexión a internet ni pérdida de datos.",
        solution: "Implementación de Room DB como única fuente de verdad con flujo unidireccional y actualización reactiva de balances."
      },
      {
        challenge: "Prevenir bloqueos y congelamientos en el hilo principal de la UI durante consultas a SQLite.",
        solution: "Aislamiento estricto de I/O en Dispatchers.IO gestionado mediante Coroutines y StateFlow."
      }
    ],
    metrics: [
      { label: "Disponibilidad", value: "100% Offline" },
      { label: "Rendimiento UI", value: "60 FPS Constantes" },
      { label: "Arranque en Frío", value: "< 1.2s" }
    ],
    architectureLayers: [
      { name: "Capa UI", role: "Vistas y componentes reactivos", tech: "Android SDK / XML / ViewBinding" },
      { name: "Capa ViewModel", role: "Gestión de estado y lógica de negocio", tech: "Android ViewModel & StateFlow" },
      { name: "Capa Repositorio", role: "Orquestación de operaciones de datos", tech: "Kotlin Coroutines & Dispatchers.IO" },
      { name: "Capa de Datos", role: "Persistencia física local relacional", tech: "Jetpack Room & SQLite" }
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
    ],
    architectureSummary: "Arquitectura en 3 capas (Presentación Desktop, Reglas de Negocio y Persistencia DAO) con aislamiento transaccional estricto.",
    databaseTech: "Microsoft SQL Server con procedimientos almacenados y aislamiento READ COMMITTED.",
    concurrencyModel: "Pool de conexiones JDBC con transacciones manuales (conn.setAutoCommit(false)) y rollback integral.",
    challenges: [
      {
        challenge: "Evitar inconsistencias en el stock de insumos y descuadres de caja ante caídas del sistema o cancelaciones.",
        solution: "Bloques transaccionales ACID que agrupan inserción de venta, detalle y deducción de almacén en una sola unidad indivisible."
      },
      {
        challenge: "Manejar alta concurrencia de pedidos en horas pico sin bloqueos prolongados de tablas.",
        solution: "Encapsulamiento en Stored Procedures y gestión de conexiones optimizada con liberación garantizada mediante try-with-resources."
      }
    ],
    metrics: [
      { label: "Atomicidad", value: "100% ACID" },
      { label: "Integridad Stock", value: "Cero descuadres" },
      { label: "Latencia Query", value: "< 15ms" }
    ],
    architectureLayers: [
      { name: "Capa Presentación", role: "Módulos de caja, mozos y reportes", tech: "Java Desktop / Swing" },
      { name: "Capa de Negocio", role: "Validación de pedidos, descuentos y cuadre", tech: "Java 17 Core Business Logic" },
      { name: "Capa DAO", role: "Control transaccional y mapeo de datos", tech: "JDBC Nativo con transacciones" },
      { name: "Motor de Datos", role: "Persistencia e integridad referencial", tech: "Microsoft SQL Server & SPs" }
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
    ],
    architectureSummary: "Single Page Application (SPA) reactiva con TypeScript y Tailwind CSS, compilada con Vite y desplegada en edge CDN.",
    databaseTech: "Persistencia reactiva en sesión local (SessionStorage/LocalStorage) con carrito inmutable en memoria.",
    concurrencyModel: "Gestión asíncrona de eventos con React Hooks y validación instantánea de payloads en el cliente.",
    challenges: [
      {
        challenge: "Maximizar la tasa de conversión en comensales móviles sin obligar al registro ni descarga de aplicaciones.",
        solution: "Generador dinámico de URL que formatea la comanda completa con precios, notas y opciones directamente en el protocolo de WhatsApp."
      },
      {
        challenge: "Asegurar carga casi instantánea en teléfonos con conexiones 3G/4G inestables.",
        solution: "Tree-shaking riguroso con Vite y bundle minificado sin dependencias innecesarias, logrando carga bajo 1 segundo."
      }
    ],
    metrics: [
      { label: "Lighthouse Web", value: "98/100" },
      { label: "Tiempo Carga", value: "< 0.8s en 4G" },
      { label: "Disponibilidad", value: "99.9% Netlify" }
    ],
    architectureLayers: [
      { name: "Capa UI", role: "Catálogo interactivo y modal de platos", tech: "React 19 & Tailwind CSS" },
      { name: "Capa de Estado", role: "Control de carrito, adicionales y totales", tech: "React Custom Hooks & TypeScript" },
      { name: "Capa de Integración", role: "Serialización y formato de mensaje comanda", tech: "WhatsApp API URI Builder" },
      { name: "Infraestructura", role: "Distribución estática en borde", tech: "Vite & Netlify Edge CDN" }
    ]
  }
];