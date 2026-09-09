import thumbnailPos from "../../../assets/thumbnails/pos.png";
import thumbnailMetabit from "../../../assets/thumbnails/metabit.png";
import thumbnailPeripollos from "../../../assets/thumbnails/peripollos.png";

import type { ProjectPreview } from "../../types";

export default [
  {
    title: "Sistema POS PeriPollos",
    slug: "pos",
    thumbnail: thumbnailPos,
    description: "Punto de venta y control transaccional ACID con Java 17 y SQL Server",
  },
  {
    title: "MetaBit Android",
    slug: "metabit",
    thumbnail: thumbnailMetabit,
    description: "App móvil nativa de planificación financiera y Room DB offline-first",
  },
  {
    title: "PeriPollos Web",
    slug: "peripollos",
    thumbnail: thumbnailPeripollos,
    description: "Carta digital interactiva y pedidos a WhatsApp con React y Netlify",
  },
] as const satisfies ProjectPreview[];
