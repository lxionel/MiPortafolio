export interface ProfileData {
  name: string;
  fullName: string;
  title: string;
  subtitle: string;
  location: string;
  photoUrl: string;
  email: string;
  phone: string;
  whatsappUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  aboutText: string[];
  metrics: {
    label: string;
    value: string;
    detail: string;
  }[];
}

export const profile: ProfileData = {
  name: "Lionel Aguirre",
  fullName: "Lionel Davor Aguirre Gomero",
  title: "Ingeniero de Sistemas e Informática",
  subtitle: "Especialista en desarrollo backend transaccional, arquitecturas de software de alta fiabilidad, aplicaciones móviles nativas y ciberseguridad.",
  location: "Lima, Perú",
  photoUrl: "assets/images/lionel.png",
  email: "lioneldavora1@gmail.com",
  phone: "+51 902 377 567",
  whatsappUrl: "https://wa.me/51902377567?text=Hola%20Lionel,%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conversar%20sobre%20un%20proyecto.",
  githubUrl: "https://github.com/lxionel",
  linkedinUrl: "https://www.linkedin.com/in/lionel-aguirre-gomero-53a7052a9",
  aboutText: [
    "Ingeniero de Sistemas e Informática enfocado en la construcción de software con rigor arquitectónico, alta disponibilidad y código limpio y mantenible.",
    "He liderado y desarrollado desde motores transaccionales para puntos de venta e inventario con Java 17 y Microsoft SQL Server (operando bajo estrictas garantías ACID con stored procedures), hasta aplicaciones móviles nativas en Kotlin con arquitectura Clean + MVVM y persistencia reactiva en Room DB bajo un modelo offline-first.",
    "Complemento mi perfil técnico con formación oficial en Fundamentos de Ciberseguridad por Cisco Networking Academy, integrando principios de privacidad, protección de datos y mitigación de vulnerabilidades en cada solución que diseño."
  ],
  metrics: [
    {
      label: "Disponibilidad",
      value: "99.9%",
      detail: "Sistemas transaccionales y offline"
    },
    {
      label: "Integridad",
      value: "ACID",
      detail: "Stored procedures y aislamiento estricto"
    },
    {
      label: "Performance Móvil",
      value: "100%",
      detail: "Autonomía local y reactividad con Coroutines"
    },
    {
      label: "Seguridad",
      value: "Cisco",
      detail: "Acreditado en Introducción a Ciberseguridad"
    }
  ]
};