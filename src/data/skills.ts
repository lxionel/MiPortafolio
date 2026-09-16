export interface SkillGroup {
  category: string;
  items: string[];
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