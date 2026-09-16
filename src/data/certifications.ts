export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  badge: string;
  image: string;
  verificationNote: string;
  description: string;
  skillsAcquired: string[];
}

export const certifications: Certification[] = [
  {
    id: "cisco-networking",
    title: "Cisco Networking Academy",
    issuer: "Cisco Systems",
    date: "Acreditación Oficial",
    badge: "Infraestructura & Redes",
    image: "assets/certifications/cisco-cert.webp",
    verificationNote: "Credencial oficial verificada expedida por Cisco Networking Academy.",
    description: "Formación especializada en arquitectura de redes de datos, modelos OSI y TCP/IP, configuración de switches y routers Cisco con Cisco IOS, topologías LAN/WAN, subredes IPv4/IPv6 y fundamentos de ciberseguridad.",
    skillsAcquired: [
      "Configuración y despliegue de switches y routers con Cisco IOS",
      "Segmentación de redes mediante VLANs, VTP y enlaces troncales 802.1Q",
      "Enrutamiento estático y protocolos dinámicos (OSPF, RIP)",
      "Direccionamiento estructurado IPv4/IPv6 y cálculo de VLSM",
      "Servicios de red: DHCP, DNS, NAT/PAT y listas de control de acceso (ACLs)",
      "Diagnóstico, análisis de tráfico con Wireshark y mitigación de amenazas"
    ]
  }
];