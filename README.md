# AI Meeting Tracker

An intelligent meeting tracking and analysis platform powered by AI. Automatically transcribe, summarize, and extract actionable insights from your meetings.

## Features

- 🎙️ **Real-time Transcription** - Automatically transcribe meetings with high accuracy
- 📝 **Smart Summaries** - AI-generated summaries with key points and decisions
- 👥 **Speaker Recognition** - Identify and track individual speakers
- ✅ **Action Item Tracking** - Automatically extract and track action items
- 📊 **Analytics & Insights** - Gain insights into meeting patterns and productivity
- 🔍 **AI-Powered Search** - Search across all meetings using natural language

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **HTTP Client**: Axios

## Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB (for data storage)
- OpenAI API key (for AI features)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Nisarg-Shah2302/AI-Meeting-Tracker.git
cd AI-Meeting-Tracker
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Copy the `.env.example` file to `.env` and fill in your configuration:

```bash
cp .env.example .env
```

Required environment variables:
- `OPENAI_API_KEY` - Your OpenAI API key for AI features
- `MONGODB_URI` - MongoDB connection string
- `NEXTAUTH_SECRET` - Secret for authentication (generate with `openssl rand -base64 32`)

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
AI-Meeting-Tracker/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── page.tsx      # Home page
│   │   ├── layout.tsx    # Root layout
│   │   ├── globals.css   # Global styles
│   │   ├── dashboard/    # Dashboard page
│   │   ├── meetings/     # Meetings pages
│   │   └── analytics/    # Analytics page
│   ├── lib/              # Utility functions
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
├── documents/            # Project documentation
├── .env.example          # Environment variables template
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.ts    # TailwindCSS configuration
└── next.config.js        # Next.js configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Features Roadmap

### Phase 1: MVP (Current)
- [x] Basic UI/UX with Next.js and TailwindCSS
- [x] Dashboard with meeting overview
- [x] Meeting list and details pages
- [x] Analytics page with insights
- [ ] Real-time audio transcription
- [ ] AI-powered meeting summaries
- [ ] Action item extraction

### Phase 2: Enhanced Features
- [ ] Integration with Zoom/Google Meet
- [ ] Speaker diarization
- [ ] Multi-language support
- [ ] Export to PDF/Word
- [ ] Calendar integration
- [ ] Email notifications

### Phase 3: Advanced Features
- [ ] Sentiment analysis
- [ ] Topic modeling
- [ ] Meeting recommendations
- [ ] Team collaboration features
- [ ] API for third-party integrations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please open an issue on GitHub.

---

Built with ❤️ using Next.js and AI
