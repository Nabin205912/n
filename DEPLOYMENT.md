# Final deployment

1. Push this project to GitHub.
2. Import the repository into Vercel.
3. Add the variables from `.env.example` in Vercel Project Settings → Environment Variables.
4. Keep `GITHUB_TOKEN` server-only. Do not add it to `NEXT_PUBLIC_*` variables.
5. Deploy.
6. Open `/admin/login` and sign in with the configured admin email/password.
7. Customers can submit orders at `/#order` and receive a unique `SPP-...` Order ID. They can track at `/#track`.
8. Admin can accept, reject, delete and update status from `/admin`.

For GitHub Pages, the root `index.html` is provided for static preview only; server APIs cannot run on GitHub Pages.

## Requested admin setup
- Admin email: `sathi.printingpress@gmail.com`
- Initial admin password: `Nabinchand`
- Admin logo: Sathi Printing Press logo is displayed on the login and authorized dashboard.
- Business location: Dhangadhi, Buspark, Kailali (Sudurpaschim Province), Nepal.
