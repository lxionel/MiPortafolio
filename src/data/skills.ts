export interface SkillGroup {
  category: string;
  items: string[];
}

export interface SkillDetail {
  name: string;
  category: string;
  level: string;
  description: string;
  appliedIn: string;
  concepts: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Backend & Datos",
    items: ["Java 17 LTS", "Microsoft SQL Server", "Transacciones ACID", "Stored Procedures", "Kotlin", "RESTful APIs", "JDBC / HikariCP"]
  },
  {
    category: "Móvil & Frontend",
    items: ["Android Nativo (Kotlin)", "Jetpack Room (SQLite)", "MVVM", "Coroutines & Flow", "React", "TypeScript", "Tailwind CSS"]
  },
  {
    category: "Ciberseguridad & DevOps",
    items: ["Cisco Ciberseguridad (Certificado)", "Análisis de Vulnerabilidades", "Protección de Datos (CIA)", "Git & GitHub Actions", "Linux"]
  },
  {
    category: "Arquitectura",
    items: ["Clean Architecture", "Patrón MVVM", "Sistemas Offline-First", "Integridad Transaccional", "Diseño Modular"]
  }
];

export const skillDetails: Record<string, SkillDetail> = {
  "Java 17 LTS": {
    name: "Java 17 LTS",
    category: "Backend & Datos",
    level: "Avanzado / Core",
    description: "Desarrollo de lógica transaccional de negocio, programación orientada a objetos rigurosa y gestión de memoria eficiente sin dependencias sobredimensionadas.",
    appliedIn: "Sistema POS PeriPollos",
    concepts: ["JDBC Avanzado", "Try-with-resources", "Patrón DAO", "Multihilo Seguro", "LTS Enterprise"]
  },
  "Microsoft SQL Server": {
    name: "Microsoft SQL Server",
    category: "Backend & Datos",
    level: "Avanzado / Producción",
    description: "Modelado relacional normalizado (3FN), creación de índices compuestos y ejecución de procedimientos almacenados optimizados con aislamiento de concurrencia.",
    appliedIn: "Sistema POS PeriPollos",
    concepts: ["Procedimientos Almacenados", "Índices Agrupados", "READ COMMITTED", "Atomicidad", "Gestión de Bloqueos"]
  },
  "Transacciones ACID": {
    name: "Transacciones ACID",
    category: "Backend & Datos",
    level: "Especializado",
    description: "Control absoluto de atomicidad, consistencia, aislamiento y durabilidad para evitar descuadres en caja, sobreventa de inventario o datos corruptos.",
    appliedIn: "Sistema POS PeriPollos (Caja y Stock)",
    concepts: ["Commit Atómico", "Rollback ante Excepción", "Aislamiento de Concurrencia", "Integridad Referencial"]
  },
  "Stored Procedures": {
    name: "Stored Procedures",
    category: "Backend & Datos",
    level: "Avanzado",
    description: "Encapsulación de consultas complejas en el servidor de base de datos para reducir la latencia de red y blindar el sistema contra inyecciones SQL.",
    appliedIn: "Facturación y Descuento de Insumos",
    concepts: ["CallableStatement", "Parámetros OUT", "Transacciones T-SQL", "Precompilación"]
  },
  "Android Nativo (Kotlin)": {
    name: "Android Nativo (Kotlin)",
    category: "Móvil & Frontend",
    level: "Avanzado / Arquitectura",
    description: "Desarrollo de aplicaciones móviles modernas con Kotlin idiomático, ciclo de vida de componentes Android y separación estricta de responsabilidades.",
    appliedIn: "MetaBit Android",
    concepts: ["ViewBinding", "Android Jetpack", "Null Safety", "Lifecycle Aware", "Material Design"]
  },
  "Jetpack Room (SQLite)": {
    name: "Jetpack Room (SQLite)",
    category: "Móvil & Frontend",
    level: "Avanzado / Offline-First",
    description: "Persistencia local reactiva con validación de consultas SQL en tiempo de compilación y retorno de flujos observables hacia la interfaz de usuario.",
    appliedIn: "MetaBit Android (Almacenamiento Local)",
    concepts: ["DAOs Tipados", "Consultas Reactivas", "Migraciones de Esquema", "SQLite Nativo"]
  },
  "MVVM": {
    name: "MVVM (Model-View-ViewModel)",
    category: "Arquitectura",
    level: "Patrón Estándar",
    description: "Desacoplamiento total entre la lógica de presentación y el modelo de datos, garantizando código mantenible, testeable y resistente a rotaciones de pantalla.",
    appliedIn: "MetaBit Android",
    concepts: ["ViewModel", "StateFlow", "Unidirectional Data Flow", "Separación de Capas"]
  },
  "Coroutines & Flow": {
    name: "Coroutines & Flow",
    category: "Móvil & Frontend",
    level: "Avanzado",
    description: "Programación asíncrona reactiva sin bloqueos del hilo principal de renderizado, despachando operaciones de base de datos en hilos secundarios.",
    appliedIn: "MetaBit Android (Proyecciones de Ahorro)",
    concepts: ["Dispatchers.IO", "Dispatchers.Main", "StateFlow", "SharedFlow", "Estructura Concurrente"]
  },
  "Cisco Ciberseguridad (Certificado)": {
    name: "Cisco Ciberseguridad (Certificado)",
    category: "Ciberseguridad & DevOps",
    level: "Acreditado Cisco (94.7%)",
    description: "Aplicación de la tríada de seguridad CIA (Confidencialidad, Integridad, Disponibilidad), auditoría defensiva y prevención activa de vulnerabilidades.",
    appliedIn: "Auditoría de todos los proyectos",
    concepts: ["CIA Triad", "Sanitización de Entradas", "Mínimo Privilegio", "Defensa en Profundidad", "Criptografía"]
  },
  "React": {
    name: "React & TypeScript",
    category: "Móvil & Frontend",
    level: "Intermedio / Avanzado",
    description: "Construcción de interfaces de usuario modulares, tipado estricto con TypeScript para evitar errores en tiempo de ejecución y rendimiento fluido.",
    appliedIn: "PeriPollos Web & Portafolio",
    concepts: ["Hooks Personalizados", "Renderizado Reactivo", "Componentes Puros", "Vite Bundler"]
  },
  "Sistemas Offline-First": {
    name: "Sistemas Offline-First",
    category: "Arquitectura",
    level: "Especializado",
    description: "Diseño donde la aplicación móvil funciona al 100% de sus capacidades sin requerir señal de internet, utilizando la base de datos local como única fuente de verdad.",
    appliedIn: "MetaBit Android",
    concepts: ["Local Single Source of Truth", "Cache Reactivo", "Disponibilidad Absoluta", "Sin Dependencia de Nube"]
  }
};