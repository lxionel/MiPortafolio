import * as THREE from "three";

export class ScreenCodeTexture {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  public texture: THREE.CanvasTexture;
  private lastBlink: number = 0;
  private showCursor: boolean = true;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = 1024;
    this.canvas.height = 640;
    this.ctx = this.canvas.getContext("2d")!;
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.render();
  }

  public update(time: number) {
    if (time - this.lastBlink > 500) {
      this.showCursor = !this.showCursor;
      this.lastBlink = time;
      this.render();
      this.texture.needsUpdate = true;
    }
  }

  private render() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // IDE Background
    ctx.fillStyle = "#090d16";
    ctx.fillRect(0, 0, w, h);

    // Top Window Header Bar
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, w, 52);

    // Window controls
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(28, 26, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.arc(48, 26, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.arc(68, 26, 7, 0, Math.PI * 2);
    ctx.fill();

    // Active File Tab
    ctx.fillStyle = "#1e293b";
    ctx.roundRect(100, 10, 280, 42, [8, 8, 0, 0]);
    ctx.fill();

    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 18px 'Fira Code', monospace";
    ctx.fillText("TransactionEngine.kt", 120, 36);

    ctx.fillStyle = "#64748b";
    ctx.font = "16px 'Fira Code', monospace";
    ctx.fillText("Lionel Aguirre | Kotlin 1.9", 420, 36);

    // Status Pill
    ctx.fillStyle = "#064e3b";
    ctx.roundRect(w - 180, 14, 150, 26, 6);
    ctx.fill();
    ctx.fillStyle = "#34d399";
    ctx.font = "bold 13px 'Fira Code', monospace";
    ctx.fillText("ACID VERIFIED", w - 165, 32);

    // Left Line Numbers Column
    ctx.fillStyle = "#0c1322";
    ctx.fillRect(0, 52, 60, h - 52);

    // Code lines data
    const lines = [
      { num: "01", text: "package com.lionel.metabit.engine.transaction", color: "#64748b" },
      { num: "02", text: "", color: "#ffffff" },
      { num: "03", text: "import kotlinx.coroutines.flow.StateFlow", color: "#818cf8" },
      { num: "04", text: "import androidx.room.withTransaction", color: "#818cf8" },
      { num: "05", text: "", color: "#ffffff" },
      { num: "06", text: "/** Lionel Aguirre - Ingeniero de Sistemas */", color: "#475569" },
      { num: "07", text: "class TransactionManager @Inject constructor(", color: "#38bdf8" },
      { num: "08", text: "    private val database: AppDatabase,", color: "#f8fafc" },
      { num: "09", text: "    private val ledgerDao: LedgerDao", color: "#f8fafc" },
      { num: "10", text: ") : ITransactionPipeline {", color: "#38bdf8" },
      { num: "11", text: "    override suspend fun commit(tx: Transaction): Result = database.withTransaction {", color: "#38bdf8" },
      { num: "12", text: "        val current = ledgerDao.getBalance(tx.accountId) ?: 0.0", color: "#f8fafc" },
      { num: "13", text: "        check(current >= tx.amount) { \"Saldo insuficiente: atomic rollback\" }", color: "#34d399" },
      { num: "14", text: "        ledgerDao.debit(tx.accountId, tx.amount)", color: "#38bdf8" },
      { num: "15", text: "        ledgerDao.insertAuditLog(tx.toLogEntry(status = ACID_COMMITTED))", color: "#818cf8" },
      { num: "16", text: "        Result.Success(tx.id)", color: "#34d399" },
      { num: "17", text: "    }", color: "#38bdf8" },
      { num: "18", text: "}", color: "#38bdf8" },
    ];

    ctx.font = "18px 'Fira Code', monospace";
    let startY = 85;

    lines.forEach((line) => {
      // Line number
      ctx.fillStyle = "#334155";
      ctx.fillText(line.num, 16, startY);

      // Line content
      ctx.fillStyle = line.color;
      ctx.fillText(line.text, 80, startY);

      startY += 28;
    });

    // Blinking Cursor on active line
    if (this.showCursor) {
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(80 + 360, 85 + 28 * 17 - 16, 10, 20);
    }

    // Terminal footer drawer
    ctx.fillStyle = "#0b1120";
    ctx.fillRect(60, h - 70, w - 60, 70);

    ctx.fillStyle = "#1e293b";
    ctx.fillRect(60, h - 70, w - 60, 1);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 14px 'Fira Code', monospace";
    ctx.fillText("TERMINAL", 80, h - 45);

    ctx.fillStyle = "#34d399";
    ctx.font = "14px 'Fira Code', monospace";
    ctx.fillText("lionel@workstation:~$ ./gradlew test --stacktrace", 180, h - 45);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "13px 'Fira Code', monospace";
    ctx.fillText("PASSED: 12 tests verified, 0 failures. Offline-first DB synced.", 180, h - 22);
  }
}