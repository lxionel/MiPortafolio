export interface ProfileData {
  name: string;
  title: string;
  subtitle: string;
  location: string;
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
  title: "Ingeniero de Sistemas e Informática",
  subtitle: "Especialista en desarrollo backend transaccional, arquitecturas de software de alta disponibilidad, aplicaciones móviles nativas y redes.",
  location: "Perú",
  email: "lioneldavora1@gmail.com",
  phone: "+51 902 377 567",
  whatsappUrl: "https://wa.me/51902377567?text=Hola%20Lionel,%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conversar%20sobre%20un%20proyecto.",
  githubUrl: "https://github.com/lxionel",
  linkedinUrl: "https://www.linkedin.com/in/lionel-aguirre-gomero-53a7052a9",
  aboutText: [
    "Ingeniero de Sistemas e Informática enfocado en la construcción de software con rigurosidad arquitectónica, fiabilidad operativa y alta calidad de código. Mi experiencia abarca desde el diseño de motores transaccionales con integridad ACID hasta aplicaciones móviles nativas con persistencia local.",
    "En el ecosistema backend y empresarial, he desarrollado sistemas transaccionales con Java 17 y Microsoft SQL Server mediante procedimientos almacenados con control estricto de transacciones, eliminando discrepancias de inventario y optimizando la atención en puntos de venta.",
    "En el entorno móvil, diseño arquitecturas reactivas en Kotlin aplicando Clean Architecture y el patrón MVVM sobre Jetpack Room y Coroutines, ofreciendo una experiencia offline-first resiliente.",
    "Poseo formación certificada por Cisco Networking Academy en fundamentos de redes, conmutación, enrutamiento (Routing & Switching), direccionamiento IP y ciberseguridad defensiva, lo que aporta una comprensión integral de la infraestructura donde operan las aplicaciones."
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
      label: "Infraestructura",
      value: "Cisco",
      detail: "Redes seguras, VLANs y enrutamiento"
    }
  ]
};