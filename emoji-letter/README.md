# Emoji-Buchstaben

React Native (Expo) App, die Buchstaben mit Emojis **zeichnet** – wie Pixel-Schrift, nicht als 1:1-Ersatz (A → 🍎).

Aus `HI` wird zum Beispiel:

```
🔥   🔥  ⭐⭐⭐
🔥🔥🔥    ⭐
🔥   🔥  ⭐⭐⭐
```

## Funktionen

- Text eingeben und live als Emoji-Schrift sehen
- **Pro Buchstabe:** eigenes Zeichen-Emoji für A–Z, Umlaute und Ziffern
- **Zufällig:** jedes gefüllte Pixel bekommt ein zufälliges Emoji
- **Ein Emoji:** ein ausgewähltes Emoji zeichnet alle Buchstaben
- Zuordnungen speichern, zurücksetzen und die Zeichnung kopieren

## Architektur

Clean Architecture mit klar getrennten Schichten:

- `src/domain` – Entitäten, Repository-Interfaces, Use Cases
- `src/data` – Emoji-Katalog, 5×7-Buchstabenfont, Persistenz
- `src/presentation` – Screens, UI, Controller-Hook
- `src/di` – Composition Root

## Start

```bash
cd emoji-letter
npm install
npm start
```

## Tests

```bash
cd emoji-letter
npm test
```
