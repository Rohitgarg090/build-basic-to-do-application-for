# Simple iOS To-Do App

A no-frills personal to-do application for iPhone. Add tasks, mark them complete, delete them. All data stays on your device — no accounts, no cloud, no internet required.

---

## What This App Does

- ✅ Add to-do items
- ✅ Tap to mark complete/incomplete
- ✅ Swipe to delete
- ✅ Data saved locally on your iPhone
- ✅ Works completely offline

That's it. No extra features.

---

## Prerequisites (What You Need First)

### 1. A Mac Computer
You **must** have a Mac to build iOS apps. This cannot be done on Windows or Linux.

### 2. Install These Tools

| Tool | How to Install | Why You Need It |
|------|---------------|------------------|
| **Node.js** (v18+) | Download from [nodejs.org](https://nodejs.org/) — pick the LTS version | Runs the development tools |
| **Xcode** | Open the Mac App Store, search "Xcode", install (it's free but ~12GB) | Builds the iOS app |
| **Xcode Command Line Tools** | After installing Xcode, open Terminal and run: `xcode-select --install` | Required by Expo |
| **Git** | Comes with Xcode Command Line Tools | Downloads the project code |

### 3. Apple Developer Account (Optional)
- **Free tier**: You can run the app on your own iPhone during development
- **Paid ($99/year)**: Needed only if you want to distribute via TestFlight or the App Store

---

## How to Run the App (Step by Step)

### Step 1: Open Terminal
Press `Cmd + Space`, type "Terminal", press Enter.

### Step 2: Navigate to the Project
```bash
cd path/to/this/project
```
(Replace `path/to/this/project` with wherever you saved the project folder)

### Step 3: Install Dependencies
```bash
npm install
```
Wait for it to finish. This downloads all the code libraries the app needs.

### Step 4: Run on iOS Simulator
```bash
npm run ios
```
This will:
1. Open the iOS Simulator (a virtual iPhone on your Mac)
2. Build the app
3. Launch it in the simulator

**First time will take 3-5 minutes.** Subsequent runs are much faster.

### Step 5 (Optional): Run on Your Real iPhone
1. Plug your iPhone into your Mac with a USB cable
2. Open the `mobile/ios` folder in Xcode
3. Select your iPhone as the build target (top bar in Xcode)
4. Click the Play button
5. On your iPhone: Go to Settings → General → VPN & Device Management → Trust the developer certificate

---

## Project Structure

```
/
├── mobile/                  ← The entire app lives here
│   ├── app/                 ← Screens
│   │   ├── _layout.tsx      ← Navigation setup
│   │   ├── index.tsx        ← Main to-do list screen
│   │   └── add.tsx          ← Add new to-do screen
│   ├── components/          ← Reusable UI pieces
│   │   ├── TodoItem.tsx     ← Single to-do row
│   │   └── EmptyState.tsx   ← "No todos yet" message
│   ├── lib/
│   │   └── db.ts            ← All database operations
│   ├── app.json             ← Expo/app configuration
│   └── package.json         ← App dependencies
├── package.json             ← Root project file
├── docker-compose.yml       ← Not used (no backend needed)
└── README.md                ← This file
```

**Note:** There is no `backend/` or `frontend/` folder. This app has no backend and no web frontend. Everything runs on the iPhone.

---

## Environment Variables

This app has **no environment variables**. There is no server, no API keys, no cloud services. Everything is local. The `.env.example` file is included for monorepo convention but is effectively empty.

---

## Stack Decisions

| Originally Proposed | Actual Decision | Reason |
|---|---|---|
| Django (backend) | ❌ Removed | No backend needed — all data is local |
| Supabase (database) | ❌ Removed | No cloud DB needed — using on-device SQLite |
| Expo (mobile) | ✅ Kept | Perfect for building the iOS app |
| Web frontend | ❌ None | iOS only, no web version |

---

## How Data is Stored

The app uses **SQLite** — a tiny database that lives as a single file on your iPhone. Your to-dos are stored in one simple table:

| Column | What It Stores |
|--------|----------------|
| id | Unique number for each to-do |
| title | The text of your to-do |
| completed | Whether it's done (yes/no) |
| created_at | When you created it |

If you delete the app, your data is deleted too. There is no backup/sync.

---

## Deploying to Your iPhone (For Personal Use)

### Option A: Development Build (Free)
1. Follow the "Run on Your Real iPhone" steps above
2. The app will work for 7 days, then you need to rebuild
3. Good enough for personal use if you're near your Mac regularly

### Option B: TestFlight (Recommended, $99/year)
1. Sign up for [Apple Developer Program](https://developer.apple.com/programs/)
2. Run: `cd mobile && npx expo prebuild --platform ios`
3. Open `mobile/ios/SimpleTodo.xcworkspace` in Xcode
4. In Xcode: Product → Archive
5. Upload to App Store Connect
6. In [App Store Connect](https://appstoreconnect.apple.com/), add yourself as a TestFlight tester
7. Install via the TestFlight app on your iPhone
8. The app stays installed for 90 days per build

### Option C: App Store (Public Distribution)
Same as Option B, but submit for App Store Review instead of TestFlight. This is overkill for personal use.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm run ios` fails | Make sure Xcode is fully installed and you've opened it at least once to accept the license |
| Simulator doesn't open | Run `open -a Simulator` manually, then retry `npm run ios` |
| "No bundle URL present" | Close the simulator, run `npm run ios` again |
| Build takes forever | First build is slow (3-5 min). Be patient. |
| "Unable to boot device" | Open Xcode → Settings → Platforms → Download iOS simulator runtime |
| Real device: "Untrusted Developer" | On iPhone: Settings → General → VPN & Device Management → Trust your certificate |

---

## Useful Commands

```bash
# Start the app in iOS Simulator
npm run ios

# Start Expo development server only
npm run start

# Generate native iOS project files (needed for real device builds)
npm run prebuild

# Clear caches if something is broken
npm run clean
```

---

## Cost

- **Development & personal use**: $0
- **Apple Developer account**: $99/year (only if you want TestFlight/App Store)
- **Backend hosting**: $0 (there is no backend)
- **Database**: $0 (SQLite is free and on-device)

---

Built with [Expo](https://expo.dev/) and [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/).