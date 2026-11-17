import { copyFile, mkdir, readdir } from 'node:fs/promises';

const output = new URL('../dist/', import.meta.url);
await mkdir(output, { recursive: true });

// Only the public HTML belongs in the deployment directory.
const unexpected = (await readdir(output)).filter((name) => name !== 'index.html');
if (unexpected.length) {
  throw new Error(`Unexpected files in dist/: ${unexpected.join(', ')}. Review them before deploying.`);
}

await copyFile(new URL('../index.html', import.meta.url), new URL('index.html', output));
console.log('Built dist/index.html. Ready for Cloudflare Workers Static Assets.');
