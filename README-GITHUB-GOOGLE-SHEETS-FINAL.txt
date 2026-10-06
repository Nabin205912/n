SATHI PRINTING PRESS - FINAL GITHUB PAGES + GOOGLE SHEETS SETUP

1. Upload/replace ALL files in this ZIP into the ROOT of the GitHub Pages repository.
2. Keep config.js in the same root as index.html and admin.html.
3. config.js is already connected to the supplied Google Apps Script Web App URL.
4. In Apps Script: Deploy > Manage deployments > Edit > New version > Deploy.
   Execute as: Me
   Who has access: Anyone
5. In Apps Script run setAdminPassword() once if needed. Current password configured in the conversation was Nabinchand.
6. Admin email: sathi.printingpress@gmail.com
7. Hard refresh the GitHub Pages site after upload (Ctrl+Shift+R).

FEATURES CONNECTED:
- Customer order submission -> Google Sheets
- Order tracking -> Apps Script POST, with GET fallback for older deployments
- Admin login -> Apps Script
- Admin order list -> Google Sheets
- Admin status update -> Google Sheets
- Admin accept/reject/delete -> Google Sheets

IMPORTANT:
- Do not open HTML files directly from the ZIP; use the GitHub Pages URL.
- If the site shows "Unexpected token <", the browser received an HTML page instead of JSON. Check the Apps Script deployment access and make sure config.js is the supplied URL.
- Static payment QR codes cannot automatically verify bank payments; payment verification remains an admin action unless a bank/payment API is integrated.
