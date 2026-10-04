import React, { useState } from "react";
import { Terminal, Copy, Check, Server, Smartphone, ShieldCheck, ArrowRight } from "lucide-react";
import { PageId } from "../types";

interface ArchitectureTerminalProps {
  onNavigate?: (page: PageId) => void;
}

type TabKey = "backend" | "mobile" | "security";

interface TabSpec {
  id: TabKey;
  label: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  fileName: string;
  language: string;
  summary: string;
  keyDecisions: string[];
  code: string;
}

const TABS: TabSpec[] = [
  {
    id: "backend",
    label: "Backend & ACID",
    badge: "Java 17 & SQL Server",
    icon: Server,
    fileName: "TransaccionVentaDAO.java",
    language: "java",
    summary: "Control estricto de concurrencia y atomicidad para sistemas de ventas y facturación sin inconsistencias.",
    keyDecisions: [
      "Transacciones ACID con conn.setAutoCommit(false) y rollback ante cualquier SQLException.",
      "Ejecución encapsulada mediante Procedimientos Almacenados con aislamiento READ COMMITTED.",
      "Pool de conexiones JDBC de alta concurrencia para evitar fugas de memoria o bloqueos de tablas.",
    ],
    code: `// Capa de Persistencia Transaccional ACID
public class TransaccionVentaDAO {
    private final DataSource dataSource;

    public boolean registrarVentaCompleta(Venta venta, List<DetalleVenta> items) throws SQLException {
        String spVenta = "{call sp_RegistrarVenta(?, ?, ?, ?)}";
        String spDetalle = "{call sp_InsertarDetalle(?, ?, ?, ?)}";

        try (Connection conn = dataSource.getConnection()) {
            conn.setAutoCommit(false); // Transaccion Atomica
            try (CallableStatement csVenta = conn.prepareCall(spVenta);
                 CallableStatement csDetalle = conn.prepareCall(spDetalle)) {
                
                csVenta.setInt(1, venta.getClienteId());
                csVenta.setBigDecimal(2, venta.getTotal());
                csVenta.registerOutParameter(3, Types.INTEGER);
                csVenta.execute();
                
                int idGenerado = csVenta.getInt(3);
                for (DetalleVenta item : items) {
                    csDetalle.setInt(1, idGenerado);
                    csDetalle.setInt(2, item.getProductoId());
                    csDetalle.setInt(3, item.getCantidad());
                    csDetalle.setBigDecimal(4, item.getPrecioUnitario());
                    csDetalle.addBatch();
                }
                csDetalle.executeBatch();
                
                conn.commit(); // Confirmacion atomica
                return true;
            } catch (SQLException ex) {
                conn.rollback(); // Rollback total ante error
                throw new DataIntegrityException("Fallo de atomicidad revertido: " + ex.getMessage());
            }
        }
    }
}`,
  },
  {
    id: "mobile",
    label: "Móvil Offline-First",
    badge: "Kotlin & Room DB",
    icon: Smartphone,
    fileName: "MetaAhorroRepository.kt",
    language: "kotlin",
    summary: "Arquitectura limpia MVVM con persistencia local en SQLite y reactividad mediante Kotlin StateFlow.",
    keyDecisions: [
      "Persistencia local prioritaria en Room Database sin requerir conexión a internet activa.",
      "Desacoplamiento estricto entre UI y datos con Coroutines y Dispatchers.IO para operaciones fluidas a 60 FPS.",
      "Manejo de estados inmutables con StateFlow para evitar inconsistencias en pantallas simultáneas.",
    ],
    code: `// Repositorio Offline-First con Room DB y Coroutines
class MetaAhorroRepository @Inject constructor(
    private val metaDao: MetaDao,
    private val dispatcher: CoroutineDispatcher = Dispatchers.IO
) {
    // Flujo reactivo local de metas activas
    val todasLasMetas: Flow<List<MetaEntity>> = metaDao.obtenerTodasLasMetas()
        .flowOn(dispatcher)

    suspend fun agregarAporte(metaId: Long, monto: Double): Result<Unit> = withContext(dispatcher) {
        runCatching {
            val metaActual = metaDao.obtenerPorId(metaId) 
                ?: throw NoSuchElementException("Meta no encontrada")
            
            val nuevoSaldo = metaActual.montoActual + monto
            val porcentaje = ((nuevoSaldo / metaActual.montoObjetivo) * 100).coerceAtMost(100.0)
            
            metaDao.actualizarProgreso(metaId, nuevoSaldo, porcentaje)
        }
    }
}`,
  },
  {
    id: "security",
    label: "Ciberseguridad Aplicada",
    badge: "Cisco CIA Triad",
    icon: ShieldCheck,
    fileName: "SecurityValidationModule.ts",
    language: "typescript",
    summary: "Seguridad por diseño: prevención de inyecciones, validación estricta de esquemas y protección de datos sensibles.",
    keyDecisions: [
      "Validación de entradas con esquemas tipados estrictos contra inyecciones SQL y XSS.",
      "Principio de mínimo privilegio en roles de base de datos y credenciales de API.",
      "Auditoría y trazabilidad de eventos críticos con registro criptográfico sin almacenamiento en texto plano.",
    ],
    code: `// Modulo de Seguridad y Sanitizacion por Diseno (Cisco CIA)
export class SecurityValidationModule {
    // Sanitizacion estricta contra SQL Injection y XSS
    static sanitizeTextInput(rawInput: string, maxLength = 255): string {
        if (!rawInput || typeof rawInput !== 'string') return '';
        
        return rawInput
            .trim()
            .slice(0, maxLength)
            .replace(/[<>'";\\\\\`]/g, '') // Elimina caracteres de escape peligrosos
            .normalize('NFKC');
    }

    // Verificacion de integridad de transaccion (Integridad CIA)
    static verifyTransactionIntegrity(payload: { id: string; monto: number; hash: string }, secret: string): boolean {
        const calculated = crypto
            .createHmac('sha256', secret)
            .update(\`\${payload.id}:\${payload.monto.toFixed(2)}\`)
            .digest('hex');
            
        return crypto.timingSafeEqual(
            Buffer.from(payload.hash),
            Buffer.from(calculated)
        );
    }
}`,
  },
];

export const ArchitectureTerminal: React.FC<ArchitectureTerminalProps> = ({ onNavigate }) => {
  const [activeTabKey, setActiveTabKey] = useState<TabKey>("backend");
  const [copied, setCopied] = useState<boolean>(false);

  const activeTab = TABS.find((t) => t.id === activeTabKey) || TABS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTab.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 md:py-28 bg-[#F5EFE6] border-b border-[#E2D7C7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-block">
            <span className="sticker-banner -rotate-2 text-xs tracking-wider uppercase">
              ENFOQUE TÉCNICO INTERACTIVO
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2D2A24] uppercase tracking-tight font-sans">
            Consola de Arquitectura
          </h2>
          <p className="text-base sm:text-lg text-[#5F5646] font-medium leading-relaxed">
            Inspecciona cómo abordo el desacoplamiento de capas, el control transaccional ACID y la resiliencia en código real.
          </p>
        </div>

        {/* Tab Selector Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isSelected = tab.id === activeTabKey;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabKey(tab.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#2D2A24] text-white shadow-md -translate-y-0.5"
                    : "bg-[#EAE0D2] hover:bg-[#E2D7C7] text-[#5F5646] hover:text-[#2D2A24] border border-[#E2D7C7]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-[#FF8400]" : "text-[#5F5646]"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Terminal Window Box */}
        <div className="bg-[#211F1B] rounded-3xl overflow-hidden border border-[#38342E] shadow-2xl text-slate-200">
          {/* Top Terminal Bar */}
          <div className="px-5 py-3.5 bg-[#1A1815] border-b border-[#38342E] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#EF4444]/80"></span>
                <span className="w-3 h-3 rounded-full bg-[#F59E0B]/80"></span>
                <span className="w-3 h-3 rounded-full bg-[#10B981]/80"></span>
              </div>
              <div className="h-4 w-px bg-white/10 mx-2"></div>
              <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                <Terminal className="w-3.5 h-3.5 text-[#FF8400]" />
                <span className="text-slate-300 font-semibold">{activeTab.fileName}</span>
                <span className="text-slate-600">({activeTab.badge})</span>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
              title="Copiar código"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>

          {/* Grid Layout: Code Display + Decision Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#38342E]">
            {/* Left: Code Box */}
            <div className="lg:col-span-8 p-5 sm:p-6 overflow-x-auto font-mono text-xs sm:text-[13px] leading-relaxed bg-[#1E1C19]">
              <pre className="text-slate-300 whitespace-pre">
                <code>{activeTab.code}</code>
              </pre>
            </div>

            {/* Right: Architecture Decisions Panel */}
            <div className="lg:col-span-4 p-6 sm:p-7 flex flex-col justify-between space-y-6 bg-[#25221E]">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF8400]">
                    Decisiones de Diseño
                  </span>
                  <h4 className="text-lg font-bold text-white">
                    {activeTab.label}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    {activeTab.summary}
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  {activeTab.keyDecisions.map((decision, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-300"
                    >
                      <span className="w-5 h-5 rounded-md bg-[#FF8400]/15 text-[#FF8400] font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{decision}</span>
                    </div>
                  ))}
                </div>
              </div>

              {onNavigate && (
                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={() => onNavigate("proyectos")}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#FF8400] hover:bg-[#E57600] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
                  >
                    <span>Ver Proyectos que usan este stack</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
