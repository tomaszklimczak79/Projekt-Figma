# Deployment Guide

Przewodnik wdrożenia projektu Premium Apple Store na różne platformy hostingowe.

## 📋 Pre-deployment Checklist

Przed wdrożeniem upewnij się, że:

- [ ] Kod buduje się lokalnie bez błędów: `pnpm build`
- [ ] Wszystkie TypeScript errors są naprawione: `tsc --noEmit`
- [ ] Environment variables są skonfigurowane (jeśli potrzebne)
- [ ] Assets są zoptymalizowane
- [ ] README.md jest aktualny

## 🚀 Vercel (Recommended)

Najszybszy sposób na deployment projektu Vite + React.

### Przez GitHub

1. Push code na GitHub
2. Wejdź na [vercel.com](https://vercel.com)
3. Kliknij "New Project"
4. Import repozytorium z GitHub
5. Vercel automatycznie wykryje Vite
6. Kliknij "Deploy"

### Przez CLI

```bash
# Zainstaluj Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**Konfiguracja:**
```json
// vercel.json (opcjonalnie)
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

## 🌐 Netlify

### Przez GitHub

1. Push code na GitHub
2. Wejdź na [netlify.com](https://netlify.com)
3. Kliknij "Add new site" → "Import from Git"
4. Wybierz repozytorium
5. Build settings:
   - **Build command:** `pnpm build`
   - **Publish directory:** `dist`
6. Kliknij "Deploy site"

### Przez CLI

```bash
# Zainstaluj Netlify CLI
npm i -g netlify-cli

# Build
pnpm build

# Deploy
netlify deploy --prod --dir=dist
```

**Konfiguracja:**
```toml
# netlify.toml
[build]
  command = "pnpm build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 📦 GitHub Pages

```bash
# Zainstaluj gh-pages
pnpm add -D gh-pages

# Dodaj do package.json
{
  "scripts": {
    "predeploy": "pnpm build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://tomaszklimczak79.github.io/premium-apple-store"
}

# Deploy
pnpm run deploy
```

**Uwaga:** Zaktualizuj `vite.config.ts`:
```ts
export default defineConfig({
  base: '/premium-apple-store/', // nazwa repo
  // ... rest of config
})
```

## 🔷 Azure Static Web Apps

### Przez Azure Portal

1. Wejdź na [portal.azure.com](https://portal.azure.com)
2. Create new "Static Web App"
3. Connect do GitHub
4. Build settings:
   - **App location:** `/`
   - **Api location:** (leave empty)
   - **Output location:** `dist`

### Przez CLI

```bash
# Zainstaluj Azure CLI
# https://docs.microsoft.com/cli/azure/install-azure-cli

# Login
az login

# Deploy
az staticwebapp create \
  --name premium-apple-store \
  --resource-group myResourceGroup \
  --source https://github.com/tomaszklimczak79/premium-apple-store \
  --location "West Europe" \
  --branch main \
  --app-location "/" \
  --output-location "dist"
```

## 🔶 AWS Amplify

### Przez AWS Console

1. Wejdź na [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Kliknij "New app" → "Host web app"
3. Connect GitHub
4. Build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install -g pnpm
           - pnpm install
       build:
         commands:
           - pnpm build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

## 🐳 Docker

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build
RUN pnpm build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

```nginx
# nginx.conf
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  # Cache static assets
  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

**Build & Run:**
```bash
# Build image
docker build -t premium-apple-store .

# Run container
docker run -p 8080:80 premium-apple-store
```

## 🔧 Environment Variables

Jeśli używasz zmiennych środowiskowych:

```bash
# .env.example
VITE_API_URL=https://api.example.com
VITE_STRIPE_KEY=pk_live_...
VITE_GA_ID=G-...
```

**Vercel/Netlify:**
- Dodaj w dashboard Settings → Environment Variables

**Docker:**
```bash
docker run -p 8080:80 \
  -e VITE_API_URL=https://api.example.com \
  premium-apple-store
```

## 🎯 Custom Domain

### Vercel
1. Settings → Domains
2. Add domain
3. Update DNS records (A/CNAME)

### Netlify
1. Domain settings → Add custom domain
2. Update DNS records

### Cloudflare (Optional)
- Enable CDN
- SSL/TLS
- Page Rules for caching

## 📊 Performance Optimization

### Pre-deployment

```bash
# Analyze bundle
pnpm add -D vite-plugin-bundle-visualizer

# vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    visualizer({ open: true })
  ]
})
```

### Recommendations

- ✅ Enable gzip/brotli compression
- ✅ Set proper cache headers
- ✅ Use CDN for static assets
- ✅ Enable HTTP/2
- ✅ Implement lazy loading
- ✅ Optimize images (WebP, lazy loading)
- ✅ Tree-shake unused code

## 🔍 Monitoring

### Free Tools

- [Google Analytics](https://analytics.google.com)
- [Vercel Analytics](https://vercel.com/analytics)
- [Sentry](https://sentry.io) (error tracking)
- [LogRocket](https://logrocket.com) (session replay)

### Setup Sentry

```bash
pnpm add @sentry/react @sentry/vite-plugin
```

```ts
// src/app/App.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-dsn",
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});
```

## 🚨 Troubleshooting

### Blank page after deploy
- Check browser console for errors
- Verify `base` in `vite.config.ts`
- Check 404 redirects configuration

### Assets not loading
- Verify paths start with `/`
- Check CDN configuration
- Clear cache

### Environment variables not working
- Must start with `VITE_`
- Rebuild after changing env vars
- Check provider-specific env var syntax

## 📞 Support

Issues z deployment? Sprawdź:
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)

---

**Happy Deploying!** 🚀
