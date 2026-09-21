// Pós-processo do build: gera uma página estática por título
// (dist/titulo/<id>/index.html) com meta tags Open Graph/Twitter próprias
// — imagem, título e descrição do título específico — para que links
// compartilhados mostrem uma prévia correta em redes sociais. Crawlers
// (Facebook, X, WhatsApp, Discord…) não executam JS, então essas tags
// precisam existir no HTML estático; o restante do arquivo é idêntico ao
// index.html normal, então visitantes reais carregam o app por completo.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const catalogSrc = readFileSync(path.join(root, "src/data/catalog.ts"), "utf8");
const template = readFileSync(path.join(distDir, "index.html"), "utf8");

const SITE_URL = "https://amarildo-correa.github.io/claude-code";

// Extrai id/name/tagline de cada entrada do catálogo. Os três campos
// aparecem nessa ordem, uma vez por título, então casar as três listas
// posicionalmente reconstrói cada entrada sem precisar transpilar o TS.
const ids = [...catalogSrc.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);
const names = [...catalogSrc.matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1]);
const taglines = [...catalogSrc.matchAll(/tagline:\s*"([^"]+)"/g)].map((m) => m[1]);

if (ids.length === 0 || ids.length !== names.length || ids.length !== taglines.length) {
  throw new Error(
    `prerender: não consegui extrair o catálogo corretamente (ids=${ids.length}, names=${names.length}, taglines=${taglines.length})`,
  );
}

function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function backdropUrl(id) {
  return `https://picsum.photos/seed/nova-${id}-backdrop/1600/900`;
}

let count = 0;
for (let i = 0; i < ids.length; i++) {
  const id = ids[i];
  const name = names[i];
  const tagline = taglines[i];
  const url = `${SITE_URL}/titulo/${id}/`;
  const title = `${name} — Nova`;
  const image = backdropUrl(id);

  const ogBlock = `<!-- OG:START -->
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="video.other" />
    <meta property="og:site_name" content="Nova" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(tagline)}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1600" />
    <meta property="og:image:height" content="900" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(tagline)}" />
    <meta name="twitter:image" content="${image}" />
    <!-- OG:END -->`;

  const html = template
    .replace(/<!-- OG:START -->[\s\S]*?<!-- OG:END -->/, ogBlock)
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeHtml(tagline)}" />`);

  const outDir = path.join(distDir, "titulo", id);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(path.join(outDir, "index.html"), html);
  count++;
}

console.log(`prerender: ${count} páginas de título geradas em dist/titulo/<id>/index.html`);
