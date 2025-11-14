# Quick Start Guide

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to http://localhost:3000

## Deploy to Vercel (Fastest Method)

### Using Vercel CLI:

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login
vercel login

# Deploy (from vegetable-shopping-list directory)
vercel

# Follow prompts - it will auto-detect Next.js settings
```

### Using GitHub + Vercel Dashboard:

1. Push code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Import your repository
5. Click "Deploy" (auto-configured for Next.js)

## Features Checklist

- ✅ Add items with name, quantity, and notes
- ✅ Three status categories (To Buy, Not Needed, Purchased)
- ✅ Search functionality
- ✅ Edit and delete items
- ✅ Move items between categories
- ✅ Auto-save to localStorage
- ✅ Mobile-friendly design
- ✅ Dark mode support
- ✅ Quick quantity buttons
- ✅ Vibration feedback (mobile)
- ✅ Delete confirmation
- ✅ Auto-sorting by category

## Troubleshooting

### Build Errors

If you get build errors, try:
```bash
rm -rf node_modules .next
npm install
npm run build
```

### LocalStorage Not Working

- Make sure you're accessing via http://localhost (not file://)
- Check browser console for errors
- Clear browser cache and localStorage if needed

### PWA Not Installing

- Add icon files (see README.md)
- Deploy to HTTPS (required for PWA)
- Check browser console for service worker errors

## Next Steps

1. Add PWA icons (optional but recommended)
2. Customize colors in Tailwind config if needed
3. Add more vegetables to the initial list if desired
4. Deploy and share!

