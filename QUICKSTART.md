# Quick Start Guide

Szybki start dla deweloperów chcących uruchomić projekt lokalnie.

## ⚡ 5-minutowy setup

### 1. Prerequisites

Upewnij się, że masz zainstalowane:
- **Node.js** 18+ ([download](https://nodejs.org/))
- **pnpm** ([install](https://pnpm.io/installation))

Sprawdź wersje:
```bash
node --version  # v18.0.0 lub wyżej
pnpm --version  # v8.0.0 lub wyżej
```

### 2. Clone & Install

```bash
# Clone repozytorium
git clone https://github.com/tomaszklimczak79/premium-apple-store.git
cd premium-apple-store

# Zainstaluj zależności (może potrwać 1-2 minuty)
pnpm install
```

### 3. Run

```bash
# Uruchom dev server
pnpm dev
```

Otwórz **http://localhost:5173** w przeglądarce 🎉

## 🎨 Dostępne komendy

```bash
# Development server (hot reload)
pnpm dev

# Production build
pnpm build

# Preview production build lokalnie
pnpm preview
```

## 📁 Co gdzie znajdę?

```
src/app/
├── pages/           ← Wszystkie strony (HomePage, CategoryPage, etc.)
├── components/      ← Komponenty UI (Navbar, Footer, ProductCard, etc.)
├── store/           ← Stan aplikacji (koszyk, wishlist, etc.)
├── data/           ← Mock produkty i dane
└── App.tsx         ← Entry point

src/styles/
├── theme.css       ← Kolory i typografia
├── globals.css     ← Globalne style
└── fonts.css       ← Fonty
```

## 🚀 Pierwsze kroki

### Sprawdź stronę główną
```
http://localhost:5173/
```
- 10 sekcji
- Hero, Trust Bar, Featured Products, Categories, Why Buy, Deals, Reviews, FAQ, Newsletter, Footer

### Przetestuj kategorie
```
http://localhost:5173/category/macbooks
http://localhost:5173/category/ipads
http://localhost:5173/category/imacs
```
- Kliknij "Filter & Sort" - drawer wysuwa się z prawej
- Użyj filtrów (cena, procesor, RAM, storage)
- Sprawdź sortowanie

### Sprawdź sklep
```
http://localhost:5173/shop
```
- Wszystkie produkty z filtrami
- Drawer z prawej strony

### Dodaj do koszyka
- Kliknij dowolny produkt → "Add to Cart"
- Koszyk wysuwa się automatycznie
- Stan zapisuje się w localStorage

### Wishlist
- Kliknij ikonę serca na produkcie
- Toast notification pojawi się

### Porównywarka
- "Compare" na max 3 produktach
- Sticky bar na dole ekranu

## 🎯 Typowe zadania

### Dodaj nowy produkt
Edytuj `/src/app/data/products.ts`:
```ts
{
  id: 'new-product-1',
  name: 'MacBook Air 13" M4',
  shortName: 'MacBook Air 13"',
  category: 'macbook',
  chip: 'M4',
  // ... rest of fields
}
```

### Zmień kolory
Edytuj `/src/styles/theme.css`:
```css
:root {
  --color-blue: #0071e3;  /* niebieski akcent */
  --color-gray-dark: #1d1d1f;  /* ciemny tekst */
  /* ... */
}
```

### Dodaj nową stronę
1. Stwórz komponent w `/src/app/pages/MyPage.tsx`
2. Dodaj route w `/src/app/App.tsx`:
```ts
{ path: '/my-page', Component: MyPage }
```

### Dodaj komponent
Stwórz w `/src/app/components/MyComponent.tsx`:
```tsx
interface MyComponentProps {
  title: string;
}

export function MyComponent({ title }: MyComponentProps) {
  return <div>{title}</div>;
}
```

Import i użyj:
```tsx
import { MyComponent } from './components/MyComponent';
<MyComponent title="Hello" />
```

## 🐛 Troubleshooting

### Port 5173 zajęty
```bash
# Vite automatycznie użyje następnego dostępnego portu
# lub ustaw custom port:
pnpm dev --port 3000
```

### pnpm install fails
```bash
# Wyczyść cache
pnpm store prune

# Spróbuj ponownie
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Build errors
```bash
# TypeScript errors
tsc --noEmit

# Clear cache i rebuild
rm -rf dist node_modules/.vite
pnpm build
```

### Strona nie ładuje się
- Sprawdź console w DevTools (F12)
- Sprawdź czy dev server działa
- Hard refresh: Ctrl+Shift+R (Windows) lub Cmd+Shift+R (Mac)

## 📚 Następne kroki

1. ✅ Przeczytaj [README.md](./README.md) - pełna dokumentacja
2. ✅ Zobacz [CONTRIBUTING.md](./CONTRIBUTING.md) - jak kontrybuować
3. ✅ Sprawdź [DEPLOYMENT.md](./DEPLOYMENT.md) - jak wdrożyć
4. 🎨 Eksperymentuj z kodem!
5. 🐛 Zgłoś bugi jeśli znajdziesz
6. 💡 Zaproponuj nowe funkcjonalności

## 💬 Pytania?

- 📖 Dokumentacja: [README.md](./README.md)
- 🐛 Problemy: [GitHub Issues](https://github.com/tomaszklimczak79/premium-apple-store/issues)
- 💬 Dyskusje: [GitHub Discussions](https://github.com/tomaszklimczak79/premium-apple-store/discussions)

---

**Powodzenia!** 🚀

Potrzebujesz pomocy? Otwórz issue na GitHub.
