import { readFile, writeFile } from 'node:fs/promises';
import { domainToASCII } from 'node:url';

const args = process.argv.slice(2);
const input = (args[0] ?? '').trim().toLowerCase();
const hostname = domainToASCII(input);
const labels = hostname.split('.');
const validLabel = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;

if (args.length !== 1 || /[\/\\:@?#\s]/.test(input) || hostname.length > 253 || labels.length < 2 ||
    !labels.every((label) => validLabel.test(label)) || /^\d+$/.test(labels.at(-1))) {
  console.error('Usage: npm run domain -- ds.your-domain.com');
  console.error('Enter a bare hostname, without https://, paths, ports, or wildcards.');
  process.exit(1);
}

const configFile = new URL('../wrangler.jsonc', import.meta.url);
const config = JSON.parse(await readFile(configFile, 'utf8'));
config.routes ??= [];

if (config.routes.some((route) => route.pattern === hostname && route.custom_domain === true)) {
  console.log(`${hostname} is already configured.`);
} else {
  config.routes.push({ pattern: hostname, custom_domain: true });
  await writeFile(configFile, JSON.stringify(config, null, 2) + '\n');
  console.log(`Configured ${hostname} in wrangler.jsonc.`);
}

console.log('Run npm run deploy to apply this hostname to Cloudflare.');
console.log('The parent domain must be active in the Cloudflare account used for deployment.');
