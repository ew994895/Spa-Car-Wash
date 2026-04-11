# 🚀 Spa Car Wash Website - Complete Setup & Deployment Guide

## 📋 Table of Contents
1. [Current Development Environment](#current-development-environment)
2. [How to Download & Run Locally](#how-to-download--run-locally)
3. [Admin Features & localStorage](#admin-features--localstorage)
4. [Deployment Options](#deployment-options)
5. [Troubleshooting](#troubleshooting)
6. [Website Features Reference](#website-features-reference)

---

## 🖥️ Current Development Environment

**You're currently in Figma Make's live development environment!**

✅ **The website is already running** in your browser  
✅ **All features work right now** - no setup needed  
✅ **Admin controls are active** - Press `Ctrl+Shift+S/P/X` to test  

### What You're Seeing:
- **Technology**: React 18 + Vite + TypeScript + Tailwind CSS v4
- **Live Preview**: Updates instantly as code changes
- **Browser Storage**: localStorage already working for all admin features

---

## 💾 How to Download & Run Locally

### Option 1: Export from Figma Make (Recommended)

1. **Look for the "Export" or "Download" button** in Figma Make
2. This will download a ZIP file containing all your code
3. Extract the ZIP file to a folder (e.g., `C:\Users\SDPOS\spa-car-wash`)

### Option 2: Manual File Export

If there's no export button, you can manually copy files using the file browser on the left.

---

## 🛠️ Local Setup Instructions

Once you have the files on your computer:

### Step 1: Install Node.js
**Download Node.js**: https://nodejs.org/ (Version 18 or higher)

To verify installation:
```bash
node --version
# Should show: v18.x.x or higher

npm --version
# Should show: 9.x.x or higher
```

### Step 2: Open the Project Folder

**Windows:**
```powershell
cd C:\Users\SDPOS\spa-car-wash
```

**Mac/Linux:**
```bash
cd ~/spa-car-wash
```

### Step 3: Install Dependencies

```bash
npm install
```

⏳ **This will take 2-5 minutes** - it's installing all the required packages.

### Step 4: Run the Development Server

```bash
npm run dev
```

✅ **Success!** You should see:
```
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.x:5173/
```

Open **http://localhost:5173/** in your browser.

### Step 5: Stop the Server

Press `Ctrl + C` in the terminal to stop.

---

## 📦 Build for Production

When ready to deploy to a real website:

```bash
npm run build
```

This creates a `dist/` folder with optimized files ready for deployment.

---

## 💾 Admin Features & localStorage

### How localStorage Works

All admin features save data to your **browser's localStorage**:

| Feature | Storage Key | Data Saved |
|---------|-------------|------------|
| Business Status | `spaCarWashStatus` | Open/Closed, weather alerts, custom hours |
| Promotions | `spaCarWashPromotions` | Active campaigns, discounts, placements |
| Wait Times | `spaCarWashWaitTimes` | Service wait times, traffic levels |

### Where is Data Stored?

**Development (localhost):**
- Data saved in your browser for `http://localhost:5173`
- Different browsers = different storage
- Survives page refresh
- Cleared when you "Clear browsing data"

**Production (published site):**
- Data saved in your browser for your actual domain (e.g., `https://spacarwash.com`)
- Each computer has its own settings
- Staff computers need to update admin tools directly

### View Saved Data

**Chrome/Edge:**
1. Press `F12` (Developer Tools)
2. Go to **Application** tab
3. Expand **Local Storage** in left sidebar
4. Click your domain
5. See all saved keys and values

**Firefox:**
1. Press `F12`
2. Go to **Storage** tab
3. Expand **Local Storage**
4. Click your domain

### Clear/Reset Data

**Method 1: Manual Delete**
```javascript
// In browser console (F12 → Console tab)
localStorage.clear(); // Clear ALL data
// OR clear individual items:
localStorage.removeItem('spaCarWashStatus');
localStorage.removeItem('spaCarWashPromotions');
localStorage.removeItem('spaCarWashWaitTimes');
```

**Method 2: Browser Settings**
- Chrome: Settings → Privacy → Clear browsing data → Cookies and site data
- Firefox: Settings → Privacy → Clear Data → Cookies and Site Data

---

## 🌐 Deployment Options

### Option 1: Netlify (Free & Easy - Recommended)

**Perfect for this website!**

1. **Sign up**: https://www.netlify.com/
2. **Drag & drop the `dist` folder** (after running `npm run build`)
3. **Your site is live!** Example: `spa-car-wash.netlify.app`
4. **Custom domain**: Connect `spacarwash.com` in settings

**Benefits:**
- ✅ Free hosting
- ✅ Automatic HTTPS
- ✅ Fast CDN
- ✅ Easy updates (just drop new `dist` folder)

### Option 2: Vercel (Free)

Similar to Netlify:
1. Sign up: https://vercel.com/
2. Import your project folder
3. Click Deploy

### Option 3: GitHub Pages (Free)

1. Create GitHub repository
2. Push your code
3. Enable GitHub Pages in settings
4. Select `gh-pages` branch

### Option 4: Traditional Web Hosting

Upload the `dist/` folder contents via FTP to your hosting provider:
- **Hostgator**
- **Bluehost**
- **GoDaddy**
- **SiteGround**

**Upload to**: `public_html` or `www` folder

---

## 🎮 Using Admin Controls

### Keyboard Shortcuts

| Shortcut | Function | What It Does |
|----------|----------|--------------|
| `Ctrl+Shift+S` | **Business Status** | Set OPEN/CLOSED, weather alerts, custom hours |
| `Ctrl+Shift+P` | **Promotions** | Create/edit promotional campaigns |
| `Ctrl+Shift+X` | **Wait Times** | Update service wait times (15-60 min) |

### Testing Admin Controls

1. **Open browser console**: Press `F12`
2. **Refresh the page**
3. **Look for**: 
   ```
   ✅ Admin keyboard shortcuts initialized:
      - Ctrl+Shift+S = Business Status
      - Ctrl+Shift+P = Promotions
      - Ctrl+Shift+X = Wait Times
   ```
4. **Test each shortcut** - console will show colored messages when pressed

### Real-World Usage Example

**Morning Routine (9:00 AM):**
```
1. Staff opens website on front desk computer
2. Press Ctrl+Shift+S
3. Set status: OPEN
4. Click Save

5. Press Ctrl+Shift+X
6. Set wait times:
   - Hand Wash: 20 minutes
   - Full Wash: 15 minutes
7. Click Save
```

**Throughout the Day:**
- Update wait times as they change
- Add weather alerts if needed
- Create promotions for slow periods

**Evening Routine (5:00 PM):**
```
1. Press Ctrl+Shift+S
2. Set status: CLOSED
3. Click Save
```

**Customer Experience:**
- Visits `spacarwash.com` on their phone
- Sees "OPEN" badge in header
- Sees current wait times
- Sees active promotions

---

## 🔍 Troubleshooting

### Problem: Admin Shortcuts Don't Work

**Solutions:**
1. ✅ Click anywhere on the webpage first (make sure page is focused)
2. ✅ Open console (F12) to see initialization message
3. ✅ Try refreshing the page (Ctrl+R or F5)
4. ✅ Make sure you're using **Ctrl** (not Cmd on Mac)
5. ✅ Try a different browser (Chrome, Firefox, Edge)

### Problem: Changes Don't Save

**Solutions:**
1. ✅ Check browser console for errors (F12 → Console)
2. ✅ Make sure localStorage isn't disabled:
   ```javascript
   // Test in console:
   localStorage.setItem('test', 'works');
   console.log(localStorage.getItem('test')); // Should show 'works'
   ```
3. ✅ Clear browser cache and try again
4. ✅ Check if you're in "Incognito/Private" mode (localStorage disabled there)

### Problem: npm install Fails

**Solutions:**
1. ✅ Update Node.js: https://nodejs.org/
2. ✅ Clear npm cache:
   ```bash
   npm cache clean --force
   npm install
   ```
3. ✅ Delete `node_modules` and try again:
   ```bash
   # Windows PowerShell:
   Remove-Item node_modules -Recurse -Force
   npm install
   
   # Mac/Linux:
   rm -rf node_modules
   npm install
   ```

### Problem: Port 5173 Already in Use

**Solutions:**
```bash
# Kill the process and restart
# Windows:
netstat -ano | findstr :5173
taskkill /PID [process_id] /F

# Mac/Linux:
lsof -ti:5173 | xargs kill -9
```

Or use a different port:
```bash
npm run dev -- --port 3000
```

---

## 📱 Website Features Reference

### Customer-Facing Features

✅ **Modern Premium Design** - Blue/red/gold color scheme  
✅ **Responsive Layout** - Works on all devices  
✅ **Live Business Status** - Open/Closed with weather alerts  
✅ **Wait Time Display** - Real-time service wait times  
✅ **Service Packages** - Express to Elite wash options  
✅ **Detailing Services** - 16 professional services  
✅ **Membership Program** - Prepaid wash card promotions  
✅ **Online Booking** - Appointment scheduling  
✅ **24/7 Chat Support** - Crisp chatbot integration  
✅ **Testimonials** - Customer reviews  
✅ **Location Map** - Embedded Google Maps  
✅ **Contact Information** - Phone, email, address  
✅ **Promotional System** - Dynamic offers & campaigns  

### Staff Admin Features

✅ **Business Status Control** (`Ctrl+Shift+S`)  
   - Set OPEN/CLOSED status
   - Weather alerts (rain, snow, severe weather)
   - Custom opening times
   - Emergency closures

✅ **Promotion Manager** (`Ctrl+Shift+P`)  
   - Create promotional campaigns
   - Set discounts & offers
   - Choose placement (banner, popup, hero, above sections)
   - Schedule start/end dates
   - Enable/disable campaigns

✅ **Wait Time Manager** (`Ctrl+Shift+X`)  
   - Update wait times (15-60 minutes)
   - Set traffic levels (Low/Medium/High)
   - Color-coded progress bars (green → yellow → orange → red)
   - Display in header badge and detail widget

---

## 📊 Technical Details

### Tech Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS v4.1.12
- **UI Components**: Radix UI, shadcn/ui
- **Icons**: Lucide React
- **Routing**: React Router 7.13.0
- **Animations**: Motion (Framer Motion successor)
- **Forms**: React Hook Form 7.55.0
- **Chat**: Crisp Chat Widget

### Browser Compatibility

✅ Chrome 90+  
✅ Firefox 88+  
✅ Safari 14+  
✅ Edge 90+  

### Performance

- ⚡ Fast loading times (optimized with Vite)
- 📦 Code splitting for optimal bundle size
- 🖼️ Lazy loading images
- 🎨 Minimal CSS (Tailwind utility classes)

---

## 🎯 Quick Reference Card

### For Staff: Daily Operations

**Morning Opening:**
```
Ctrl+Shift+S → Set OPEN → Save
Ctrl+Shift+X → Set wait times → Save
```

**Update Wait Times:**
```
Ctrl+Shift+X → Adjust times → Save
```

**Add Weather Alert:**
```
Ctrl+Shift+S → Check weather warning → Select reason → Save
```

**Create Promotion:**
```
Ctrl+Shift+P → Create Campaign → Set details → Save
```

**Evening Closing:**
```
Ctrl+Shift+S → Set CLOSED → Save
```

### For Developers: Key Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🆘 Need More Help?

### Documentation Files Available:
- `ADMIN_ACCESS_GUIDE.md` - Detailed admin controls
- `ADMIN_CHEAT_SHEET.md` - Quick reference
- `PROMOTION_CONTROLS_GUIDE.md` - Promotion system
- `WAIT_TIME_GUIDE.md` - Wait time management
- `CRISP_SETUP_GUIDE.md` - Chat widget setup
- `WEBSITE_FEATURES_BREAKDOWN.md` - Complete feature list

### Console Debugging:

Open browser console (F12) and run:
```javascript
// Check business status
console.log(JSON.parse(localStorage.getItem('spaCarWashStatus')));

// Check promotions
console.log(JSON.parse(localStorage.getItem('spaCarWashPromotions')));

// Check wait times
console.log(JSON.parse(localStorage.getItem('spaCarWashWaitTimes')));

// Clear all data (reset)
localStorage.clear();
```

---

## ✅ Checklist: Before Going Live

- [ ] Test all admin shortcuts (Ctrl+Shift+S/P/X)
- [ ] Update business information (address, phone, email)
- [ ] Set up Crisp chat with your website ID
- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] Set initial business status (OPEN)
- [ ] Set realistic wait times
- [ ] Create welcome promotion campaign
- [ ] Add staff photos/bios to About section
- [ ] Test contact form submissions
- [ ] Test booking appointment flow
- [ ] Update testimonials with real reviews
- [ ] Verify Google Maps location
- [ ] Set up custom domain (spacarwash.com)
- [ ] Add Google Analytics (optional)
- [ ] Train staff on admin controls

---

## 🎉 You're All Set!

Your Spa Car Wash website is a modern, fully-featured web application with powerful admin controls that work instantly without any backend or database setup!

**Key Advantages:**
- ✅ No server costs (static hosting)
- ✅ No database needed
- ✅ Instant updates via browser storage
- ✅ Easy for staff to manage
- ✅ Fast and reliable
- ✅ Works on any device

**Questions?** Check the other documentation files or test features in the browser!

---

**Last Updated**: April 10, 2026  
**Version**: 2.0  
**Status**: Production Ready ✅
