const fs = require("fs");
const path = require("path");
const LOG_FILE = process.argv[2] || "C:/Users/ADMINI~1/AppData/Local/Temp/dev-log.txt";
try { fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true }); } catch {}
function w(s) { try { fs.appendFileSync(LOG_FILE, Date().slice(16,24) + " " + s + "\r\n", "utf8"); } catch {} }

w("START node=" + process.version + " exec=" + process.execPath);

function findNpm() {
  const roots = [
    "D:/trae/TRAE SOLO CN/resources/app",
    "D:/trae/TRAE SOLO CN/resources/app/out",
    "D:/trae/TRAE SOLO CN/resources/app.asar",
    path.resolve(process.execPath, "../resources/app"),
  ];
  function walk(dir, depth) {
    if (depth > 4) return null;
    let ents;
    try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return null; }
    for (const e of ents) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (e.name === "npm") {
          const cli = path.join(p, "bin/npm-cli.js");
          if (fs.existsSync(cli)) return cli;
        }
        const r = walk(p, depth + 1);
        if (r) return r;
      }
    }
    return null;
  }
  for (const r of roots) {
    if (fs.existsSync(r)) {
      const found = walk(path.join(r, "node_modules"), 0);
      if (found) return found;
      // also walk root one level for node_modules folder
      try {
        const subs = fs.readdirSync(r, { withFileTypes: true }).filter(e => e.isDirectory());
        for (const s of subs) {
          if (s.name === "node_modules") {
            const f = walk(path.join(r, s.name), 0);
            if (f) return f;
          } else {
            const nm = path.join(r, s.name, "node_modules");
            if (fs.existsSync(nm)) {
              const f = walk(nm, 0);
              if (f) return f;
            }
          }
        }
      } catch {}
    }
  }
  return null;
}

const npm = findNpm();
w("NPM=" + (npm || "NOT_FOUND"));

// Start dev using spawn, redirect to LOG
if (npm) {
  const cwd = "C:/Users/Administrator/AppData/Roaming/TRAE SOLO CN/ModularData/ai-agent/work-mode-projects/6a8d472e65d805740da887da/lulu";
  const { spawn } = require("child_process");
  // Install if no node_modules
  if (!fs.existsSync(path.join(cwd, "node_modules"))) {
    w("RUN npm install in " + cwd);
    const { spawnSync } = require("child_process");
    const r = spawnSync(process.execPath, [npm, "install", "--no-audit", "--no-fund"], {
      cwd, encoding: "utf-8", timeout: 600000, maxBuffer: 10*1024*1024,
    });
    w("install status=" + r.status);
    if (r.stdout) w("install out tail=" + r.stdout.slice(-800));
    if (r.stderr) w("install err tail=" + r.stderr.slice(-800));
  }
  w("SPAWN npm run dev -- --host 0.0.0.0");
  const child = spawn(process.execPath, [npm, "run", "dev", "--", "--host", "0.0.0.0"], {
    cwd, windowsHide: false,
  });
  child.stdout.on("data", d => w("OUT " + d.toString().replace(/\r/g,'').slice(0,2000)));
  child.stderr.on("data", d => w("ERR " + d.toString().replace(/\r/g,'').slice(0,2000)));
  child.on("error", e => w("child_err " + e.message));
  child.on("exit", c => w("child_exit " + c));
}
// Keep alive
setInterval(() => {}, 60000);
w("SCRIPT END (keepalive)");
