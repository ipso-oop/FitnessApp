# Emoji Letter Studio

Emoji Letter Studio ist eine React-Native-App mit Expo. Die App nimmt Text als Eingabe und rendert Buchstaben, Zahlen und einfache Satzzeichen als 5x5-Emoji-Kunst.

## Features

- Texteingabe fuer eigene Nachrichten
- Darstellung mit einem spezifischen Emoji
- Random-Modus mit stabil neu wuerfelbaren Emojis
- Individuelle Emoji-Auswahl pro Buchstabe
- Saubere Schichten nach Clean Architecture

## Architektur

```text
src/
  domain/        Fachlogik, Typen und Buchstabenmuster
  data/          Emoji-Kataloge und austauschbare Datenquellen
  application/   ViewModel und UI-State-Orchestrierung
  presentation/  React-Native-Komponenten und Theme
```

Die Rendering-Logik liegt in `src/domain/services/EmojiTextRenderer.ts` und ist unabhaengig von React testbar.

## Installation

```bash
npm install
```

## Entwicklung

```bash
npm start
```

Weitere Skripte:

```bash
npm run android
npm run ios
npm run typecheck
```

## Nutzung

1. Text eingeben.
2. Modus waehlen:
   - **Ein Emoji**: ein gewaehltes Emoji fuer alle Zeichen.
   - **Random**: zufaellige Emojis aus dem Katalog.
   - **Pro Buchstabe**: einzelne Buchstaben aus dem Text bekommen eigene Emojis.
3. Vorschau markieren und kopieren.
