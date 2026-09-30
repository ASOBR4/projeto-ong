/* Build de produção: bundle + minificação (esbuild e html-minifier-terser). */
import { build } from "esbuild";
import { minify } from "html-minifier-terser";
import { readFile, writeFile, mkdir, cp, rm, readdir, stat } from "node:fs/promises";

const tam = async f => (await stat(f)).size;
const kb = n => (n / 1024).toFixed(2) + " KB";

await rm("dist", { recursive: true, force: true });
await mkdir("dist/html", { recursive: true });

// JS: 7 módulos -> 1 arquivo minificado
await build({ entryPoints: ["js/script.js"], bundle: true, minify: true, format: "esm", outfile: "dist/js/script.js" });
// CSS
await build({ entryPoints: ["css/estilo.css"], minify: true, outfile: "dist/css/estilo.css" });
// HTML
const html = await readFile("html/index.html", "utf8");
await writeFile("dist/html/index.html", await minify(html, {
    collapseWhitespace: true, removeComments: true, minifyCSS: true, minifyJS: true
}));
// Imagens (se existirem)
await cp("imagens", "dist/imagens", { recursive: true }).catch(() => console.warn("Aviso: pasta imagens/ não encontrada."));
// Página raiz que redireciona para a SPA
await writeFile("dist/index.html",
    '<!DOCTYPE html><meta charset="UTF-8"><meta http-equiv="refresh" content="0; url=html/index.html"><a href="html/index.html">Abrir o site</a>');

// Relatório de tamanhos
let jsOrig = 0;
for (const f of await readdir("js")) jsOrig += await tam(`js/${f}`);
const linhas = [
    ["JS (7 módulos → 1 bundle)", jsOrig, await tam("dist/js/script.js")],
    ["CSS", await tam("css/estilo.css"), await tam("dist/css/estilo.css")],
    ["HTML", await tam("html/index.html"), await tam("dist/html/index.html")]
];
let to = 0, tm = 0;
console.log("\nArquivo".padEnd(30), "Original".padStart(12), "Minificado".padStart(12), "Redução".padStart(9));
for (const [nome, o, m] of linhas) {
    to += o; tm += m;
    console.log(nome.padEnd(29), kb(o).padStart(12), kb(m).padStart(12), ((1 - m / o) * 100).toFixed(1).padStart(8) + "%");
}
console.log("TOTAL".padEnd(29), kb(to).padStart(12), kb(tm).padStart(12), ((1 - tm / to) * 100).toFixed(1).padStart(8) + "%");
