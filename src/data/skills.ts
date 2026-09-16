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
      { name: "Tailwind CSS", level: "Avanzado", detail: "Sistemas de diseño modernos, responsivos y componentes de alto contraste" },
      { name: "Three.js", level: "Intermedio", detail: "Escenas 3D interactivas, renderizado WebGL, texturas procedurales e iluminación" }
    ]
  },
  {
    title: "Ciberseguridad & Infraestructura",
    description: "Buenas prácticas de seguridad de la información, protección de datos y automatización.",
    skills: [
      { name: "Cisco Ciberseguridad", level: "Certificado", detail: "Fundamentos de ciberseguridad, confidencialidad y análisis de amenazas" },
      { name: "Seguridad en Aplicaciones", level: "Avanzado", detail: "Validación estricta de entradas, sanitización y control de accesos" },
      { name: "Git & GitHub CI/CD", level: "Avanzado", detail: "Pipelines automatizados con GitHub Actions, branching y despliegue continuo" },
      { name: "Entornos Linux", level: "Intermedio", detail: "Administración básica mediante terminal, configuración y scripts" },
      { name: "Vite & Netlify", level: "Avanzado", detail: "Empaquetado ultra rápido, edge hosting y continuous delivery" }
    ]
  },
  {
    title: "Arquitectura & Buenas Prácticas",
    description: "Estándares de ingeniería aplicados a lo largo de todo el ciclo de vida del software.",
    skills: [
      { name: "Clean Architecture", level: "Avanzado", detail: "Desacoplamiento estricto entre dominio, lógica de negocio y presentación" },
      { name: "Patrón MVVM", level: "Avanzado", detail: "Separación de responsabilidades y flujo unidireccional de datos reactivos" },
      { name: "Transacciones ACID", level: "Avanzado", detail: "Atomicidad, consistencia, aislamiento y durabilidad en operaciones críticas" },
      { name: "Mantenibilidad de Código", level: "Avanzado", detail: "Refactorización continua, código auto-documentado y modularidad" }
    ]
  }
];