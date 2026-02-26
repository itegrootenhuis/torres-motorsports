# Torres Motorsports Website

Official website for Ricardo Torres and Torres Motorsports - a professional motorsports racer website built with Next.js and Sanity CMS.

## Project Structure

```
uve/
├── app/                    # Next.js frontend application
│   ├── src/
│   │   ├── app/           # Next.js App Router pages
│   │   ├── components/    # React components
│   │   ├── lib/           # Utility functions and Sanity client
│   │   └── types/         # TypeScript type definitions
│   └── ...
│
└── studio/                 # Sanity Studio (CMS)
    ├── schemas/           # Content schemas
    └── ...
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install frontend dependencies:**
   ```bash
   cd app
   npm install
   ```

2. **Install studio dependencies:**
   ```bash
   cd studio
   npm install
   ```

### Development

1. **Run the Next.js frontend:**
   ```bash
   cd app
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

2. **Run Sanity Studio:**
   ```bash
   cd studio
   npm run dev
   ```
   Open [http://localhost:3333](http://localhost:3333)

## Features

- **Hero Section** - Full-screen parallax hero with customizable image and text
- **Bio Section** - Flexible layout (with/without image) with rich text support
- **News Section** - Display up to 3 latest news articles with external links
- **Video Section** - YouTube video player with carousel of additional videos
- **Gallery** - Full-width image gallery with lightbox and lazy loading
- **Sponsors** - 4-column sponsor grid with optional links
- **Contact Form** - Modal contact form with validation (reCAPTCHA ready)
- **Cookie Consent** - GDPR-compliant cookie consent banner
- **Legal Pages** - Dynamic Privacy Policy and Terms of Use pages

## Sanity Studio Content Types

| Content Type | Description |
|-------------|-------------|
| Site Settings | Logo, social links, footer configuration |
| Hero | Hero image and optional heading/subheading |
| Bio | About section with optional image and rich text |
| News Article | Title, image, date, body, external link |
| Video | YouTube URL with optional title |
| Gallery Image | Image with alt text and display order |
| Sponsor | Logo, alt text, link, display order |
| Legal Page | Title, slug, rich text body |

## Environment Variables

The Sanity project ID is already configured:
- **Project ID:** `94ennmup`
- **Dataset:** `production`

### reCAPTCHA Setup (Optional)

To enable reCAPTCHA on the contact form:

1. Get your reCAPTCHA v3 keys from [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
2. Uncomment the reCAPTCHA script in `app/src/app/layout.tsx`
3. Uncomment the reCAPTCHA code in `app/src/components/ContactForm.tsx`
4. Replace `YOUR_SITE_KEY` with your actual site key

## SEO

The site is optimized for:
- **Primary Keywords:** Torres Motorsports, Ricardo Torres, Ricardo Torres Racing
- **Structured Data:** Organization, Person, and WebSite schemas
- **Open Graph & Twitter Cards:** Social media sharing optimization
- **Semantic HTML:** Proper heading hierarchy and accessibility

## Color Palette

- **Background:** Black (`#000000`)
- **Buttons:** Red (`#DC2626`)
- **Header/Footer:** White (`#FFFFFF`)

## Deployment

### Frontend (Vercel recommended)

```bash
cd app
npm run build
```

### Sanity Studio

```bash
cd studio
npm run deploy
```

## License

© Torres Motorsports. All rights reserved.
