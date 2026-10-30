# Jegathesh Cinematic Portfolio

A Next.js portfolio with a cinematic landing page, services showcase, Firebase account access, and a demo storefront.

## Features

- Cinematic animated hero and responsive project portfolio
- My Services section
- Shop with six demo products, cart, delivery details and Cashfree sandbox checkout
- Firebase email/password and Google sign-in
- Firestore-backed order history for signed-in customers
- Server-side Cashfree order creation and payment verification

## Local setup

```bash
npm install
npm run dev
```

The Firebase web configuration is the public client configuration from the original portfolio. Enable Email/Password and Google providers in Firebase Authentication, and ensure the deployed hostname is listed under Authentication → Settings → Authorized domains.

## Vercel environment variables

Add these variables to the Vercel project for Preview and Production:

- `CASHFREE_APP_ID` — Cashfree sandbox App ID
- `CASHFREE_SECRET_KEY` — Cashfree sandbox Secret Key

The payment API uses Cashfree sandbox endpoints. Do not use production credentials until the checkout and payment-verification flow has been tested and deliberately switched to production.

The six sample products retain the original demo price of ₹1 each. Replace the demo catalogue and prices before treating the store as a live shop.

## Firestore

Order history writes documents to the `orders` collection with the authenticated Firebase UID. Configure Firestore security rules so a signed-in user can only read their own order documents. Never rely on client-side filtering as the security boundary.
