# 🚀 Quick Start Guide - CREZCO

This guide will help you get the CREZCO crowdfunding platform up and running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **Git**

## Step-by-Step Installation

### 1. Navigate to the Project Directory

\`\`\`powershell
cd crezco-app
\`\`\`

### 2. Install Dependencies

Install all required packages:

\`\`\`powershell
npm install
\`\`\`

This will install all dependencies listed in `package.json`, including:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Zustand
- React Query
- Clerk (authentication)
- Stripe
- Socket.io
- And many more...

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`powershell
copy .env.example .env.local
\`\`\`

Open `.env.local` and configure the following variables:

#### Required Variables:

\`\`\`env
# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001

# Clerk Authentication (Get from https://clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Stripe (Get from https://stripe.com)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
\`\`\`

#### Optional Variables:

\`\`\`env
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Cloudinary (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
\`\`\`

### 4. Set Up External Services

#### Clerk (Authentication)

1. Go to [clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Copy the publishable and secret keys
4. Paste them in your `.env.local` file
5. Configure social login providers (Google, Instagram, TikTok) in Clerk dashboard

#### Stripe (Payments)

1. Go to [stripe.com](https://stripe.com) and create an account
2. Get your test API keys from the dashboard
3. Paste them in your `.env.local` file
4. For webhooks:
   - Install Stripe CLI: `npm install -g stripe`
   - Run: `stripe login`
   - Forward events: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
   - Copy the webhook secret to `.env.local`

### 5. Run the Development Server

Start the Next.js development server:

\`\`\`powershell
npm run dev
\`\`\`

The application will be available at:
- **Frontend**: [http://localhost:3000](http://localhost:3000)

You should see the homepage with the hero section "Apoya a los que están empezando".

### 6. (Optional) Set Up Backend API

For a full-featured application, you'll need a backend API. You can:

#### Option A: Use Mock Data (Quick Start)
The app is configured to use mock data by default for development. No additional setup needed.

#### Option B: Connect to a Real Backend
1. Set up a backend server (Node.js + Express, Django, etc.)
2. Update `NEXT_PUBLIC_API_URL` in `.env.local`
3. Ensure CORS is configured on your backend

#### Option C: Use Next.js API Routes
Create API routes in `src/app/api/` directory:

\`\`\`powershell
# Example structure
src/app/api/
  ├── projects/
  │   ├── route.ts
  │   └── [id]/route.ts
  ├── donations/
  │   └── route.ts
  └── webhooks/
      └── stripe/route.ts
\`\`\`

### 7. (Optional) Set Up Socket.io Server

For real-time notifications, set up a Socket.io server:

1. Create a new file `server.js` in the root:

\`\`\`javascript
const { createServer } = require('http');
const { Server } = require('socket.io');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('join-project', ({ projectId }) => {
      socket.join(`project-${projectId}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  const PORT = 3001;
  server.listen(PORT, () => {
    console.log(`> Socket.io server on http://localhost:${PORT}`);
  });
});
\`\`\`

2. Run it: `node server.js`

## 🧪 Running Tests

### Unit Tests (Jest + React Testing Library)

\`\`\`powershell
# Run tests in watch mode
npm run test

# Run tests once (CI mode)
npm run test:ci
\`\`\`

### E2E Tests (Cypress)

\`\`\`powershell
# Open Cypress UI
npm run test:e2e

# Run Cypress headless
npm run test:e2e:headless
\`\`\`

## 🏗️ Building for Production

\`\`\`powershell
# Build the application
npm run build

# Start production server
npm run start
\`\`\`

## 🎨 Project Structure Overview

\`\`\`
crezco-app/
├── src/
│   ├── app/              # Next.js 14 App Router
│   │   ├── layout.tsx   # Root layout
│   │   ├── page.tsx     # Homepage
│   │   └── globals.css  # Global styles
│   ├── components/       # Reusable components
│   │   ├── ui/          # Shadcn UI components
│   │   └── layout/      # Header, Footer
│   ├── lib/             # Utilities
│   │   ├── api.ts       # API client
│   │   ├── socket.ts    # Socket.io client
│   │   ├── utils.ts     # Helper functions
│   │   └── constants.ts # Constants
│   ├── store/           # Zustand stores
│   └── types/           # TypeScript types
├── public/              # Static assets
├── tests/               # Test files
└── Configuration files
\`\`\`

## 📱 Testing PWA Features

To test PWA functionality:

1. Build the production version: `npm run build`
2. Start production server: `npm run start`
3. Open Chrome DevTools > Application > Service Workers
4. Check "Update on reload" and reload the page
5. Test offline mode by toggling "Offline" in Network tab

## 🎯 Next Steps

After successful installation:

1. **Customize Branding**: Update colors, logo, and text in:
   - `tailwind.config.ts` (colors)
   - `src/lib/constants.ts` (text, links)
   - `public/` (logos, icons)

2. **Add More Pages**: Create additional routes in `src/app/`

3. **Connect Backend**: Implement API routes or connect to external API

4. **Deploy**: Deploy to Vercel, Netlify, or your preferred platform

## 🐛 Troubleshooting

### Port Already in Use

If port 3000 is already in use:
\`\`\`powershell
# Run on different port
$env:PORT=3001; npm run dev
\`\`\`

### Module Not Found Errors

\`\`\`powershell
# Clear cache and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
\`\`\`

### TypeScript Errors

\`\`\`powershell
# Check types
npm run type-check
\`\`\`

### Build Errors

\`\`\`powershell
# Clear Next.js cache
Remove-Item -Recurse -Force .next
npm run build
\`\`\`

## 📚 Additional Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Shadcn/UI**: https://ui.shadcn.com
- **Clerk**: https://clerk.com/docs
- **Stripe**: https://stripe.com/docs

## 💬 Need Help?

- Check the full README.md for detailed documentation
- Review example components in `src/components/`
- Check test files in `tests/` for usage examples

---

**You're all set! 🎉** Start building amazing crowdfunding experiences with CREZCO!
