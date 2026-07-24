# Contributing to Premium Apple Store

Dziękujemy za zainteresowanie projektem! 🎉

## 🚀 Quick Start

1. **Fork** repozytorium
2. **Clone** swojego forka:
   ```bash
   git clone https://github.com/your-username/premium-apple-store.git
   cd premium-apple-store
   ```
3. Zainstaluj zależności:
   ```bash
   pnpm install
   ```
4. Uruchom dev server:
   ```bash
   pnpm dev
   ```

## 📝 Development Workflow

### Tworzenie nowej funkcjonalności

1. Utwórz nowy branch z `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Wprowadź zmiany i commituj z opisowymi wiadomościami:
   ```bash
   git commit -m "feat: add product comparison chart"
   ```

3. Push branch do swojego forka:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Otwórz **Pull Request** do głównego repozytorium

### Commit Convention

Używamy [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - nowa funkcjonalność
- `fix:` - naprawa błędu
- `docs:` - zmiany w dokumentacji
- `style:` - formatowanie, brakujące średniki itp.
- `refactor:` - refaktoryzacja kodu
- `test:` - dodawanie testów
- `chore:` - aktualizacje narzędzi, konfiguracji

**Przykłady:**
```bash
git commit -m "feat: add wishlist persistence"
git commit -m "fix: resolve cart total calculation bug"
git commit -m "docs: update README with deployment steps"
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/          # Reusable React components
│   │   ├── ui/             # UI primitives
│   │   └── ...
│   ├── pages/              # Route components
│   ├── store/              # Context API state
│   ├── data/               # Mock data & types
│   └── utils/              # Helper functions
├── styles/                 # Global styles
└── imports/                # Static assets
```

## 🎨 Styling Guidelines

- Używamy **Tailwind CSS v4** do stylowania
- Inline Tailwind classes dla komponentów
- Kolory z `theme.css` dla spójności:
  - `#FFFFFF` - białe tło
  - `#F5F5F7` - jasny szary
  - `#1D1D1F` - ciemny grafit
  - `#0071E3` - niebieski akcent
- Przestrzegaj **mobile-first** approach

## 🧩 Component Guidelines

### Tworzenie nowego komponentu

1. Umieść w `/src/app/components/`
2. Użyj TypeScript dla props
3. Export jako named export:

```tsx
interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

export function MyComponent({ title, onClick }: MyComponentProps) {
  return (
    <button onClick={onClick} className="...">
      {title}
    </button>
  );
}
```

### Component Checklist

- [ ] TypeScript interfaces dla props
- [ ] Responsive design (mobile-first)
- [ ] Accessibility (ARIA labels, keyboard nav)
- [ ] Loading states gdzie potrzebne
- [ ] Error states gdzie potrzebne
- [ ] Animations (używaj Motion z `motion/react`)

## 🧪 Testing

Obecnie projekt nie ma testów, ale planujemy dodać:
- Unit tests (Vitest)
- Component tests (React Testing Library)
- E2E tests (Playwright)

**Kontrybucje w tym obszarze są mile widziane!**

## 📋 Pull Request Process

1. Upewnij się, że kod buduje się bez błędów:
   ```bash
   pnpm build
   ```

2. Sprawdź czy nie ma TypeScript errors:
   ```bash
   tsc --noEmit
   ```

3. Opisz swoje zmiany w PR:
   - **Co** zostało zmienione
   - **Dlaczego** była potrzebna ta zmiana
   - **Jak** przetestować zmiany
   - Screenshoty/GIFy dla UI changes

4. Link do powiązanych issues (jeśli istnieją)

5. Poczekaj na review - odpowiemy jak najszybciej! 🚀

## 🐛 Zgłaszanie błędów

Znalazłeś bug? Pomóż nam go naprawić!

1. Sprawdź czy issue nie został już zgłoszony
2. Otwórz nowy issue z tagiem `bug`
3. Dołącz:
   - Opis problemu
   - Kroki do reprodukcji
   - Oczekiwane zachowanie
   - Aktualne zachowanie
   - Screenshots/screen recordings
   - Browser/OS info

## 💡 Propozycje funkcjonalności

Masz pomysł na nową funkcjonalność?

1. Otwórz issue z tagiem `enhancement`
2. Opisz:
   - Problem który rozwiązuje
   - Proponowane rozwiązanie
   - Alternatywne podejścia
   - Mockupy/wireframes (jeśli dotyczy UI)

## 🎯 Priorytetowe obszary

Szukamy pomocy w:

- [ ] Integracja z prawdziwym API
- [ ] System płatności (Stripe)
- [ ] Testy jednostkowe i E2E
- [ ] SEO optimization
- [ ] Accessibility improvements
- [ ] Performance optimization
- [ ] Dokumentacja API
- [ ] Multi-language support

## 📚 Resources

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS v4 Docs](https://tailwindcss.com)
- [Motion (Framer Motion) Docs](https://motion.dev)

## 📞 Pytania?

- Otwórz [Discussion](https://github.com/tomaszklimczak79/premium-apple-store/discussions)
- Napisz issue z tagiem `question`

## 🌟 Contributors

Dziękujemy wszystkim którzy przyczynili się do rozwoju projektu!

<!-- Add contributor list here -->

---

**Miłych commitów!** 🚀
