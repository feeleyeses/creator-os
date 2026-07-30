# Creator OS Deployment

Creator OS is deployed as a plain static site through GitHub Pages.

## Entry Files

The deployed site uses standard static entry files:

- `index.html`
- `style.css`
- `script.js`
- `content/current.json`
- supplemental `creator-*.js` and `creator-*.css` files

`.nojekyll` is included so GitHub Pages serves the static files directly.

## GitHub Pages Setup

Workflow: `.github/workflows/deploy-pages.yml`

The workflow runs only from `main` and uses the official GitHub Pages actions:

- `actions/configure-pages`
- `actions/upload-pages-artifact`
- `actions/deploy-pages`

Repository settings still need Pages enabled for GitHub Actions deployment if it is not already configured.

Expected project URL after setup:

`https://feeleyeses.github.io/creator-os/`

The app uses relative paths such as `content/current.json`, so it works from a project-site base path and does not assume domain-root hosting.

## Manual Deployment

Run the `Deploy Pages` workflow with `workflow_dispatch` from the Actions tab.

## Mobile Access

Desktop and mobile load the same deployed URL and the same `content/current.json`. User Library data is separate per browser because it remains in `localStorage`.

## Failure Recovery

If deployment fails, fix the static files or workflow, then rerun `Deploy Pages`. Content validation is handled by the daily content workflow before content changes are committed.
