# Miftah Fadhlih - Interactive Portfolio

This is an interactive portfolio website built with Next.js, Tailwind CSS, Framer Motion, and Google AI Studio.

## Features

- **Interactive UI**: Smooth scrolling, reveal animations, and glassmorphism design.
- **AI Agent Assistant**: Integrated with Google Gemini to answer questions about Miftah based on his CV.
- **Visitor Tracking**: Tracks visitor location, device, and browser, sending notifications to Telegram.
- **Contact Form**: Forwards messages directly to Telegram.
- **Telegram Integration**: Two-way communication via Telegram bot.

## Setup Instructions

### 1. Create Telegram Bot
1. Open [@BotFather](https://t.me/BotFather) in Telegram.
2. Send `/newbot` and follow the prompts to create a bot and get a username.
3. Copy the `BOT_TOKEN` provided by BotFather.

### 2. Get Your Chat ID
1. Send a message to your newly created bot in Telegram.
2. Open your browser and go to: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
3. Look for `"chat":{"id":123456789}` in the JSON response. That number is your `CHAT_ID`.

### 3. Environment Variables
Configure the following variables in AI Studio Secrets or your `.env` file:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

### 4. Set Webhook (For 2-way communication)
To allow the bot to receive commands (like `/stats`, `/summary`), set the webhook by visiting this URL in your browser:
`https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=<YOUR_APP_URL>/api/telegram-webhook`

Replace `<YOUR_BOT_TOKEN>` with your token and `<YOUR_APP_URL>` with your deployed app URL.

## Telegram Commands
- `/start` - Initialize the bot
- `/stats` - View visitor statistics (Coming soon)
- `/summary` - View chat summaries (Coming soon)

## Tech Stack
- Frontend: Next.js 15 (App Router), React 19, Tailwind CSS 4, Framer Motion
- Backend: Next.js API Routes
- AI: Google GenAI SDK (Gemini 3.1 Flash)
- Icons: Lucide React
