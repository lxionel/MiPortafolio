import posImage from "../../../assets/images/projects/pos/pos-1.png";
import type { ProjectContent } from "../../types";

export default {
  title: "Sistema POS PeriPollos",
  theme: "light",
  tags: ["java", "sqlserver"],
  source: "https://github.com/lxionel",
  description:
    "Sistema de punto de venta e inventario transaccional desarrollado con Java 17 y Microsoft SQL Server.<br/><br/>Diseñado para operar de forma local y autónoma con alta disponibilidad. Implementa transacciones ACID con procedimientos almacenados para garantizar que el registro de pedidos, la facturación y la actualización de stock ocurran como una única unidad atómica indivisible.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: posImage,
        alt: "Sistema POS PeriPollos - Gestion de Ventas",
        caption: "Interfaz completa del Sistema POS en ejecucion con Java 17 y SQL Server",
      },
    },
  ],
} as const satisfies ProjectContent;
