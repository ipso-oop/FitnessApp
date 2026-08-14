# Emoji Text Native App

Eine React-Native-App (Expo), die eingegebenen Text in Emojis umwandelt.

## Features

- **Pro Buchstabe**: Für jeden Buchstaben kann ein eigenes Emoji gewählt werden.
- **Zufällig**: Jeder Buchstabe wird zufällig aus dem Emoji-Pool ersetzt.
- **Ein Emoji**: Alle Buchstaben werden mit demselben Emoji ersetzt.

Nicht-Buchstaben (Leerzeichen, Zahlen, Satzzeichen) bleiben unverändert.

## Clean-Architecture-Struktur

```text
src/
  domain/
    models/
    repositories/
    services/
    usecases/
  infrastructure/
    repositories/
  application/
    hooks/
    services/
  presentation/
    components/
    screens/
```

## Starten

```bash
cd mobile-app
npm install
npm run start
```

## Domain-Tests ausführen

```bash
cd mobile-app
npm run test:domain
```
