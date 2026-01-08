# StudyMate - Next.js

A complete study resource hub for Pokhara University Computer Engineering students. This is the **Next.js migration** of the original React + Vite application.

## Features

- 🎓 Access study materials for all 8 semesters
- 📚 Browse notes organized by subject
- 📝 Create personal notes with Excalidraw drawing canvas
- 🔐 Authentication with Supabase (Google OAuth)
- 🎨 macOS-inspired UI with glassmorphism design
- 🖥️ Desktop experience with Finder, Notes, and Settings apps
- 🌓 Multiple wallpaper themes

## Tech Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Styling**: Tailwind CSS + Custom CSS
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Drawing**: Excalidraw
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (for backend)

### Installation

1. Clone and navigate to the project:
```bash
cd nextjs-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Edit `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token (optional)
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Main desktop app
│   ├── login/              # Authentication
│   ├── user-info/          # Profile completion
│   ├── privacy-policy/     # Privacy policy page
│   ├── terms-of-service/   # Terms of service page
│   └── not-found.js        # 404 page
├── components/             # React components
│   ├── Desktop/            # Main desktop container
│   ├── Dock/               # macOS-style dock
│   ├── Finder/             # File browser
│   ├── Notes/              # Excalidraw drawing app
│   ├── QuickLook/          # File preview modal
│   └── Settings/           # Settings panel
├── context/                # React contexts
│   ├── AuthContext.jsx     # Authentication state
│   └── BackgroundContext.jsx # Wallpaper settings
├── hooks/                  # Custom React hooks
│   ├── useGitHubNotes.js   # GitHub API for notes
│   ├── useNotes.js         # Supabase notes CRUD
│   └── useUserProfile.js   # User profile management
├── lib/                    # Utility libraries
│   ├── database.js         # Supabase database operations
│   ├── github.js           # GitHub API helper
│   ├── storage.js          # Supabase storage operations
│   └── supabase.js         # Supabase client
└── styles/                 # Global styles
    └── glass.css           # CSS variables & glass effects
```

## Migration Notes

### Key Changes from React + Vite

1. **Environment Variables**: `VITE_*` → `NEXT_PUBLIC_*`
2. **Routing**: `react-router-dom` → `next/navigation`
3. **Navigation**: `useNavigate()` → `useRouter().push()`
4. **Links**: React Router `Link` → Next.js `Link` (with `href` prop)
5. **Client Components**: Added `'use client'` directive to interactive components
6. **Excalidraw**: Uses `dynamic()` import with `ssr: false` for SSR compatibility

## Deploy on Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
npm run build
vercel deploy
```

## License

MIT License - Feel free to use this for educational purposes.
