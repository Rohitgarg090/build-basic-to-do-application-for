# Market Research

{
  "summary": "The simple to-do app market on iOS is extremely saturated with both free and premium options, making differentiation nearly impossible without a strong niche or unique angle. The target segment of users wanting a no-frills personal task manager exists but is already well-served by native Apple Reminders and minimalist competitors. Local storage focus limits scalability but aligns with privacy-conscious users.",
  "competitors": [
    "Apple Reminders: deeply integrated into iOS ecosystem, free, and pre-installed — nearly impossible to displace for casual users",
    "Todoist: feature-rich cross-platform app with strong brand loyalty, weakness is complexity for users wanting simplicity",
    "Things 3: premium polished minimalist app for iOS, weakness is one-time cost of $9.99 which some users resist",
    "TickTick: free tier with solid features, weakness is feeling bloated for users wanting truly basic experience",
    "Clear: gesture-based minimal to-do app, weakness is lack of active development and updates"
  ],
  "targetUsers": "Privacy-conscious iOS users aged 18-40 who are frustrated with feature bloat in existing apps and want a distraction-free, offline-first personal task manager with zero account setup or data syncing requirements.",
  "differentiators": [
    "Fully offline with local storage only — no account, no sync, no data collection as a hard promise",
    "Intentional feature freeze as a product value proposition, marketed as 'deliberately simple'",
    "Instant launch with zero onboarding friction compared to competitors requiring sign-up",
    "Transparent open-source codebase to build trust with privacy-focused users"
  ],
  "risks": [
    "Near-zero monetization path with no backend, no subscription, and free competition from Apple Reminders",
    "Stack mismatch is a serious concern — Django and Supabase backend are entirely unnecessary for a local-only iOS app, adding cost and complexity with no user benefit",
    "Expo limitations for deep iOS-native feel may hurt user experience compared to native SwiftUI alternatives",
    "App Store discoverability is extremely poor in the to-do category without a significant marketing budget",
    "No competitive moat — any feature added is already done better by existing apps, and staying minimal limits growth",
    "User retention is very low for simple utility apps with no engagement hooks or sync across devices"
  ]
}