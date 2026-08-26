const fs = require("fs");
const path = require("path");
const https = require("https");
const { execFileSync, spawn, spawnSync } = require("child_process");

const LOG = "C:/Users/Administrator/AppData/Local/Temp/dev-log.txt";
try { fs.unlinkSync(LOG); } catch {}
function w(s) { try { fs.appendFileSync(LOG, Date().slice(16,24) + " " + String(s) + "\r\n", "utf8"); } catch {} }

const CWD = "C:/Users/Administrator/AppData/Roaming/TRAE SOLO CN/ModularData/ai-agent/work-mode-projects/6a8d472e65d805740da887da/lulu";
const TMP = "C:/Users/Administrator/AppData/Local/Temp/trae-npm";

w("node=" + process.version);

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const get = (u, redir) => {
      https.get(u, res => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          get(res.headers.location, redir + 1);
          return;
        }
        if (res.statusCode !== 200) { reject(new Error("HTTP " + res.statusCode + " for " + u)); return; }
        res.pipe(file);
        file.on("finish", () => { file.close(() => resolve()); });
      }).on("error", reject);
    };
    get(url, 0);
  });
}

async function main() {
  // 1. Download npm tarball
  const tarball = path.join(TMP, "npm.tgz");
  try { fs.mkdirSync(TMP, { recursive: true }); } catch {}
  
  if (!fs.existsSync(path.join(TMP, "npm", "bin", "npm-cli.js"))) {
    w("Downloading npm from registry...");
    // Get latest npm tarball URL
    await new Promise((resolve, reject) => {
      https.get("https://registry.npmjs.org/npm/latest", res => {
        let data = "";
        res.on("data", d => data += d);
        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            w("npm version: " + json.version);
            resolve(json.dist.tarball);
          } catch (e) { reject(e); }
        });
      }).on("error", reject);
    }).then(async (tarballUrl) => {
      w("tarball: " + tarballUrl);
      await download(tarballUrl, tarball);
      w("downloaded npm tarball");
      
      // Extract using tar (built into Windows 10+ as `tar.exe`)
      try {
        execFileSync("tar", ["-xzf", tarball, "-C", TMP], { encoding: "utf-8" });
        w("extracted npm");
      } catch (e) {
        w("tar failed: " + e.message);
      }
    });
  } else {
    w("npm already extracted");
  }
  
  const npmCli = path.join(TMP, "package", "bin", "npm-cli.js");
  if (!fs.existsSync(npmCli)) {
    w("FATAL: npm-cli.js not found at " + npmCli);
    w("TMP contents:");
    try { fs.readdirSync(TMP).forEach(f => w("  " + f)); } catch {}
    process.exit(1);
  }
  w("npm-cli.js found: " + npmCli);
  
  // 2. Install project deps if needed
  if (!fs.existsSync(path.join(CWD, "node_modules"))) {
    w("Running npm install...");
    const r = spawnSync(process.execPath, [npmCli, "install", "--no-audit", "--no-fund", "--legacy-peer-deps"], {
      cwd: CWD, encoding: "utf-8", timeout: 600000, maxBuffer: 50 * 1024 * 1024,
    });
    w("install status=" + r.status);
    if (r.stdout) w("stdout tail: " + r.stdout.slice(-2000));
    if (r.stderr) w("stderr tail: " + r.stderr.slice(-2000));
  } else {
    w("node_modules exists, skipping install");
  }
  
  // 3. Start dev server
  w("Starting dev server...");
  const child = spawn(process.execPath, [npmCli, "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"], {
    cwd: CWD,
    stdio: ["ignore", "pipe", "pipe"],
  });
  child.stdout.on("data", d => w("OUT: " + d.toString().replace(/\r/g, "").slice(0, 3000)));
  child.stderr.on("data", d => w("ERR: " + d.toString().replace(/\r/g, "").slice(0, 3000)));
  child.on("error", e => w("CHILD_ERR: " + e.message));
  child.on("exit", c => w("CHILD_EXIT: " + c));
  
  // Keep alive
  setInterval(() => {}, 60000);
  w("Server started, keeping alive...");
}

main().catch(e => { w("FATAL: " + e.message + "\n" + e.stack); process.exit(1); });
