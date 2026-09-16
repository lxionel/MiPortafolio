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
  shortBio: string;
}

export const profile: ProfileData = {
  name: "Lionel Aguirre",
  fullName: "Lionel Davor Aguirre Gomero",
  title: "Ingeniero de Sistemas e Informática",
  subtitle: "Desarrollo backend transaccional, aplicaciones móviles nativas y software de alta fiabilidad.",
  location: "Lima, Perú",
  photoUrl: "assets/images/lionel.png",
  email: "lioneldavora1@gmail.com",
  phone: "+51 902 377 567",
  whatsappUrl: "https://wa.me/51902377567?text=Hola%20Lionel,%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conversar%20sobre%20un%20proyecto.",
  githubUrl: "https://github.com/lxionel",
  linkedinUrl: "https://www.linkedin.com/in/lionel-aguirre-gomero-53a7052a9",
  shortBio: "Especializado en arquitectura transaccional con Java y SQL Server (ACID), aplicaciones móviles nativas en Kotlin con persistencia offline-first (Room DB / MVVM) y principios de ciberseguridad certificados por Cisco."
};