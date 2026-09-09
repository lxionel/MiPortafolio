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
    {
      type: "text",
      props: {
        title: "Integridad Transaccional ACID & Alto Rendimiento",
        text: "En un entorno gastronómico de alta rotación, un error en la sincronización de inventario o un pedido duplicado en horas pico impacta directamente en la rentabilidad y la operatividad de cocina. El Sistema POS PeriPollos fue desarrollado desde cero con un motor transaccional estricto en <strong>Microsoft SQL Server</strong> respaldado por <strong>Java 17 LTS</strong>.<br/><br/>Toda operación de venta se encapsula en procedimientos almacenados transaccionales que implementan <code>BEGIN TRANSACTION</code>, <code>COMMIT</code> y <code>ROLLBACK</code> preventivo. Esto garantiza que la emisión del comprobante, el descuento exacto de stock en el kardex y el registro en el arqueo de caja se ejecuten de forma atómica e indivisible, eliminando discrepancias financieras.",
      },
    },
    {
      type: "list",
      props: {
        title: "Módulos del Sistema Operativo",
        items: [
          "<strong>Toma de Comandas & Cocina</strong>: Registro dinámico de pedidos por mesa, delivery o para llevar, con especificaciones de preparación en tiempo real.",
          "<strong>Facturación & Boletas</strong>: Emisión inmediata de comprobantes de pago con cálculo automático de impuestos, descuentos y múltiples modalidades de cobro (Efectivo, Tarjeta, Billeteras Digitales).",
          "<strong>Arqueo y Cierre de Caja por Turnos</strong>: Cuadre ciego de caja, registro de entradas/salidas de efectivo extraordinarias y reporte de diferencias por cajero.",
          "<strong>Kardex de Inventario & Alertas</strong>: Control minucioso de existencias de insumos y productos terminados con notificaciones de umbral mínimo de reposición.",
          "<strong>Seguridad & Roles de Usuario</strong>: Control de acceso basado en privilegios (Administrador, Cajero, Mozo) con auditoría de acciones críticas.",
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Especificaciones Técnicas & Arquitectura",
        items: [
          "<strong>Lenguaje Base</strong>: Java 17 (LTS)",
          "<strong>Motor de Base de Datos</strong>: Microsoft SQL Server",
          "<strong>Conexión & Concurrencia</strong>: Pool de conexiones de alto rendimiento HikariCP vía JDBC",
          "<strong>Mecanismo de Integridad</strong>: Stored Procedures con aislamiento ACID y control de bloqueos",
          "<strong>Interfaz Gráfica</strong>: Java Swing optimizado con Look & Feel moderno (FlatLaf) para pantallas táctiles y escritorio",
          "<strong>Generación de Reportes</strong>: JasperReports para impresión de tickets térmicos y reportes ejecutivos en PDF",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
