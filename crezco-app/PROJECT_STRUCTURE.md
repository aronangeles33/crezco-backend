# CREZCO Project Structure

Complete overview of the CREZCO crowdfunding platform architecture.

## 📁 Root Directory

\`\`\`
crezco-app/
├── public/                    # Static assets served at root URL
├── src/                       # Source code directory
├── tests/                     # Test files
├── .env.example              # Environment variables template
├── .eslintrc.js              # ESLint configuration
├── .gitignore                # Git ignore rules
├── .prettierrc               # Prettier code formatting config
├── cypress.config.ts         # Cypress E2E test configuration
├── jest.config.js            # Jest unit test configuration
├── jest.setup.js             # Jest setup file
├── next.config.js            # Next.js configuration (with PWA)
├── package.json              # Dependencies and scripts
├── postcss.config.js         # PostCSS configuration
├── README.md                 # Main documentation
├── INSTALL.md                # Installation guide
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
\`\`\`

## 📂 /public - Static Assets

\`\`\`
public/
├── icons/                    # PWA icons (72x72 to 512x512)
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   └── icon-512x512.png
├── images/                   # Images (logos, backgrounds, etc.)
│   ├── logo.png
│   ├── og-image.jpg
│   └── hero-bg.jpg
├── screenshots/              # App screenshots for PWA
│   ├── desktop-1.jpg
│   └── mobile-1.jpg
├── favicon.ico
├── apple-touch-icon.png
├── manifest.json             # PWA manifest
└── robots.txt               # SEO robots file
\`\`\`

## 📂 /src - Source Code

### /src/app - Next.js 14 App Router

\`\`\`
src/app/
├── (auth)/                   # Auth route group
│   ├── login/
│   │   └── page.tsx         # Login page
│   └── signup/
│       └── page.tsx         # Signup page
├── about/
│   └── page.tsx             # About page
├── create/
│   └── page.tsx             # Create project page
├── dashboard/
│   └── page.tsx             # User dashboard
├── donate/
│   └── [projectId]/
│       └── page.tsx         # Donation page
├── privacy/
│   └── page.tsx             # Privacy policy
├── projects/
│   ├── page.tsx             # Projects listing
│   └── [id]/
│       └── page.tsx         # Project detail page
├── terms/
│   └── page.tsx             # Terms of service
├── error.tsx                # Error boundary
├── globals.css              # Global styles
├── layout.tsx               # Root layout (Header + Footer)
├── loading.tsx              # Loading UI
├── not-found.tsx            # 404 page
└── page.tsx                 # Homepage
\`\`\`

### /src/components - React Components

\`\`\`
src/components/
├── ui/                       # Shadcn/UI base components
│   ├── accordion.tsx
│   ├── alert.tsx
│   ├── avatar.tsx
│   ├── badge.tsx
│   ├── button.tsx           ✅ Created
│   ├── card.tsx             ✅ Created
│   ├── dialog.tsx           ✅ Created
│   ├── dropdown-menu.tsx    ✅ Created
│   ├── input.tsx            ✅ Created
│   ├── label.tsx
│   ├── progress.tsx         ✅ Created
│   ├── select.tsx
│   ├── separator.tsx
│   ├── skeleton.tsx
│   ├── slider.tsx
│   ├── switch.tsx
│   ├── tabs.tsx
│   ├── textarea.tsx
│   ├── toast.tsx
│   └── tooltip.tsx
├── layout/                   # Layout components
│   ├── Header.tsx           ✅ Created
│   ├── Footer.tsx           ✅ Created
│   └── Sidebar.tsx
├── projects/                 # Project-related components
│   ├── ProjectCard.tsx
│   ├── ProjectGrid.tsx
│   ├── ProjectFilters.tsx
│   ├── ProjectDetail.tsx
│   └── RelatedProjects.tsx
├── donations/                # Donation components
│   ├── DonationButton.tsx
│   ├── DonationModal.tsx
│   ├── DonationForm.tsx
│   └── DonorsList.tsx
├── notifications/            # Notification components
│   ├── NotificationBell.tsx
│   ├── NotificationItem.tsx
│   └── NotificationList.tsx
├── badges/                   # Gamification badges
│   ├── BadgeCard.tsx
│   ├── BadgeList.tsx
│   └── BadgeSystem.tsx
├── forms/                    # Form components
│   ├── MultiStepForm.tsx
│   ├── ProjectForm.tsx
│   └── ProfileForm.tsx
├── comments/                 # Comments system
│   ├── CommentItem.tsx
│   ├── CommentForm.tsx
│   └── CommentThread.tsx
├── updates/                  # Project updates
│   ├── UpdateItem.tsx
│   ├── UpdateForm.tsx
│   └── UpdateFeed.tsx
├── analytics/                # Analytics charts
│   ├── DonationChart.tsx
│   ├── ViewsChart.tsx
│   └── StatsCard.tsx
├── shared/                   # Shared components
│   ├── LoadingSkeleton.tsx
│   ├── ErrorMessage.tsx
│   ├── EmptyState.tsx
│   └── SearchBar.tsx
└── Providers.tsx            ✅ Created (React Query, Theme)
\`\`\`

### /src/lib - Utilities and Helpers

\`\`\`
src/lib/
├── api.ts                   ✅ Axios instance & API functions
├── socket.ts                ✅ Socket.io client
├── utils.ts                 ✅ Helper functions (cn, formatCurrency, etc.)
└── constants.ts             ✅ App constants (colors, categories, badges)
\`\`\`

### /src/store - Zustand State Management

\`\`\`
src/store/
├── authStore.ts             ✅ Authentication state
├── notificationStore.ts     ✅ Notifications state
├── donationStore.ts         ✅ Donations state
└── themeStore.ts            ✅ Dark mode state
\`\`\`

### /src/types - TypeScript Definitions

\`\`\`
src/types/
└── index.ts                 ✅ All interfaces (User, Project, Donation, etc.)
\`\`\`

### /src/hooks - Custom React Hooks

\`\`\`
src/hooks/
├── useAuth.ts               # Authentication hook
├── useProject.ts            # Project data hook
├── useDonation.ts           # Donation hook
├── useNotifications.ts      # Notifications hook
├── useSocket.ts             # Socket.io hook
├── useDebounce.ts           # Debounce hook
└── useMediaQuery.ts         # Responsive hook
\`\`\`

### /src/styles - Additional Styles

\`\`\`
src/styles/
├── animations.css           # Custom animations
└── utilities.css            # Additional utility classes
\`\`\`

## 📂 /tests - Test Files

\`\`\`
tests/
├── unit/                    # Unit tests (Jest + RTL)
│   ├── button.test.tsx     ✅ Created
│   ├── utils.test.ts
│   └── stores.test.ts
├── integration/             # Integration tests
│   ├── auth.test.tsx
│   └── donation-flow.test.tsx
├── e2e/                     # E2E tests (Cypress)
│   ├── homepage.cy.ts      ✅ Created
│   ├── projects.cy.ts
│   └── donation.cy.ts
└── support/                 # Test utilities
    ├── e2e.ts
    └── commands.ts
\`\`\`

## 🔧 Configuration Files

### next.config.js
- PWA configuration (next-pwa)
- Image optimization
- Security headers
- Redirects

### tailwind.config.ts
- Custom colors (primary green, secondary blue, accent yellow)
- Animations
- Container sizes
- Dark mode support

### tsconfig.json
- Path aliases (@/...)
- Strict mode
- Next.js plugin

### package.json
Key scripts:
- `dev` - Development server
- `build` - Production build
- `start` - Production server
- `lint` - ESLint
- `test` - Jest tests
- `test:e2e` - Cypress tests

## 📦 Key Dependencies

### Core
- **next**: 14.2.0 (React framework)
- **react**: 18.3.0
- **typescript**: 5.4.0

### UI & Styling
- **tailwindcss**: 3.4.0
- **@radix-ui/**: Various UI primitives
- **lucide-react**: Icons
- **framer-motion**: Animations

### State & Data
- **zustand**: 4.5.0 (State management)
- **@tanstack/react-query**: 5.28.0 (Data fetching)
- **axios**: 1.6.0 (HTTP client)

### Forms
- **react-hook-form**: 7.51.0
- **zod**: 3.22.0 (Validation)

### Auth & Payments
- **@clerk/nextjs**: 5.0.0 (Authentication)
- **@stripe/stripe-js**: 3.0.0
- **@stripe/react-stripe-js**: 2.6.0

### Real-time
- **socket.io-client**: 4.7.0

### PWA
- **next-pwa**: 5.6.0

### Testing
- **jest**: 29.7.0
- **@testing-library/react**: 14.2.0
- **cypress**: 13.7.0

## 🎨 Design System

### Colors
- **Primary**: #22C55E (Green)
- **Secondary**: #3B82F6 (Blue)
- **Accent**: #FBBF24 (Yellow)
- **Muted**: #F3F4F6 (Light Gray)

### Typography
- **Font Family**: Inter (body), Poppins (headings)
- **Sizes**: text-sm to text-7xl

### Spacing
- Follows Tailwind's 4px base unit system

### Components
- All components use Radix UI primitives
- Fully accessible (WCAG compliant)
- Dark mode support

## 🔐 Environment Variables

Required:
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`

Optional:
- `NEXT_PUBLIC_SOCKET_URL`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

## 📱 Progressive Web App (PWA)

Features:
- ✅ Installable on mobile/desktop
- ✅ Offline support with service workers
- ✅ Push notifications
- ✅ App shortcuts
- ✅ Optimized caching strategy

## 🚀 Performance Optimizations

- Next.js Image optimization
- Route-based code splitting
- React Query caching
- PWA caching strategies
- Lazy loading components
- Optimized font loading

---

This structure is designed for:
- **Scalability**: Easy to add new features
- **Maintainability**: Clear separation of concerns
- **Developer Experience**: Intuitive organization
- **Best Practices**: Following Next.js and React conventions
