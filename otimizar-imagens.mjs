/* Converte PNG/JPG para WebP e limita a largura. Uso: npm run imagens [pasta] */
import sharp from "sharp";
import { readdir } from "node:fs/promises";
import { join, extname, basename } from "node:path";

const pasta = process.argv[2] || "imagens";
for (const arq of await readdir(pasta)) {
    const ext = extname(arq).toLowerCase();
    if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;
    const saida = join(pasta, basename(arq, ext) + ".webp");
    const info = await sharp(join(pasta, arq)).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(saida);
    console.log(`${arq} -> ${saida} (${(info.size / 1024).toFixed(1)} KB)`);
}
