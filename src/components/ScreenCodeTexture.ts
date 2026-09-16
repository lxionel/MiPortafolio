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

    // Deep modern IDE editor background
    ctx.fillStyle = "#0d1117";
    ctx.fillRect(0, 0, w, h);

    // Header title bar
    ctx.fillStyle = "#161b22";
    ctx.fillRect(0, 0, w, 44);

    // macOS window controls
    ctx.fillStyle = "#ff5f56";
    ctx.beginPath();
    ctx.arc(24, 22, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffbd2e";
    ctx.beginPath();
    ctx.arc(42, 22, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#27c93f";
    ctx.beginPath();
    ctx.arc(60, 22, 6, 0, Math.PI * 2);
    ctx.fill();

    // Editor tab
    ctx.fillStyle = "#0d1117";
    ctx.roundRect(85, 8, 260, 36, [6, 6, 0, 0]);
    ctx.fill();

    ctx.fillStyle = "#e6edf3";
    ctx.font = "bold 15px 'Fira Code', monospace";
    ctx.fillText("TransactionManager.kt", 105, 30);

    ctx.fillStyle = "#7d8590";
    ctx.font = "14px 'Fira Code', monospace";
    ctx.fillText("Lionel Aguirre | Kotlin 1.9 | MVVM", 370, 30);

    // Verified badge
    ctx.fillStyle = "rgba(46, 160, 67, 0.2)";
    ctx.strokeStyle = "rgba(46, 160, 67, 0.6)";
    ctx.lineWidth = 1;
    ctx.roundRect(w - 175, 10, 155, 24, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#3fb950";
    ctx.font = "bold 12px 'Fira Code', monospace";
    ctx.fillText("ACID PERSISTENCE", w - 162, 26);

    // Line numbers column
    ctx.fillStyle = "#090d13";
    ctx.fillRect(0, 44, 55, h - 44);

    // Code lines with syntax highlighting
    const lines = [
      { num: "01", text: "package com.lionel.metabit.engine.transaction", color: "#7d8590" },
      { num: "02", text: "", color: "#ffffff" },
      { num: "03", text: "import kotlinx.coroutines.flow.StateFlow", color: "#d2a8ff" },
      { num: "04", text: "import androidx.room.withTransaction", color: "#d2a8ff" },
      { num: "05", text: "", color: "#ffffff" },
      { num: "06", text: "/** Motor transaccional con aislamiento estricto */", color: "#8b949e" },
      { num: "07", text: "class TransactionManager @Inject constructor(", color: "#79c0ff" },
      { num: "08", text: "    private val database: AppDatabase,", color: "#e6edf3" },
      { num: "09", text: "    private val ledgerDao: LedgerDao", color: "#e6edf3" },
      { num: "10", text: ") : ITransactionPipeline {", color: "#79c0ff" },
      { num: "11", text: "    override suspend fun commit(tx: Transaction): Result = database.withTransaction {", color: "#79c0ff" },
      { num: "12", text: "        val current = ledgerDao.getBalance(tx.accountId) ?: 0.0", color: "#e6edf3" },
      { num: "13", text: "        check(current >= tx.amount) { \"Saldo insuficiente: atomic rollback\" }", color: "#7ee787" },
      { num: "14", text: "        ledgerDao.debit(tx.accountId, tx.amount)", color: "#79c0ff" },
      { num: "15", text: "        ledgerDao.insertAuditLog(tx.toLogEntry(status = ACID_COMMITTED))", color: "#d2a8ff" },
      { num: "16", text: "        Result.Success(tx.id)", color: "#7ee787" },
      { num: "17", text: "    }", color: "#79c0ff" },
      { num: "18", text: "}", color: "#79c0ff" },
    ];

    ctx.font = "16px 'Fira Code', monospace";
    let startY = 74;

    lines.forEach((line) => {
      ctx.fillStyle = "#484f58";
      ctx.fillText(line.num, 16, startY);

      ctx.fillStyle = line.color;
      ctx.fillText(line.text, 72, startY);

      startY += 26;
    });

    // Blinking cursor
    if (this.showCursor) {
      ctx.fillStyle = "#58a6ff";
      ctx.fillRect(72 + 330, 74 + 26 * 17 - 14, 8, 18);
    }

    // Integrated Terminal drawer
    ctx.fillStyle = "#161b22";
    ctx.fillRect(55, h - 70, w - 55, 70);

    ctx.fillStyle = "#30363d";
    ctx.fillRect(55, h - 70, w - 55, 1);

    ctx.fillStyle = "#58a6ff";
    ctx.font = "bold 13px 'Fira Code', monospace";
    ctx.fillText("TERMINAL", 75, h - 45);

    ctx.fillStyle = "#7ee787";
    ctx.font = "13px 'Fira Code', monospace";
    ctx.fillText("lionel@workstation:~$ ./gradlew test --offline", 175, h - 45);

    ctx.fillStyle = "#8b949e";
    ctx.font = "12px 'Fira Code', monospace";
    ctx.fillText("BUILD SUCCESSFUL: 12 unit tests passed. Zero regressions.", 175, h - 22);
  }
}