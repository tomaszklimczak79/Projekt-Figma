# Premium Apple Store - Certified Used & Open Box

Premium sklep e-commerce z certyfikowanymi używanymi i otwartymi produktami Apple (MacBooki, iPady, iMaki, iPhone'y), inspirowany designem oficjalnej strony Apple.

![Version](https://img.shields.io/badge/version-4.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 📸 Screenshots

![Homepage Hero](https://via.placeholder.com/1200x600/0071e3/ffffff?text=Homepage+Hero)
![Product Grid](https://via.placeholder.com/1200x600/f5f5f7/1d1d1f?text=Product+Grid+with+Filters)
![Cart Drawer](https://via.placeholder.com/600x800/ffffff/0071e3?text=Cart+Drawer)

> **Note:** Replace these placeholders with actual screenshots after deployment

## ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/tomaszklimczak79/premium-apple-store.git
cd premium-apple-store

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open **http://localhost:5173** 🚀

For detailed setup instructions, see [QUICKSTART.md](./QUICKSTART.md)

## 🎨 Design

Minimalistyczny layout w stylu Apple:
- Białe tło (#FFFFFF) i jasny szary (#F5F5F7)
- Ciemny grafit (#1D1D1F) dla kontrastów
- Niebieski akcent (#0071E3)
- Dużo białej przestrzeni (white space)
- Elegancka typografia podobna do San Francisco
- Płynne animacje z Motion (Framer Motion)
- Responsywny design mobile-first

## ✨ Features

### Strona główna (10 sekcji)
1. **Hero** - duże zdjęcie MacBooka z CTA
2. **Trust Bar** - gwarancja 12 miesięcy, testowane urządzenia, zdrowie baterii, szybka wysyłka, bezpieczne płatności
3. **Featured MacBooks** - karty produktów z kondycją (Open Box/Excellent/Like New)
4. **Kategorie produktów** - MacBooks, iPads, iMacs, Accessories
5. **Why Buy From Us** - argumenty za zakupem
6. **Banner promocyjny** - aktualne oferty
7. **Recenzje klientów** - testimonials z ocenami
8. **FAQ** - najczęściej zadawane pytania
9. **Newsletter** - formularz zapisu
10. **Footer** - linki, kontakt, social media

### E-commerce
- ✅ **Koszyk** z localStorage persistence
- ✅ **Wishlist** - lista życzeń
- ✅ **Porównywarka produktów** (max 3 jednocześnie)
- ✅ **Toast notifications** dla akcji użytkownika
- ✅ **Walidacja formularzy** w checkout
- ✅ **Loading states** podczas ładowania
- ✅ **Empty states** dla pustych list
- ✅ **"Buy Now"** button - szybki zakup
- ✅ **"Recently Viewed"** - ostatnio oglądane
- ✅ **Free shipping progress bar** w koszyku
- ✅ **Out-of-stock states** na kartach produktów

### Strony kategorii
- **Hero bannery** z obrazami i ciemnym gradientem
- **Filtry jako overlay drawer** wysuwający się z prawej strony
- Przycisk **"✕ Close"** w nagłówku drawera
- Niebieski przycisk **"Show X results"** na dole
- Zamykanie przez kliknięcie **backdrop**
- **Brak zmiany layoutu** strony (overlay)

### Filtry
- Cena (range slider)
- Stan produktu (Open Box, Like New, Excellent, Good)
- Procesor (M4, M3 Max, M3 Pro, M3, M2 Pro, M2, M1, A17 Pro, H2)
- RAM (8GB, 16GB, 18GB, 24GB, 32GB, 48GB)
- Pamięć (256GB, 512GB, 1TB, 2TB)
- Wyszukiwarka produktów

### Sortowanie
- Featured (polecane)
- Price: Low to High
- Price: High to Low
- Best Savings
- Top Rated
- Newest

## 🛠️ Tech Stack

- **React 18.3.1**
- **TypeScript**
- **Vite 6.3.5** - build tool
- **Tailwind CSS 4.1.12** - styling
- **Motion (Framer Motion) 12.23** - animacje
- **React Router 7.13** - routing
- **Lucide React** - ikony
- **Sonner** - toast notifications
- **Material UI** - komponenty UI
- **Recharts** - wykresy (jeśli będą potrzebne)

## 📦 Instalacja

```bash
# Zainstaluj zależności
pnpm install

# Uruchom dev server
pnpm dev

# Build produkcyjny
pnpm build
```

## 📁 Struktura projektu

```
src/
├── app/
│   ├── components/          # Komponenty React
│   │   ├── ui/             # Komponenty UI (shadcn-inspired)
│   │   ├── CartDrawer.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx
│   │   └── ...
│   ├── pages/              # Strony aplikacji
│   │   ├── HomePage.tsx
│   │   ├── CategoryPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   └── ...
│   ├── store/              # Context API (stan aplikacji)
│   │   └── AppContext.tsx
│   ├── data/               # Mock data
│   │   └── products.ts
│   ├── utils/              # Utility functions
│   └── App.tsx             # Main App component
├── styles/                 # Style files
│   ├── globals.css
│   ├── theme.css
│   └── fonts.css
└── imports/                # Imported assets
```

## 🎯 Główne strony

- `/` - Strona główna
- `/categories/macbooks` - Kategoria MacBooks
- `/categories/ipads` - Kategoria iPads
- `/categories/imacs` - Kategoria iMacs
- `/shop` - Wszystkie produkty z filtrami
- `/shop/:category` - Produkty z danej kategorii
- `/product/:id` - Szczegóły produktu
- `/cart` - Koszyk
- `/checkout` - Checkout
- `/compare` - Porównywarka produktów
- `/contact` - Kontakt
- `/faq` - FAQ

## 🔧 Konfiguracja

### Environment Variables
Obecnie projekt działa bez zmiennych środowiskowych (mock data).

W przyszłości możesz dodać:
```env
VITE_API_URL=https://api.example.com
VITE_STRIPE_KEY=pk_...
```

## 🚀 Deployment

### Netlify / Vercel
```bash
pnpm build
# Deploy folder: dist/
```

### Custom server
```bash
pnpm build
# Serve static files from dist/
```

## 📝 TODO / Roadmap

- [ ] Integracja z prawdziwym API
- [ ] System płatności (Stripe/PayPal)
- [ ] Panel administracyjny
- [ ] Zarządzanie zamówieniami
- [ ] System rabatów/kuponów
- [ ] Integracja z kurierami
- [ ] Email notifications
- [ ] SEO optimization
- [ ] PWA support
- [ ] Multi-language support

## 🤝 Contributing

Pull requests są mile widziane! Dla większych zmian, otwórz najpierw issue.

## 📄 License

MIT License - możesz swobodnie używać tego projektu.

## 👨‍💻 Author

Tomasz Klimczak - [@tomaszklimczak79](https://github.com/tomaszklimczak79)

## 🙏 Acknowledgments

- Design inspirowany oficjalną stroną Apple
- Shadcn/ui za komponenty UI
- Unsplash za zdjęcia produktów (mockup)

---

**Version 4** - Ostatnia aktualizacja: 14.07.2026