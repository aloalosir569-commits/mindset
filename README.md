# Mindset Reset Press: e-book store website

A complete multi-page static website for **Mindset Reset Press**: a library of 12 mindset e-books (flagship: **The Calm Execution Playbook**) with a catalog, a page for every e-book, an order form, FAQ, contact, SMS & WhatsApp opt-in page and full legal pages. It is plain HTML, CSS and a little vanilla JavaScript. There is no build step, no framework, no tracking and no external requests.

```
mindset-ebook/
├── index.html                 Home (featured e-books, topics, how it works)
├── books.html                 Library: topic filters + search
├── ebook-<name>.html          One page per e-book (12 pages)
├── order.html                 Order request form (choose the e-book)
├── about.html                 About the publisher and company details
├── faq.html                   Questions and answers
├── sms-whatsapp.html          SMS & WhatsApp Notifications / opt-in page
├── contact.html               Contact details and message form
├── privacy.html               Privacy Policy
├── terms.html                 Terms of Service
├── refunds.html               Delivery & Refund Policy
├── 404.html                   Not-found page
├── css/styles.css             All styling
├── js/main.js                 Menu, library filters, email-based forms
├── assets/favicon.svg
├── sitemap.xml, robots.txt
└── _headers                   Security headers (Cloudflare Pages reads this file)
```

## IMPORTANT: the catalog is a starter draft

The 12 e-book titles, descriptions, topics and prices were written as a starting catalog. Before you launch:

- **Only list e-books that really exist** and that you can deliver. Customers pay for them, and Twilio and WhatsApp reviewers compare your site with your actual business.
- **Check each title** for conflicts with existing books or trademarks, and change any you do not want.
- **Set your real prices** and descriptions.
- To **remove or rename a title**, edit its `ebook-<name>.html` page and delete or edit its card in `books.html` and `index.html`, and its entry in the e-book dropdown in `order.html`. If you want, send me the real list and I will regenerate the whole catalog consistently.

## How the forms work

The site has no server, so the forms (Order, Contact and the opt-in form on the SMS & WhatsApp page) build a prefilled email. When a visitor presses the button, their email app opens with the message ready, and it reaches you when they press Send. If they ticked the messaging box, the email records "SMS/WhatsApp consent: YES", the date and time, the page, and the exact consent wording. The order email also includes the e-book they chose.

To take real payments, add a payment link (Stripe Payment Links, Gumroad, Lemon Squeezy and similar) per e-book: in each `ebook-<name>.html` page, change the **Order this e-book** button `href` to your payment link. Keep the consent checkbox wording wherever you collect phone numbers.

## Preview locally

```bash
cd mindset-ebook
python3 -m http.server 8080
# open http://localhost:8080
```

## Customize business details

Use find-and-replace across all `.html` files (and `js/main.js` for the email) and keep every value identical everywhere, because reviewers compare your site with your application.

| What | Current value |
|---|---|
| Brand / publisher | Mindset Reset Press |
| Flagship e-book | The Calm Execution Playbook |
| Tagline | Practical Mindset Frameworks for Daily Focus, Emotional Clarity & Steady Execution |
| Live URL | https://mindset-ebook.pages.dev |
| Support email | support@mindset-ebook.pages.dev (also set in `js/main.js` as `SUPPORT`) |
| Support phone | +1 (302) 230-6641 (`tel:+13022306641`) |
| Address | 548 Market St, Suite 78210, San Francisco, CA 94104, USA |

Also review so the site matches your real business:

- **Refunds:** `refunds.html` says refund requests are reviewed individually. Replace it with your real policy (for example, a number of days).
- **Reply time:** `contact.html` says "within two business days". Change it if that is not true.
- **Message frequency:** "about one to four messages per order or inquiry" appears on the SMS page, FAQ and Privacy Policy. Keep it accurate.
- **Dates:** "Last updated" on the legal pages (November 24, 2026). Update it when you change them.
- **Colors:** the CSS variables at the top of `css/styles.css`.

If you change the Content-Security-Policy in `_headers`, remember that inline scripts and inline `style` attributes are blocked by default.

## Before you submit to Twilio / WhatsApp

The site shows what reviewers look for: a clear business identity, an opt-in page with the required disclosures, sample messages, working HELP and STOP instructions, and Privacy and Terms pages saying phone numbers and opt-in data are never sold, rented or shared for marketing. It cannot guarantee approval. Check these first:

1. **Phone number:** `+1 (302) 230-6641` must be a number you control that can receive calls and texts. Reviewers may call or test it, and the HELP reply tells customers to call it.
2. **Email address:** `support@mindset-ebook.pages.dev` cannot receive mail because you do not control mail for the `pages.dev` domain. Add a custom domain to your Pages project, set up mail for it (for example Cloudflare Email Routing), then update the email in every file and in `js/main.js`.
3. **Address:** use a real business address that matches your registration documents.
4. **Real products:** only publish e-books you can actually deliver (see above).
5. **Be able to prove opt-in:** keep the emails you receive from the forms (they include the consent record), or screenshots of your real checkout showing an unchecked consent box with the same wording.
6. **Send only what you describe:** order, delivery and support messages. No promotions.

## Deploy to Cloudflare Pages with Direct Upload

1. Sign in at https://dash.cloudflare.com and open **Workers & Pages**.
2. Click **Create** (or **Create application**), choose the **Pages** tab, then **Upload assets**.
3. Name the project **`mindset-ebook`**. The name sets your URL (`https://mindset-ebook.pages.dev`). If the name is taken, pick another and update the URL in the pages.
4. Click **Create project**.
5. Drag in the **contents of the `mindset-ebook` folder** (or the zip). `index.html` and the `css`, `js` and `assets` folders must be at the top level, and the `_headers` file must be included.
6. Click **Deploy site**, then open the URL and click through the library, an e-book page, the order page and the legal pages on desktop and on your phone.

Dashboard labels change from time to time, so look for the Pages and "Upload assets" options if wording differs.

To update later: open the project, choose **Create deployment**, and upload the updated folder.

Command-line alternative:

```bash
npx wrangler login
npx wrangler pages deploy mindset-ebook --project-name mindset-ebook
```
