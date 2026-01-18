# PromptCraft

An AI-powered prompt engineering tool that helps users generate optimized prompts for various LLMs.

## Features

- 🎯 **Multi-Model Support**: Optimize prompts for GPT-4o, Claude, Gemini, Llama, Mistral, and more
- ⚡ **Instant Generation**: Get production-ready prompts in seconds
- 📊 **Token Estimation**: See word and token counts for your generated prompts
- 🎨 **Beautiful UI**: Glass-morphism design with smooth animations
- 🔍 **SEO Optimized**: Built with Astro for excellent SEO and performance

## Tech Stack

- **Framework**: [Astro](https://astro.build) - Static site generation with islands architecture
- **UI**: [React](https://react.dev) - Interactive components
- **Styling**: [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- **AI**: [Google Gemini](https://ai.google.dev) - Prompt optimization

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Add your Gemini API key to .env.local
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Preview

```bash
pnpm preview
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PUBLIC_GEMINI_API_KEY` | Your Google Gemini API key |

## SEO Features

- ✅ Semantic HTML structure
- ✅ Open Graph meta tags
- ✅ Twitter Card meta tags
- ✅ Structured data (JSON-LD)
- ✅ Sitemap generation
- ✅ robots.txt
- ✅ Canonical URLs

## License

MIT © [ImajinX](https://imajinx.co)
