export interface Project {
  id: string;
  title: string;
  category: string;
  badge: string;
  shortDescription: string;
  fullDescription: string[];
  thumbnail: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
  architecturePoints: string[];
  technicalSpecs: { [key: string]: string };
}

export const projects: Project[] = [
  {
    id: "metabit",
    title: "MetaBit Android",
    category: "Desarrollo Móvil Nativo",
    badge: "Offline-First",
    shortDescription: "Aplicación móvil nativa para Android diseñada para la planificación financiera personal y metas de ahorro con enfoque offline-first.",
    fullDescription: [
      "MetaBit fue concebida para resolver la fragilidad y los riesgos de privacidad de las aplicaciones financieras convencionales basadas en la nube.",
      "La aplicación opera con una arquitectura MVVM (Model-View-ViewModel) desacoplada, donde la capa de datos es la única fuente de la verdad (Single Source of Truth) mediante Room Database sobre SQLite.",
      "La comunicación entre capas se realiza mediante flujos asíncronos reactivos (Kotlin StateFlow y Coroutines), asegurando que la interfaz de usuario se actualice de inmediato ante cualquier modificación sin bloquear el hilo principal de ejecución."
    ],
    thumbnail: "assets/projects/metabit.png",
    tags: ["Kotlin", "Android SDK", "Jetpack Room", "MVVM", "Coroutines", "SQLite"],
    githubUrl: "https://github.com/lxionel",
    features: [
      "Proyección Inteligente de Ahorro con algoritmos internos por meta y fecha objetivo.",
      "Persistencia Local con Room DB y migraciones controladas sin pérdida de datos.",
      "Autonomía 100% Offline: cómputos y validaciones procesados enteramente en el dispositivo.",
      "Diseño adaptativo Material 3 con soporte dinámico de temas claro y oscuro.",
      "Exportación y respaldo local de historiales y balances financieros."
    ],
    architecturePoints: [
      "Clean Architecture con separación estricta en capas Domain, Data y Presentation.",
      "Patrón Repository para abstraer fuentes de datos y orquestar llamadas DAO.",
      "Flujos reactivos continuos con StateFlow y StateHolder desacoplados.",
      "Inyección de dependencias y aislamiento de lógica de negocio en Use Cases."
    ],
    technicalSpecs: {
      "Lenguaje": "Kotlin 1.9+",
      "Arquitectura": "MVVM + Clean Architecture",
      "Base de Datos": "Jetpack Room (SQLite)",
      "Concurrencia": "Coroutines & Flow",
      "UI Framework": "Material Design 3 & Jetpack Compose / XML",
      "Compatibilidad": "Android SDK 26+"
    }
  },
  {
    id: "peripollos-pos",
    title: "Sistema POS PeriPollos",
    category: "Software Empresarial & Transaccional",
    badge: "Transacciones ACID",
    shortDescription: "Sistema integral de punto de venta e inventario transaccional desarrollado con Java 17 y Microsoft SQL Server.",
    fullDescription: [
      "En un entorno gastronómico de alta rotación, un error en la sincronización de inventario o un pedido duplicado en horas pico impacta directamente en la rentabilidad y la operatividad.",
      "El Sistema POS PeriPollos fue desarrollado desde cero con un motor transaccional estricto en Microsoft SQL Server respaldado por Java 17 LTS.",
      "Toda operación de venta se encapsula en procedimientos almacenados transaccionales que implementan BEGIN TRANSACTION, COMMIT y ROLLBACK preventivo, asegurando consistencia atómica total."
    ],
    thumbnail: "assets/projects/pos.png",
    tags: ["Java 17 LTS", "SQL Server", "ACID", "JDBC", "Stored Procedures", "FlatLaf"],
    githubUrl: "https://github.com/lxionel",
    features: [
      "Toma dinámica de comandas por mesa, delivery o para llevar con especificaciones para cocina.",
      "Facturación y emisión de comprobantes con cálculo automático de impuestos y descuentos.",
      "Arqueo y cuadre ciego de caja por turnos con auditoría de discrepancias.",
      "Kardex de inventario en tiempo real con alertas preventivas de umbral mínimo de reposición.",
      "Control de accesos y roles (Administrador, Cajero, Mozo) con auditoría estricta."
    ],
    architecturePoints: [
      "Aislamiento de concurrencia y prevención de condiciones de carrera con bloqueos pesimistas en SQL Server.",
      "HikariCP Connection Pool de alto rendimiento para conexiones JDBC eficientes.",
      "Patrón DAO (Data Access Object) y Service Layer desacoplados.",
      "Arquitectura por capas con separación estricta de UI, servicios y persistencia."
    ],
    technicalSpecs: {
      "Lenguaje": "Java 17 LTS",
      "Motor DB": "Microsoft SQL Server",
      "Integridad": "Transacciones ACID & Stored Procedures",
      "Pool JDBC": "HikariCP Connection Pool",
      "UI Desktop": "Java Swing con FlatLaf UI",
      "Reportes": "JasperReports para tickets térmicos y PDF"
    }
  },
  {
    id: "peripollos-web",
    title: "PeriPollos Web & Pedidos",
    category: "Aplicación Web Full-Stack",
    badge: "Producción",
    shortDescription: "Carta digital interactiva y pasarela de pedidos en línea con integración directa a WhatsApp desplegada en producción.",
    fullDescription: [
      "Las aplicaciones tradicionales de delivery retienen un porcentaje significativo del margen operativo de los restaurantes. PeriPollos Web fue concebida para brindar una experiencia digital ágil, elegante y directa al consumidor.",
      "La plataforma elimina la fricción de registro: el comensal explora la carta, personaliza combos y guarniciones, y con un toque genera una comanda codificada lista para ser enviada por la API directa de WhatsApp del negocio.",
      "Desplegada en producción con pipeline automatizado de CI/CD sobre la red de borde global de Netlify."
    ],
    thumbnail: "assets/projects/peripollos.png",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "Netlify CI/CD", "REST"],
    githubUrl: "https://github.com/lxionel",
    liveUrl: "https://peripollos.netlify.app/",
    features: [
      "Carrito de compras reactivo con cálculo dinámico en cliente y validación de pedido mínimo.",
      "Selector fluido de variantes, cremas, complementos y bebidas.",
      "Algoritmo generador de comanda codificada para la API de WhatsApp sin intermediarios.",
      "Diseño Mobile-First optimizado para pantallas táctiles y navegación con una mano.",
      "Integración continua CI/CD con Netlify para despliegue automatizado ante cada push."
    ],
    architecturePoints: [
      "Gestión de estado global y local con hooks personalizados desacoplados.",
      "Optimizaciones de renderizado y lazy loading de componentes e imágenes.",
      "Estructura modular orientada a dominios (Domain-Driven Directory Layout).",
      "Diseño con Tailwind CSS tokenizado y libre de hojas de estilo monolíticas."
    ],
    technicalSpecs: {
      "Frontend": "React 18 & TypeScript",
      "Estilos": "Tailwind CSS con configuración responsive",
      "Empaquetador": "Vite Bundler",
      "Hosting & CDN": "Netlify Edge Network",
      "Lighthouse Score": "95+ en Performance Móvil"
    }
  }
];