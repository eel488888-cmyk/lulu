const fs = require("fs");
const path = require("path");
const LOG_FILE = process.argv[2] || "C:/Users/ADMINI~1/AppData/Local/Temp/dev-log.txt";
function w(s) { try { fs.appendFileSync(LOG_FILE, Date().slice(16,24) + " " + s + "\r\n", "utf8"); } catch {} }

function exists(p) { try { return fs.existsSync(p); } catch { return false; } }

// npm can also be global, in PATH, or npm.cmd found via shell
const candidates = [
  "C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js",
  "C:/Program Files (x86)/nodejs/node_modules/npm/bin/npm-cli.js",
  "C:/Users/Administrator/AppData/Roaming/npm/node_modules/npm/bin/npm-cli.js",
  "D:/nodejs/node_modules/npm/bin/npm-cli.js",
  // via program files or programdata
  "C:/ProgramData/nvm/v20.18.0/node_modules/npm/bin/npm-cli.js",
  "C:/ProgramData/nvm/v22.11.0/node_modules/npm/bin/npm-cli.js",
  "C:/ProgramData/nvm/v22.21.1/node_modules/npm/bin/npm-cli.js",
  "C:/Users/Administrator/AppData/Roaming/nvm/v20.18.0/node_modules/npm/bin/npm-cli.js",
  "C:/Users/Administrator/AppData/Roaming/nvm/v22.11.0/node_modules/npm/bin/npm-cli.js",
  // volta, fnm
  "C:/Users/Administrator/.volta/tools/image/node/22.21.1/node_modules/npm/bin/npm-cli.js",
  "C:/Users/Administrator/.fnm/node-versions/v22.21.1/installation/node_modules/npm/bin/npm-cli.js",
  // scoop
  "C:/Users/Administrator/scoop/apps/nodejs/current/node_modules/npm/bin/npm-cli.js",
  "C:/ProgramData/scoop/apps/nodejs/current/node_modules/npm/bin/npm-cli.js",
];
w("SCAN candidates:");
let foundNpm = null;
let foundNode = null;
for (const c of candidates) {
  if (exists(c)) {
    foundNpm = c;
    w("  HIT npm " + c);
    const npmBin = path.dirname(c);
    const node1 = path.resolve(npmBin, "../../../../node.exe");
    if (exists(node1)) foundNode = node1;
    else {
      const node2 = path.resolve(npmBin, "../../../../../node.exe");
      if (exists(node2)) foundNode = node2;
    }
    break;
  }
}
if (!foundNpm) {
  w("  none found, scan more...");
  // scan system PATH-like dirs
  const searchDirs = [
    "C:/Users/Administrator/AppData/Roaming",
    "C:/ProgramData",
    "C:/Users/Administrator/scoop/apps",
  ];
  for (const base of searchDirs) {
    try {
      const dirs = fs.readdirSync(base, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => path.join(base, d.name));
      for (const d of dirs) {
        try {
          const sub = fs.readdirSync(d, { withFileTypes: true }).filter(x => x.isDirectory()).map(x => path.join(d, x.name));
          for (const s of sub) {
            const p = path.join(s, "node_modules/npm/bin/npm-cli.js");
            if (exists(p)) { foundNpm = p; w("  HIT npm deep " + p); break; }
          }
          if (foundNpm) break;
        } catch {}
      }
      if (foundNpm) break;
    } catch {}
  }
}
w("NPM=" + (foundNpm || "NOT_FOUND"));
w("NODE=" + (foundNode || "NOT_FOUND"));

// Also search C drive for node.exe via a shallow scan (in case a prior build terminal had it in PATH)
if (!foundNode) {
  const nodePlaces = [
    "C:/Program Files/nodejs/node.exe",
    "C:/Program Files (x86)/nodejs/node.exe",
    "D:/nodejs/node.exe",
    "C:/Users/Administrator/scoop/apps/nodejs/current/node.exe",
    "C:/ProgramData/scoop/apps/nodejs/current/node.exe",
    "C:/Users/Administrator/.volta/tools/image/node/22.21.1/node.exe",
  ];
  for (const p of nodePlaces) { if (exists(p)) { foundNode = p; w("  HIT node " + p); break; } }
}
w("FINAL_NODE=" + (foundNode || "NOT_FOUND"));

// Now run dev with the found node/npm
if (foundNpm) {
  const cwd = "C:/Users/Administrator/AppData/Roaming/TRAE SOLO CN/ModularData/ai-agent/work-mode-projects/6a8d472e65d805740da887da/lulu";
  const node = foundNode || process.execPath;
  const { spawn, spawnSync } = require("child_process");
  if (!exists(path.join(cwd, "node_modules"))) {
    w("RUN install with " + node);
    const r = spawnSync(node, [foundNpm, "install", "--no-audit", "--no-fund"], {
      cwd, encoding: "utf-8", timeout: 600000, maxBuffer: 10*1024*1024,
    });
    w("install status=" + r.status);
    if (r.stdout) w("out:" + r.stdout.slice(-1000));
    if (r.stderr) w("err:" + r.stderr.slice(-1000));
  }
  w("START dev server");
  const child = spawn(node, [foundNpm, "run", "dev", "--", "--host", "0.0.0.0"], { cwd });
  child.stdout.on("data", d => w("OUT:" + String(d).replace(/\r/g,'').slice(0,2000)));
  child.stderr.on("data", d => w("ERR:" + String(d).replace(/\r/g,'').slice(0,2000)));
  child.on("error", e => w("CHILD_ERR:" + e.message));
  child.on("exit", c => w("CHILD_EXIT:" + c));
  setInterval(() => {}, 60000);
}
w("DONE");
