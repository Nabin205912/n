# Sathi Printing Press — Full Business System

Professional bilingual-ready printing website for **Sathi Printing Press**, Dhangadhi, Buspark, Kailali, Sudurpaschim Province, Nepal.

## Working features
- Professional home UI and service gallery
- Visiting Card, ID Card, Books & Theses, Bill Books, Labels, Theli/Packaging, Banner/Flex
- Self Ink Stamp, T-Shirt Printing, Badge Printing, Offset Printing
- Election-related printing services section
- Customer online order form with file uploads
- Automatic unique Order ID on every submitted order
- Public Order Tracking by Order ID (and optional phone verification)
- Admin Login with protected server-side session
- Admin Accept / Reject / Delete / Status Update for orders
- Admin promotion/gallery upload to GitHub repository
- Custom website buttons: add, rename, remove, link, icon, style, show/hide, new tab
- Contact/support form stored in GitHub data
- GitHub-backed runtime storage under `data/` and `uploads/`

## Admin credentials
Set in server environment only (never browser code):
`ADMIN_EMAIL=sathiprintingpress@gmail.com`
`ADMIN_PASSWORD=Nabinchand`
`ADMIN_SESSION_SECRET=<long random secret>`

Change the password after first production login.

## GitHub storage
Configure `GITHUB_OWNER`, `GITHUB_REPO`, `GITHUB_BRANCH`, and a fine-grained `GITHUB_TOKEN` with repository contents read/write permission. The token must stay on the server (Vercel environment variables).

## Deployment
GitHub Pages can show the static `index.html`, but the full working order/admin/GitHub-storage system requires the Next.js app on Vercel or another Node host.
