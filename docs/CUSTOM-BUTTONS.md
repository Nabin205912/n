# Custom website buttons

Admins can add unlimited custom buttons from the Admin Dashboard:
- Add/remove
- Rename label
- Set URL (internal `#section` or external `https://...`)
- Choose style
- Choose icon
- Open same tab/new tab
- Enable/disable

The Next.js version stores `data/custom-buttons.json` in the configured GitHub repository when the admin clicks Save Buttons.

The static GitHub Pages admin preview uses browser localStorage because GitHub Pages cannot securely write to GitHub. For persistent GitHub storage, deploy the Next.js server and configure `.env` with GitHub credentials.
