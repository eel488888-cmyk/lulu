const fs = require("fs");
const path = require("path");
process.stdout.write("NODE_VERSION=" + process.version + "\n");
process.stdout.write("EXEC_PATH=" + process.execPath + "\n");

function fileExists(p) { try { return fs.existsSync(p); } catch { return false; } }

const roots = [
  path.resolve(process.execPath, "..", "resources", "app"),
  path.resolve(process.execPath, "..", "resources", "app.asar.unpacked"),
  "D:/trae/TRAE SOLO CN/resources/app",
];

const candidates = [];
for (const r of roots) {
  candidates.push(path.join(r, "node_modules", "npm", "bin", "npm-cli.js"));
  candidates.push(path.join(r, "node_modules", ".bin", "npm.cmd"));
  candidates.push(path.join(r, "out", "node_modules", "npm", "bin", "npm-cli.js"));
}
// Also list node_modules dirs
for (const r of roots) {
  const nm = path.join(r, "node_modules");
  if (fileExists(nm)) {
    try {
      const items = fs.readdirSync(nm).slice(0, 30).join(",");
      process.stdout.write("NM_DIR " + nm + " => " + items + "\n");
    } catch (e) {
      process.stdout.write("ERR " + nm + ": " + e.message + "\n");
    }
  }
}
for (const c of candidates) {
  process.stdout.write("CANDIDATE " + c + " exists=" + fileExists(c) + "\n");
}
