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
        caption: "Captura vertical completa de la aplicación móvil nativa MetaBit en Android",
      },
    },
  ],
} as const satisfies ProjectContent;
