export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  badge: string;
  image: string;
  verificationId: string;
  verificationNote: string;
  description: string;
  score: string;
  skillsAcquired: string[];
}

export const certifications: Certification[] = [
  {
    id: "cisco-cybersecurity",
    title: "Introducción a Ciberseguridad",
    issuer: "Cisco Networking Academy & UTP",
    date: "Agosto 2026",
    badge: "Seguridad Informática",
    image: "assets/certifications/cisco-cert.webp",
    verificationId: "fc7ee2e7-7e2c-472c-ab1c-7e9d5a18fd09",
    verificationNote: "Acreditación oficial verificada expedida por Cisco Networking Academy en alianza con UTP.",
    score: "100% Calificación en Examen Final",
    description: "Formación especializada en los pilares fundamentales de la seguridad de la información: confidencialidad, integridad y disponibilidad (CIA Triad), detección y mitigación de amenazas, análisis de vulnerabilidades en redes empresariales y mejores prácticas de defensa.",
    skillsAcquired: [
      "Confidencialidad y privacidad de datos sensibles",
      "Identificación y análisis de vulnerabilidades de red",
      "Detección de amenazas y patrones de ataque cibernético",
      "Buenas prácticas defensivas para organizaciones y software",
      "Principios de seguridad por diseño en arquitecturas de sistemas"
    ]
  }
];