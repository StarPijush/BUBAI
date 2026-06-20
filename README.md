# 💖 Birthday Surprise Website

A stunning, romantic multi-page birthday surprise website with password protection, animated pages, photo gallery, timeline, flip cards, quiz, and confetti finale.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run locally
npm run dev

# 3. Build for production
npm run build
```

---

## 🎨 Customization Checklist

Search for comments marked with `── ✏️ CUSTOMIZE ──` or `── 🎵 CUSTOMIZE ──` etc.

### 🔐 Password (LoginPage.tsx)
```ts
const SECRET_CODE = 'Uber OTP'  // ← Change this
```

### 💌 Love Letter (LoveLetter.tsx)
```ts
const LETTER = {
  name: 'My Love',          // ← Her name
  senderName: 'Yours Forever', // ← Your name/sign-off
  paragraphs: [ ... ]        // ← Your letter text
}
```

### 📸 Photos (PhotoGallery.tsx)
1. Place your photos in `/public/photos/` folder
2. In `PhotoGallery.tsx`, update each photo's `src`:
```ts
{ src: '/photos/your-photo.jpg', caption: 'Our caption here' }
```

### 💫 Timeline (RelationshipTimeline.tsx)
```ts
const MILESTONES = [
  { date: 'March 14, 2022', title: 'First Time We Met', ... }
]
```

### 💝 Reasons (ReasonsILoveYou.tsx)
Edit the `REASONS` array — each string is one flip card reason.

### 🎯 Quiz (RelationshipQuiz.tsx)
Edit the `QUESTIONS` array — each has a question, yes response, and no response.

### 🎵 Music Video (MusicVideoTribute.tsx)
```ts
const YOUTUBE_VIDEO_ID = 'dQw4w9WgXcQ' // ← Your YouTube video ID
```

### 🎵 Background Music (MusicContext.tsx)
1. Add your `.mp3` file to `/public/music/love-song.mp3`
2. That's it — it auto-plays on the Love Letter page!

### 🎂 Final Message (FinalMessage.tsx)
```ts
const HER_NAME = 'My Love'  // ← Her name for "Happy Birthday, [name]!"
const FINAL_MESSAGE = '...'  // ← Your final message
```

---

## 🌐 Deploy to Vercel

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Framework: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click Deploy!

---

## 📁 File Structure

```
src/
  components/
    AnimatedBackground.tsx  — Floating hearts/emojis
    FlipCard.tsx            — Reusable flip card
    HeartIcon.tsx           — Animated heart SVG
    MusicPlayer.tsx         — Floating music toggle button
    NavigationButtons.tsx   — Prev/Next navigation
  context/
    MusicContext.tsx         — Persistent audio across pages
  pages/
    LoginPage.tsx            — Password entry screen
    LoveLetter.tsx           — Romantic letter (Page 1)
    PhotoGallery.tsx         — Photo grid (Page 2)
    RelationshipTimeline.tsx — Milestones (Page 3)
    ReasonsILoveYou.tsx      — Flip cards (Page 4)
    RelationshipQuiz.tsx     — Quiz (Page 5)
    MusicVideoTribute.tsx    — YouTube embed (Page 6)
    FinalMessage.tsx         — Grand finale + confetti (Page 7)
  App.tsx
  index.tsx
  index.css
public/
  music/
    love-song.mp3   ← ADD YOUR MUSIC FILE HERE
  photos/
    photo1.jpg      ← ADD YOUR PHOTOS HERE
    photo2.jpg
    ...
```

---

## 💡 Tips

- **Music**: Use royalty-free tracks from [pixabay.com/music](https://pixabay.com/music/) or [freemusicarchive.org](https://freemusicarchive.org)
- **Photos**: Optimize images to ~400KB each for fast loading
- **Mobile**: Fully responsive — works perfectly on phones
- **Privacy**: Share the URL only with her — the password keeps it secret

Made with 💖 — Happy Birthday!
