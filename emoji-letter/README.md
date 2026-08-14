# Emoji-Buchstaben

React Native (Expo) App, die jeden Buchstaben eines Textes als Emoji darstellt.

## Funktionen

- Text eingeben und live als Emojis sehen
- **Pro Buchstabe:** eigenes Emoji für A–Z, Umlaute und Ziffern
- **Zufällig:** jedes Zeichen bekommt ein zufälliges Emoji
- **Ein Emoji:** ein ausgewähltes Emoji für alle Buchstaben
- Zuordnungen speichern, zurücksetzen und Ergebnis kopieren

## Architektur

Clean Architecture mit klar getrennten Schichten:

- `src/domain` – Entitäten, Repository-Interfaces, Use Cases
- `src/data` – Emoji-Katalog, Persistenz, Zufallsquelle
- `src/presentation` – Screens, UI-Komponenten, Controller-Hook
- `src/di` – Composition Root

Die Präsentation kennt nur Use Cases, nicht AsyncStorage oder den Katalog.

## Start

```bash
cd emoji-letter
npm install
npm start
```

Danach iOS, Android oder Web im Expo-Menü wählen.

## Tests

```bash
cd emoji-letter
npm test
```
