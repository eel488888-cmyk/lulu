const fs = require("fs");
const path = require("path");
const { spawn, spawnSync } = require("child_process");

const OUT = "C:/Users/Administrator/AppData/Roaming/TRAE SOLO CN/ModularData/ai-agent/work-mode-projects/6a8d472e65d805740da887da/lulu/.trae/dev-output.log";
try { fs.unlinkSync(OUT); } catch {}
function log(s) { try { fs.appendFileSync(OUT, String(s) + "\n"); } catch {} }

log("NODE_VERSION=" + process.version);

const appDirs = [
  "D:/trae/TRAE SOLO CN/resources/app",
  "D:/trae/TRAE SOLO CN/resources/app/out",
];
let npmCli = null;
for (const d of appDirs) {
  const c = path.join(d, "node_modules/npm/bin/npm-cli.js");
  if (fs.existsSync(c)) { npmCli = c; break; }
}
if (!npmCli) {
  // fallback: find npm-cli.js in TRAE resources/app recursively (top 2 levels)
  for (const d of appDirs) {
    try {
      const top = fs.readdirSync(d).map(n => path.join(d, n)).filter(p => fs.statSync(p).isDirectory());
      for (const sub of top) {
        const c = path.join(sub, "npm/bin/npm-cli.js");
        if (fs.existsSync(c)) { npmCli = c; break; }
        const c2 = path.join(sub, "node_modules/npm/bin/npm-cli.js");
        if (fs.existsSync(c2)) { npmCli = c2; break; }
      }
    } catch {}
    if (npmCli) break;
  }
}
log("NPM_CLI=" + (npmCli || "NOT_FOUND"));

const cwd = "C:/Users/Administrator/AppData/Roaming/TRAE SOLO CN/ModularData/ai-agent/work-mode-projects/6a8d472e65d805740da887da/lulu";

// If node_modules not installed, install first
if (!fs.existsSync(path.join(cwd, "node_modules")) && npmCli) {
  log("RUN npm install");
  const r = spawnSync(process.execPath, [npmCli, "install", "--no-audit", "--no-fund"], {
    cwd, stdio: ["ignore", "pipe", "pipe"], encoding: "utf-8", timeout: 600000,
  });
  log("npm install status=" + r.status);
  if (r.stdout) log("stdout:" + r.stdout.slice(-500));
  if (r.stderr) log("stderr:" + r.stderr.slice(-500));
} else if (!npmCli) {
  log("SKIP install, no npm found");
}

if (!npmCli) {
  log("FATAL: npm not found");
  process.exit(1);
}

// Start dev server (no --host required for localhost access)
log("START dev server");
const child = spawn(process.execPath, [npmCli, "run", "dev", "--", "--host", "0.0.0.0"], {
  cwd,
  stdio: ["ignore", "pipe", "pipe"],
  env: { ...process.env },
  windowsHide: true,
});
child.stdout.on("data", d => log("STDOUT: " + d.toString()));
child.stderr.on("data", d => log("STDERR: " + d.toString()));
child.on("exit", c => log("child exit=" + c));
child.on("error", e => log("child err=" + e.message));

// Keep alive
setInterval(() => {}, 1000);
