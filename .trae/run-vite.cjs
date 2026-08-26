const fs = require("fs");
const { spawn } = require("child_process");

const LOG = "C:/Users/Administrator/AppData/Local/Temp/vite-dev.log";
try { fs.unlinkSync(LOG); } catch {}
function w(s) { try { fs.appendFileSync(LOG, Date().slice(16,24) + " " + s + "\r\n", "utf8"); } catch {} }

const CWD = "C:/Users/Administrator/AppData/Roaming/TRAE SOLO CN/ModularData/ai-agent/work-mode-projects/6a8d472e65d805740da887da/lulu";
const viteBin = CWD + "/node_modules/vite/bin/vite.js";

w("node=" + process.version);
w("viteBin=" + viteBin);
w("viteBin exists=" + fs.existsSync(viteBin));

const child = spawn(process.execPath, [viteBin, "--host", "0.0.0.0", "--port", "5173"], {
  cwd: CWD,
  stdio: ["ignore", "pipe", "pipe"],
  env: { ...process.env },
});

child.stdout.on("data", d => w("OUT: " + d.toString().replace(/\r/g, "")));
child.stderr.on("data", d => w("ERR: " + d.toString().replace(/\r/g, "")));
child.on("error", e => w("CHILD_ERR: " + e.message));
child.on("exit", c => w("CHILD_EXIT: " + c));

w("spawned child, pid=" + child.pid);
setInterval(() => {}, 60000);
