import metabitImage from "../../../assets/images/projects/metabit/metabit-1.jpg";
import type { ProjectContent } from "../../types";

export default {
  title: "MetaBit Android",
  theme: "light",
  tags: ["android", "kotlin"],
  source: "https://github.com/lxionel",
  description:
    "Aplicación móvil nativa para Android diseñada para la planificación financiera personal y metas de ahorro con enfoque offline-first.<br/><br/>Construida en Kotlin con arquitectura MVVM (Model-View-ViewModel) y persistencia reactiva en Room Database / SQLite. Permite proyectar ritmos de ahorro, registrar aportes y monitorear metas sin depender de servicios externos ni comprometer la privacidad.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: metabitImage,
        alt: "MetaBit Android - Metas de Ahorro",
        caption: "Captura de la aplicación móvil nativa MetaBit en Android",
        device: "phone",
      },
    },
    {
      type: "text",
      props: {
        title: "Arquitectura & Enfoque Offline-First",
        text: "MetaBit fue concebida para resolver la fragilidad y los riesgos de privacidad de las aplicaciones financieras convencionales en la nube. La aplicación opera con una arquitectura <strong>MVVM (Model-View-ViewModel)</strong> desacoplada, donde la capa de datos es la única fuente de la verdad (Single Source of Truth) mediante <strong>Room Database</strong> sobre SQLite.<br/><br/>La comunicación entre capas se realiza mediante flujos asíncronos reactivos (Kotlin <strong>StateFlow</strong> y <strong>Coroutines</strong>), asegurando que la interfaz de usuario se actualice de inmediato ante cualquier modificación sin bloquear el hilo principal de ejecución.",
      },
    },
    {
      type: "list",
      props: {
        title: "Capacidades de Ingeniería & Características Clave",
        items: [
          "<strong>Proyección Inteligente de Ahorro</strong>: Algoritmos internos que calculan ritmos de aporte diario, semanal y mensual según la fecha objetivo y la capacidad financiera del usuario.",
          "<strong>Persistencia Local con Room DB</strong>: Estructura relacional de entidades, DAOs y migraciones controladas para garantizar cero pérdida de datos ante actualizaciones.",
          "<strong>Autonomía 100% Offline</strong>: Todos los cómputos, validaciones y registros se procesan en el dispositivo, garantizando máxima privacidad de información financiera.",
          "<strong>Diseño Adaptativo Material 3</strong>: Interfaz moderna con soporte nativo de tema oscuro/claro, animaciones fluidas y accesibilidad táctil.",
          "<strong>Exportación & Respaldo</strong>: Capacidad de exportar historiales y balances para respaldo y análisis externo.",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Ficha Técnica & Stack Tecnológico",
        items: [
          "<strong>Lenguaje</strong>: Kotlin 1.9+",
          "<strong>Arquitectura</strong>: MVVM + Clean Architecture",
          "<strong>Persistencia</strong>: Jetpack Room & SQLite",
          "<strong>Asincronía & Reactividad</strong>: Coroutines & StateFlow",
          "<strong>Componentes Jetpack</strong>: ViewModel, LiveData, Navigation Component",
          "<strong>Plataforma</strong>: Android SDK 34+ (retrocompatible)",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
