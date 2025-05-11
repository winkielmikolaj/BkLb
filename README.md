# BookLib - System Zarządzania Biblioteką

BookLib to nowoczesna aplikacja webowa do zarządzania biblioteką książek, umożliwiająca użytkownikom przeglądanie, dodawanie i zarządzanie swoimi książkami.

## Funkcjonalności

- Przeglądanie wszystkich dostępnych książek
- Osobista biblioteka użytkownika
- Panel administratora
- System autentykacji użytkowników
- Responsywny interfejs użytkownika
- Zarządzanie książkami (dodawanie, usuwanie, edycja)

## Technologie

### Frontend
- React.js
- React Icons (react-icons)
- Context API do zarządzania stanem
- CSS dla stylizacji

### Backend
- Node.js
- Express.js
- SQLite (better-sqlite3)

## Wymagania systemowe

- Node.js (wersja 14.0.0 lub nowsza)
- npm lub yarn

## Instalacja

1. Sklonuj repozytorium:
```bash
git clone [URL_REPOZYTORIUM]
cd BookLib
```

2. Zainstaluj zależności frontend:
```bash
cd frontend
npm install
```

3. Zainstaluj zależności backend:
```bash
cd ../backend
npm install
```

## Uruchomienie

1. Uruchom backend:
```bash
cd backend
npm start
```

2. Uruchom frontend:
```bash
cd frontend
npm start
```

Aplikacja będzie dostępna pod adresem `http://localhost:3000`

## Struktura projektu

```
BookLib/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   └── ...
│   ├── public/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── ...
│   └── package.json
└── README.md
```

## Role użytkowników

- **Użytkownik** - może przeglądać książki i zarządzać swoją biblioteką
- **Administrator** - ma dostęp do panelu administracyjnego i pełnej kontroli nad systemem

## Kontrybucja

1. Utwórz fork projektu
2. Utwórz nową gałąź dla swojej funkcjonalności (`git checkout -b feature/nowa-funkcjonalnosc`)
3. Zatwierdź zmiany (`git commit -am 'Dodano nową funkcjonalność'`)
4. Wypchnij zmiany do gałęzi (`git push origin feature/nowa-funkcjonalnosc`)
5. Utwórz Pull Request

## Licencja

Ten projekt jest udostępniany na licencji MIT. Szczegóły znajdują się w pliku [LICENSE](LICENSE).

## Kontakt

W przypadku pytań lub sugestii, prosimy o kontakt przez system issues na GitHubie. 