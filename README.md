# Data Science Club strategist manifesto

Nde Dilan (Nde Hurich Dilan, @techwithdilan), candidate for CMU-Africa Data Science Club strategist, 2026–2027.

The website is a single self-contained `index.html`. Open it directly in a browser to read the manifesto. All styling and client-side behaviour are included in that file.

The page connects the candidate's GDG on Campus leadership, LinguoNER research, Nerala product experience, and Zindi involvement to four strategic priorities. The annual programme is a proposal to develop with the president and committee. Research, product, and portfolio links let readers explore the work behind the campaign.

## Deploy from the command line

Requires Node.js 22 or later and a Cloudflare account.

```powershell
npm install
npx wrangler login
npm run deploy
```

Wrangler opens Cloudflare's browser sign-in. After authorisation, deployment publishes the site to the `workers.dev` address printed in the terminal. No custom domain is required for this first deployment. Confirm the intended Cloudflare account when prompted.

`npm run build` copies only the public page into `dist/`; Cloudflare serves that directory. Edit the root `index.html`, then deploy again to publish changes.

On Windows, if PowerShell blocks npm's script wrapper, use `npm.cmd` and `npx.cmd` for the commands above.

## Connect an owned domain or subdomain

For a hostname such as `ds.your-domain.com`, its parent domain must already be an active zone in the same Cloudflare account. Substitute your actual hostname:

```powershell
npm run domain -- ds.your-domain.com
npm run deploy
```

The first command adds a Custom Domain route to `wrangler.jsonc`. The second deploys it; Cloudflare manages the DNS record and HTTPS certificate. This connects an existing domain and does not purchase or register a new domain. Existing hostname conflicts must be reviewed before deployment; these scripts do not delete existing DNS records.

Keep `wrangler.jsonc` as valid JSON so the domain helper can update it. If your Cloudflare login has multiple accounts, set the intended `account_id` in that configuration or set the `CLOUDFLARE_ACCOUNT_ID` environment variable before deploying.

## Push to GitHub

The intended repository is `https://github.com/Nde-Dilan/ds.git`.

For a fresh checkout of this folder, if Git is not yet initialised:

```powershell
git init -b main
git add index.html README.md .gitignore .gitattributes package.json wrangler.jsonc scripts
git commit -m "Add strategist manifesto and Cloudflare deployment setup"
git remote add origin https://github.com/Nde-Dilan/ds.git
git push -u origin main
```

If the repository and remote are already configured, run only `git push -u origin main`. GitHub may prompt for sign-in. When `npm install` creates `package-lock.json`, commit it along with subsequent changes.

Pushing to GitHub stores the source. Publishing updates from your computer still requires `npm run deploy`; automatic deployments can be configured separately through Cloudflare's Git integration.

## Local Cloudflare preview

```powershell
npm run dev
```

Restart this command after editing `index.html` to rebuild the preview copy.

## References

- [Deploy static assets on Workers](https://developers.cloudflare.com/workers/static-assets/get-started/)
- [Configure Workers Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)

This is an independent student campaign page.
