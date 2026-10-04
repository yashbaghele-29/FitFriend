*This is a submission for the [Hacktoberfest Weekend Challenge: Build for a Friend](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)*

## What I Built

I built **FitFriend** — an ultra-lightweight, offline-first exercise companion and healthy eating guide designed specifically for a close friend who wanted to get fit and eat better without the friction of modern fitness apps.

### The Problem It Solves

My friend was constantly overwhelmed by commercial fitness apps:
- Heavy downloads (200MB+ mobile apps)
- Mandatory account registrations, annoying pop-ups, and aggressive subscription paywalls
- Overly complicated calorie counting and macro calculators that cause burnout
- Intimidating gym-focused routines that don't match reality for someone working out at home

They came to me with a simple, genuine request:
> *"Can you build a simple exercise app for me and add a food menu showing what I can actually eat? Make it simple, not heavy, and easy to use."*

**FitFriend** is the answer:
1. **Lightweight & Instant:** Pure vanilla web technology (HTML5, CSS3, ES6 JavaScript) that loads in under 50ms, works on both mobile phones and desktop browsers, and requires **zero installations, zero accounts, and zero paywalls**.
2. **Interactive Home Workouts:** Gentle beginner routines, cardio fat-burn, strength toning, and 5-minute morning mobility stretches. Includes a built-in interactive countdown timer with Web Audio API sound cues (no external audio assets required!).
3. **Clear "What Can I Eat?" Menus:** 4 tailored food guides (Balanced Fit, Fat Loss, Muscle Building, and 100% Vegetarian) covering breakfast, lunch, snacks, and dinner with realistic, delicious, everyday meals.
4. **The Traffic Light Food Guide:** A painless nutritional framework (🟢 Eat Freely, 🟡 In Moderation, 🔴 Limit/Avoid) plus 5-minute easy recipes.
5. **Daily Habit & Hydration Tracker:** An 8-cup visual water logger and daily checklist that saves all data directly to the device's `localStorage` so their health data stays 100% private.
6. **Personalized for Them:** Allows customizing their name, goal, and displaying a personal motivational note right on their daily dashboard.

---

## Demo

- **GitHub Repository:** [https://github.com/yashbaghele-29/FitFriend/tree/main](https://github.com/yashbaghele-29/FitFriend/tree/main)
- **Live Code & Local Runner:** The project can be launched in one click via `start.bat` or by opening `index.html` in any browser.
- **Local Network Mobile Access:** Comes with an integrated lightweight Python server script (`server.py`) that auto-detects the host's local Wi-Fi IP address so my friend can open the app on their smartphone while in the kitchen or workout mat (e.g., `http://192.168.1.x:8080`).

### Key UI Features

- **📋 Today's Plan:** Welcome banner with friend's name, daily motivational quote, 1-click workout launcher, interactive 8-glass water tracker, and daily habit checklist.
- **🏋️ Workouts Tab:** Filterable exercise routines with target muscle badges, rep counts, and expandable instruction cards.
- **⏱️ Workout Player Modal:** Fullscreen interactive timer with animated progress ring, 3-2-1 beep cues, play/pause controls, and celebration fanfare upon completion.
- **🥗 Food Menu Tab:** Goal switcher dynamically updating breakfast, lunch, snack, and dinner suggestions with macro/benefit highlights.
- **🚦 Food Guide & Recipes:** Color-coded healthy food guide and 5-minute quick recipes anyone can cook.
- **🌙 Dark / Light Mode:** Built-in toggle for comfortable viewing day or night.

---

## Code

{% github https://github.com/yashbaghele-29/FitFriend %}

**Repository Link:** [https://github.com/yashbaghele-29/FitFriend/tree/main](https://github.com/yashbaghele-29/FitFriend/tree/main)

The application is completely self-contained, modular, and requires no external node_modules or build steps:

- **`index.html`**: Clean semantic HTML structure with accessible tab navigation and modal dialogues.
- **`styles.css`**: Modern responsive design using CSS custom properties (variables), flexible grid/flexbox layouts, smooth animations, and light/dark theme support.
- **`app.js`**: Reactive client-side application logic, Web Audio API sound synthesizer, countdown timer engine, and `localStorage` persistence.
- **`data.js`**: Curated library of beginner workout plans, goal-based nutrition menus, traffic-light rules, and healthy quick recipes.
- **`server.py`**: Portable Python HTTP server script for local Wi-Fi sharing.
- **`start.bat`**: 1-click Windows launcher.

