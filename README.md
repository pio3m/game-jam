# 🎮 Skansen Game Jam 2025

**40-godzinny maraton tworzenia gier w Sierpcu z celem charytatywnym**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue)](https://skansen-gamejam.pl)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 📋 Spis treści

- [O projekcie](#-o-projekcie)
- [Funkcjonalności](#-funkcjonalności)
- [Technologie](#-technologie)
- [Instalacja](#-instalacja)
- [Struktura projektu](#-struktura-projektu)
- [Konfiguracja](#-konfiguracja)
- [Użycie](#-użycie)
- [Wkład w projekt](#-wkład-w-projekt)
- [Licencja](#-licencja)
- [Kontakt](#-kontakt)

## 🎯 O projekcie

**Skansen Game Jam 2025** to oficjalna strona internetowa 40-godzinnego maratonu tworzenia gier komputerowych w Sierpcu. Wydarzenie łączy pasję do gamedevu z celem charytatywnym - wsparciem zbiórki dla Łukasza, który walczy z agresywnym nowotworem.

### 🎪 Kluczowe informacje

- **Data:** 7-9 listopada 2025
- **Lokalizacja:** Hotel w Skansenie Sierpc + wersja online na itch.io
- **Czas trwania:** 40 godzin
- **Limit uczestników:** 12 osób stacjonarnie, bez limitu online
- **Cel charytatywny:** Wsparcie zbiórki dla Łukasza

## ✨ Funkcjonalności

### 🌐 Wielojęzyczność
- **Polski i angielski** - pełne wsparcie dla obu języków
- **Przełącznik języków** - płynne przełączanie bez przeładowania strony
- **Lokalizacja treści** - wszystkie sekcje dostosowane do wybranego języka

### 📱 Responsywność
- **Mobile-first design** - optymalizacja dla urządzeń mobilnych
- **Adaptacyjny layout** - dostosowanie do wszystkich rozmiarów ekranów
- **Touch-friendly** - przyjazne dla dotyku elementy interfejsu

### 🎨 Nowoczesny design
- **Gradient backgrounds** - nowoczesne tła z gradientami
- **Glassmorphism** - efekty szkła i rozmycia
- **Smooth animations** - płynne animacje i przejścia
- **Dark theme** - ciemny motyw z akcentami kolorów

### 🧭 Nawigacja
- **Sticky navigation** - przyklejona nawigacja z efektem blur
- **Smooth scrolling** - płynne przewijanie do sekcji
- **Mobile menu** - responsywne menu mobilne
- **Breadcrumbs** - ścieżka nawigacji

### 📊 Interaktywne elementy
- **FAQ accordion** - rozwijane sekcje pytań i odpowiedzi
- **Gallery modal** - modalne okna galerii
- **Progress bars** - paski postępu zbiórki
- **Hover effects** - efekty najechania myszką

## 🛠 Technologie

### Frontend
- **HTML5** - semantyczna struktura
- **CSS3** - nowoczesne style z flexbox i grid
- **Vanilla JavaScript** - czysty JS bez frameworków
- **SVG Icons** - skalowalne ikony wektorowe

### Narzędzia
- **CSS Build System** - automatyczne minifikowanie CSS
- **Git** - kontrola wersji
- **Responsive Design** - mobile-first approach

### Zewnętrzne serwisy
- **itch.io** - platforma dla wersji online
- **GoFundMe** - integracja z zbiórką charytatywną
- **Hotel Skansen** - partner wydarzenia

## 🚀 Instalacja

### Wymagania
- Przeglądarka internetowa (Chrome, Firefox, Safari, Edge)
- Serwer HTTP (dla lokalnego rozwoju)

### Szybki start

1. **Sklonuj repozytorium**
   ```bash
   git clone https://github.com/username/skansen-gamejam-2025.git
   cd skansen-gamejam-2025
   ```

2. **Otwórz w przeglądarce**
   ```bash
   # Użyj lokalnego serwera HTTP
   python -m http.server 8000
   # lub
   npx serve .
   ```

3. **Otwórz w przeglądarce**
   ```
   http://localhost:8000
   ```

## 📁 Struktura projektu

```
skansen-gamejam-2025/
├── 📄 index.html              # Główna strona
├── 📁 assets/
│   ├── 📁 css/
│   │   ├── 📄 styles.min.css   # Zminifikowane style
│   │   ├── 📁 src/            # Źródłowe pliki CSS
│   │   │   ├── 📄 base.css    # Style bazowe
│   │   │   ├── 📄 components.css # Komponenty
│   │   │   ├── 📄 layout.css  # Layout
│   │   │   └── 📄 utilities.css # Narzędzia
│   │   └── 📄 build-css.sh    # Skrypt budowania
│   └── 📁 images/             # Obrazy i ikony
├── 📁 docs/
│   └── 📄 CLAUDE.md          # Dokumentacja AI
└── 📄 README.md              # Ten plik
```

## ⚙️ Konfiguracja

### CSS Build System

Projekt używa prostego systemu budowania CSS:

```bash
# Zbuduj style
cd assets/css
./build-css.sh
```

### Zmienne CSS

Główne kolory i wartości w `assets/css/src/base.css`:

```css
:root {
  --primary-blue: #60a5fa;
  --primary-green: #4ade80;
  --background-dark: #0f172a;
  --text-light: #ffffff;
}
```

## 🎮 Użycie

### Nawigacja
- **Desktop:** Użyj menu górnego do nawigacji
- **Mobile:** Kliknij hamburger menu
- **Języki:** Przełącznik PL/EN w prawym górnym rogu

### Sekcje strony
1. **Hero Banner** - główne informacje o wydarzeniu
2. **Szczegóły wydarzenia** - agenda, lokalizacja, pakiety
3. **Cel charytatywny** - historia Łukasza i zbiórka
4. **Zapisy i udział** - formularze i wymagania
5. **Partnerzy** - organizacje wspierające
6. **FAQ** - najczęściej zadawane pytania
7. **Kontakt** - dane kontaktowe

### Funkcje interaktywne
- **FAQ:** Kliknij pytanie, aby rozwinąć odpowiedź
- **Galeria:** Kliknij zdjęcie, aby otworzyć w pełnym rozmiarze
- **Języki:** Przełącznik automatycznie aktualizuje treść

## 🤝 Wkład w projekt

### Jak pomóc
1. **Fork** repozytorium
2. **Stwórz branch** dla swojej funkcji (`git checkout -b feature/AmazingFeature`)
3. **Commit** zmiany (`git commit -m 'Add some AmazingFeature'`)
4. **Push** do branch (`git push origin feature/AmazingFeature`)
5. **Otwórz Pull Request**

### Zgłaszanie błędów
Użyj [GitHub Issues](https://github.com/username/skansen-gamejam-2025/issues) do zgłaszania błędów.

### Propozycje funkcji
Wszelkie propozycje są mile widziane! Otwórz issue z tagiem `enhancement`.

## 📄 Licencja

Ten projekt jest licencjonowany na licencji MIT - zobacz plik [LICENSE](LICENSE) dla szczegółów.

## 📞 Kontakt

**Organizator:** Piotr Dul  
**Email:** kontakt@skansen-gamejam.pl  
**Telefon:** +48 000 000 000

### Linki
- 🌐 [Strona wydarzenia](https://skansen-gamejam.pl)
- 🎮 [itch.io Jam](https://itch.io/jam/skansen-game-jam-2025)
- 🏨 [Hotel Skansen](https://www.hotelskansen.pl/)
- 💝 [Zbiórka dla Łukasza](https://gofund.me/ef9d8d162)

---

<div align="center">

**Stworzone z ❤️ dla społeczności gamedev w Polsce**

[⬆ Wróć na górę](#-skansen-game-jam-2025)

</div>
