# Vegetable Shopping List

A modern, mobile-first Next.js web application for tracking your vegetable shopping list. Built with Next.js 14 App Router, TypeScript, and TailwindCSS.

## Features

- ✅ **Three Categories**: To Buy Today, Not Needed Today, and Purchased
- ✅ **Auto-save**: All data persists in browser localStorage
- ✅ **Search**: Filter items by name, quantity, or notes
- ✅ **Mobile-First Design**: Large touch targets, readable fonts, responsive layout
- ✅ **Dark Mode**: Automatically adapts to system preferences
- ✅ **Quick Actions**: Quick quantity buttons (1kg, 1/2kg, 10rs, 1 packet)
- ✅ **Vibration Feedback**: Haptic feedback when marking items as purchased (mobile)
- ✅ **Delete Confirmation**: Modal confirmation before deleting items
- ✅ **Auto-sorting**: Items automatically sorted by category
- ✅ **PWA Support**: Installable as a Progressive Web App
- ✅ **Color Coding**: 
  - 🟢 Green: To Buy Today
  - 🔴 Red: Not Needed Today
  - 🔵 Blue: Purchased

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Navigate to the project directory:
```bash
cd vegetable-shopping-list
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## PWA Icons

For full PWA functionality, you'll need to add icon files:

1. Create two PNG icons:
   - `public/icon-192.png` (192x192 pixels)
   - `public/icon-512.png` (512x512 pixels)

2. You can use online tools like:
   - [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)
   - [RealFaviconGenerator](https://realfavicongenerator.net/)
   - Or create them manually with any image editor

3. The icons should represent a vegetable or shopping list theme.

**Note**: The app will work without icons, but PWA installation features will be limited.

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI (if not already installed):
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
cd vegetable-shopping-list
vercel
```

4. Follow the prompts to complete deployment.

### Option 2: Deploy via GitHub

1. Push your code to a GitHub repository.

2. Go to [vercel.com](https://vercel.com) and sign in.

3. Click "New Project" and import your GitHub repository.

4. Vercel will automatically detect Next.js and configure the build settings.

5. Click "Deploy" and your app will be live!

### Option 3: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in.

2. Click "Add New..." → "Project"

3. Import your Git repository or upload the project folder.

4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `vegetable-shopping-list` (if in a subdirectory)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. Click "Deploy"

## Project Structure

```
vegetable-shopping-list/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Main shopping list page
│   ├── types.ts             # TypeScript type definitions
│   └── service-worker-register.tsx  # PWA service worker registration
├── components/
│   ├── AddItemModal.tsx     # Modal for adding/editing items
│   ├── CategorySection.tsx  # Section component for each category
│   ├── ItemCard.tsx         # Individual item card component
│   └── SearchBar.tsx        # Search input component
├── hooks/
│   └── useLocalStorage.ts   # Custom hook for localStorage persistence
├── utils/
│   └── initialData.ts       # Parser for initial vegetable data
├── public/
│   ├── manifest.json        # PWA manifest
│   └── sw.js               # Service worker for PWA
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

## Usage

### Adding Items

1. Click the floating "+" button at the bottom right.
2. Enter the item name (required).
3. Optionally add quantity/price or use quick buttons.
4. Add a note if needed.
5. Select the initial status.
6. Click "Add" to save.

### Managing Items

- **Change Status**: Click "To Buy", "Not Needed", or "Purchased" buttons on any item card.
- **Edit Item**: Click "Edit" to modify name, quantity, note, or status.
- **Delete Item**: Click "Delete" and confirm in the modal.
- **Search**: Use the search bar at the top to filter items.

### Initial Data

The app comes pre-loaded with 27 vegetables from your initial list. Items ending with "-no" are automatically placed in "Not Needed Today" category.

## Mobile Features

- **Large Touch Targets**: All buttons are at least 44x44px for easy tapping
- **Sticky Header**: Search bar and header stay at the top while scrolling
- **Big Fonts**: Optimized for outdoor sunlight readability
- **Vibration Feedback**: Haptic feedback when marking items as purchased
- **Responsive Layout**: Works perfectly on all screen sizes

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **TailwindCSS**: Utility-first CSS framework
- **LocalStorage API**: Client-side data persistence
- **PWA**: Progressive Web App capabilities

## License

MIT

## Support

For issues or questions, please open an issue on GitHub or contact the developer.

