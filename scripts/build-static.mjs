#!/usr/bin/env node
/**
 * Builds the Hostinger-ready static export of Mountiva.
 *
 * Next.js `output: 'export'` cannot coexist with middleware or non-GET
 * route handlers, so this script temporarily moves src/middleware.ts and
 * src/app/api out of the way, builds with NEXT_PUBLIC_STATIC_EXPORT=1
 * (see next.config.mjs, src/i18n/routing.ts, src/lib/endpoints.ts), then
 * always restores them — success or failure — so the normal `npm run dev`
 * / `npm run build` (Vercel) path is untouched afterwards.
 *
 * Output: dist-static/  (upload its contents to your Hostinger public_html)
 * Also produces mountiva-static-hostinger.zip at the project root.
 *
 * Usage: npm run build:static
 */
import { existsSync, mkdirSync, readdirSync, renameSync, rmSync, writeFileSync, cpSync } from 'node:fs';
import { execFileSync, execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const backupDir = path.join(root, '.static-backup');
const middlewareSrc = path.join(root, 'src', 'middleware.ts');
const middlewareBak = path.join(backupDir, 'middleware.ts');
const apiSrc = path.join(root, 'src', 'app', 'api');
const apiBak = path.join(backupDir, 'api');
const outDir = path.join(root, 'out');
const distDir = path.join(root, 'dist-static');
const zipPath = path.join(root, 'mountiva-static-hostinger.zip');

function moveAside() {
  mkdirSync(backupDir, { recursive: true });
  if (existsSync(middlewareSrc)) renameSync(middlewareSrc, middlewareBak);
  if (existsSync(apiSrc)) renameSync(apiSrc, apiBak);
}

function restore() {
  if (existsSync(middlewareBak)) renameSync(middlewareBak, middlewareSrc);
  if (existsSync(apiBak)) renameSync(apiBak, apiSrc);
  rmSync(backupDir, { recursive: true, force: true });
}

function writeRootRedirect() {
  // No middleware in this build, so "/" needs a real file. Every locale is
  // a real prefixed folder (localePrefix: 'always'); send "/" to English.
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=/en/">
<link rel="canonical" href="/en/">
<title>Mountiva</title>
</head>
<body>
<p>Redirecting to <a href="/en/">mountivawater.com/en/</a>&hellip;</p>
<script>location.replace('/en/');</script>
</body>
</html>
`;
  writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
}

console.log('[build-static] moving middleware + API routes aside…');
moveAside();

let buildFailed = false;
try {
  console.log('[build-static] running next build (NEXT_PUBLIC_STATIC_EXPORT=1)…');
  execFileSync('npx', ['next', 'build'], {
    cwd: root,
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, NEXT_PUBLIC_STATIC_EXPORT: '1' }
  });
} catch (err) {
  buildFailed = true;
  console.error('[build-static] next build failed:', err.message);
} finally {
  console.log('[build-static] restoring middleware + API routes…');
  restore();
}

if (buildFailed) {
  process.exit(1);
}

if (!existsSync(outDir)) {
  console.error('[build-static] expected an out/ directory from next build, none found.');
  process.exit(1);
}

writeRootRedirect();

rmSync(distDir, { recursive: true, force: true });
cpSync(outDir, distDir, { recursive: true });
rmSync(outDir, { recursive: true, force: true });

// Windows/PowerShell occasionally leaves a stray empty "<name>;C" sibling
// directory alongside a copied folder during this build (observed for
// "php;C" next to "php") — harmless (always empty) but untidy in the zip.
for (const entry of readdirSync(distDir, { withFileTypes: true })) {
  if (entry.isDirectory() && entry.name.includes(';')) {
    const strayPath = path.join(distDir, entry.name);
    if (readdirSync(strayPath).length === 0) {
      rmSync(strayPath, { recursive: true, force: true });
      console.log(`[build-static] removed stray empty directory: ${entry.name}`);
    }
  }
}

console.log(`[build-static] static site ready at ${path.relative(root, distDir)}/`);

try {
  rmSync(zipPath, { force: true });
  execSync(
    `powershell.exe -NoProfile -Command "Compress-Archive -Path '${distDir}\\*' -DestinationPath '${zipPath}' -Force"`,
    { stdio: 'inherit' }
  );
  console.log(`[build-static] zipped: ${path.relative(root, zipPath)}`);
} catch (err) {
  console.warn('[build-static] could not zip automatically (Compress-Archive unavailable):', err.message);
  console.warn(`[build-static] upload the ${path.relative(root, distDir)}/ folder contents directly instead.`);
}

console.log('\nNext steps:');
console.log('  1. In Hostinger hPanel, edit public/php/_mailer.php constants if needed');
console.log('     (FROM_ADDRESS should be a real mailbox on your domain).');
console.log('  2. Upload every file inside dist-static/ (or the zip, extracted) to');
console.log('     public_html/ via File Manager or FTP — same as your other sites.');
console.log('  3. Visit your domain: "/" redirects to "/en/"; "/ur/" and "/ar/" work directly.');
