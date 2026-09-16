export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: string;
    detail: string;
  }[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Backend & Bases de Datos",
    description: "Diseño de servidores robustos, lógica transaccional y persistencia relacional con altos estándares de integridad.",
    skills: [
      { name: "Java 17 LTS", level: "Avanzado", detail: "POO, Streams, Concurrencia, JDBC y servicios empresariales" },
      { name: "Microsoft SQL Server", level: "Avanzado", detail: "Transacciones ACID, Stored Procedures, Triggers, Índices y Vistas" },
      { name: "Kotlin", level: "Intermedio-Avanzado", detail: "Coroutines, Flow, Programación funcional y APIs nativas" },
      { name: "Arquitectura Transaccional", level: "Avanzado", detail: "Prevención de deadlocks, aislamiento transaccional y consistencia" },
      { name: "RESTful APIs", level: "Avanzado", detail: "Diseño de contratos de API, serialización JSON y autenticación" }
    ]
  },
  {
    title: "Desarrollo Móvil & Frontend",
    description: "Construcción de interfaces de usuario modernas, de alto rendimiento y preparadas para operar offline.",
    skills: [
      { name: "Android Nativo (Kotlin)", level: "Avanzado", detail: "Jetpack Room, ViewModel, LiveData, Clean Architecture" },
      { name: "React & TypeScript", level: "Avanzado", detail: "Hooks personalizados, gestión reactiva de estado y componentes modulares" },
      { name: "Arquitectura Offline-First", level: "Avanzado", detail: "Persistencia local única fuente de verdad y sincronización" },
      { name: "Tailwind CSS", level: "Avanzado", detail: "Sistemas de diseño modernos, responsivos y componentes glassmorphic" },
      { name: "Three.js", level: "Intermedio", detail: "Modelos 3D interactivos, shaders GLSL, texturas dinámicas y luces" }
    ]
  },
  {
    title: "Redes, Infraestructura & DevOps",
    description: "Dominio de conectividad, topologías de red, automatización de compilación y despliegue.",
    skills: [
      { name: "Cisco Networking & IOS", level: "Certificado", detail: "VLANs, Troncales, Enrutamiento estático/OSPF, ACLs y NAT" },
      { name: "Modelos OSI & TCP/IP", level: "Avanzado", detail: "Subnetting IPv4/IPv6, análisis de paquetes y diagnóstico de red" },
      { name: "Git & GitHub CI/CD", level: "Avanzado", detail: "Workflows automatizados con GitHub Actions, branching y pull requests" },
      { name: "Entornos Linux", level: "Intermedio-Avanzado", detail: "Administración vía shell, despliegue de servicios y scripts bash" },
      { name: "Vite & Netlify", level: "Avanzado", detail: "Empaquetado optimizado, edge hosting y continuous delivery" }
    ]
  },
  {
    title: "Arquitectura & Buenas Prácticas",
    description: "Estándares de ingeniería aplicados a lo largo de todo el ciclo de vida del software.",
    skills: [
      { name: "Clean Architecture", level: "Avanzado", detail: "Desacoplamiento estricto entre dominio, lógica y presentación" },
      { name: "Patrón MVVM", level: "Avanzado", detail: "Separación clara de responsabilidades y flujo unidireccional de datos" },
      { name: "Seguridad por Diseño", level: "Avanzado", detail: "Validación estricta de entradas, sanitización y principios de privilegio mínimo" },
      { name: "Control de Calidad", level: "Avanzado", detail: "Refactorización continua, código auto-documentado y mantenibilidad" }
    ]
  }
];