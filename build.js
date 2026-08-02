/* Build: template.js -> index.html  +  template.js inlined into admin.html */
const fs = require("fs");
const path = require("path");
const dir = __dirname;

const tpl = fs.readFileSync(path.join(dir, "template.js"), "utf8");

// 1. index.html
const { renderSite, defaultContent } = require("./template.js");
fs.writeFileSync(path.join(dir, "index.html"), renderSite(defaultContent));

// 2. admin.html — inline the exact same template source
const inline = tpl
  .replace(/if \(typeof module[\s\S]*$/, "") // drop the CommonJS export
  .replace(/<\/script>/g, "<\\/script>");    // belt and braces

const admin = fs
  .readFileSync(path.join(dir, "admin.src.html"), "utf8")
  .replace("/*__TEMPLATE_JS__*/", inline);

if (admin.indexOf("__TEMPLATE_JS__") !== -1) throw new Error("marker not replaced");
fs.writeFileSync(path.join(dir, "admin.html"), admin);

console.log("index.html", fs.statSync(path.join(dir, "index.html")).size, "bytes");
console.log("admin.html", fs.statSync(path.join(dir, "admin.html")).size, "bytes");
