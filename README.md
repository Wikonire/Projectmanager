# ProjectManager - Full-Stack Projekt
Willkommen im **ProjectManager**, einem Full-Stack-Projekt, das im Rahmen der Ausbildung zur Applikationsentwickler*in HF an der TEKO entwickelt wurde. Dieses Projekt dient als praktische Anwendung für das Fach **System- und Softwareengineering**, betreut von der Lehrperson **Patrick Graber**.
## Inhaltsverzeichnis
1. [Projektbeschreibung](#projektbeschreibung)
2. [Technologien](#technologien)
3. [Projektstruktur](#projektstruktur)
4. [Frontend](#frontend)
    - Technologien und Tools
    - Aufbau und Funktionen

5. [Backend](#backend)
    - Technologien und Tools
    - Aufbau und Funktionen

6. [Setup und Installation](#setup-und-installation)
7. [Lizenz](#lizenz)
8. [Kontakt](#kontakt)

## Projektbeschreibung
**ProjectManager** ist eine webbasierte Anwendung zur Verwaltung von Projekten. Das Ziel ist die praxisnahe Umsetzung eines Full-Stack-Projekts, das sowohl Backend- als auch Frontend-Komponenten umfasst. Das Projekt ist für die Studierende der HF-Applikationsentwicklung ein wertvolles Übungsszenario, bei dem möglichst moderne Entwicklungsmethoden und Technologien angewendet werden.
Funktionen des Projekts umfassen:
- **Projektverwaltung:** Erstellen, Bearbeiten und Löschen von Projekten.
- **Benutzerverwaltung:** Authentifizierung und Autorisierung von Nutzern.
- **Dashboard:** Übersicht über Projekte und Fortschritt.
- **REST API:** Kommunikation zwischen Frontend und Backend.

## Technologien
Das Projekt basiert auf einem modernen Full-Stack-Technologie-Stack, um ein realistisches Entwicklungsumfeld zu schaffen.
### Gemeinsam verwendete Tools
- **TypeScript**: Typsichere Implementierung für Frontend und Backend.
- **Git**: Versionskontrolle zur Zusammenarbeit und Nachverfolgung von Änderungen.
- **npm**: Paketmanager für die Installation und Verwaltung von Abhängigkeiten.

### Frontend
- **Angular**: Framework zur Entwicklung des Web-Frontends.
- **HTML, CSS**: Struktur und Style der Benutzeroberfläche.
- **RxJS**: Reaktives Programmieren für das Datenmanagement.

### Backend
- **NestJS**: Backend-Framework für skalierbare Serveranwendungen.
- **TypeORM**: ORM für die Datenbankintegration.
- **PostgreSQL**: Datenbank für die Speicherung der Anwendungsdaten.
- **JWT**: Authentifizierung mittels JSON Web Tokens.

## Projektstruktur
Die Projektstruktur ist in separate Bereiche aufgeteilt, um die Modularität zu wahren und die Entwicklung zu erleichtern.
``` plaintext
Projectmanager
├── .idea               // IDE-spezifische Konfigurationsdateien
├── back-manager        // Backend-Komponenten und Serverlogik
├── front-manager       // Frontend-Komponenten und UI
├── LICENSE             // Lizenzinformationen
├── Projectmanager.iml  // Projektdatei für IntelliJ IDEA
```
### Beschreibung
1. **back-manager**
   Enthält das Backend des Projekts, basierend auf NestJS. Hier finden sich die Controller, Services, Module und Datenbankanbindungen.
2. **front-manager**
   Das Frontend des Projekts, entwickelt mit Angular. Dieser Ordner enthält die Komponenten, Styles, Services, und Routings.
3. **LICENSE**
   Definiert die Lizenz, unter der das Projekt veröffentlicht wird.

## Frontend
### Technologien und Tools
Das Frontend des Projekts basiert auf Angular in der Version `17.3.0`. Es wird TypeScript als Sprache genutzt, zusätzlich kommen HTML und SCSS zum Einsatz. Die navigation erfolgt über das Angular-Router-Modul.
### Aufbau und Funktionen
Das Frontend ist modular aufgebaut und enthält u.a. die folgenden Hauptkomponenten:
- **Login-Seite:** Authentifizieren von Benutzern.
- **Dashboard:** Übersicht über alle Projekte und Statistiken.
- **Projekt-Detailseite:** Anzeigen und Bearbeiten einzelner Projekte.

Weitere Features:
- Interaktive UI mit Benutzerfeedback.
- Kommunikation mit dem Backend via REST-API-Endpunkte.
- Fehlerüberprüfung und -management im Browser.

## Backend
### Technologien und Tools
Das Backend des Projekts beruht auf NestJS (Version `11.0.x`) und wurde mit der Modularitätsstrategie dieses Frameworks aufgebaut.
### Aufbau und Funktionen
- **Services und Controller:** Modular nach Funktionalitäten organisiert.
- **Middleware:** Enthält Authentifizierung und Logging.
- **TypeORM:** Datenbankoperationen für PostgreSQL.
- **REST API:** Endpunkte für CRUD-Operationen (Create, Read, Update, Delete).
- **Sicherheitsfeatures:** JWT-Integration für Authentifizierung.

## Setup und Installation
### Anforderungen
Stellen Sie sicher, dass folgende Tools installiert sind:
- **Node.js** (empfohlen: Version 18.x)
- **npm** (enthalten in Node.js)
- **PostgreSQL** (empfohlen: Version 14.x)

### Schritte
1. **Repository klonen**
``` bash
   git clone <REPOSITORY_URL>
   cd Projectmanager
```
1. **Abhängigkeiten installieren**
    - Für das Backend:
``` bash
     cd back-manager
     npm install
```
- Für das Frontend:
``` bash
     cd front-manager
     npm install
```
1. **Datenbank einrichten**
   Erstellen Sie eine PostgreSQL-Datenbank und passen Sie die Verbindungsparameter in der Backend-Konfigurationsdatei (`.env`) an.
2. **Applikation starten**
    - Backend:
``` bash
     cd back-manager
     npm run start
```
- Frontend:
``` bash
     cd front-manager
     npm run start
```
1. **Projekt im Browser öffnen**
   Standardmäßig läuft das Frontend unter [http://localhost:4200](http://localhost:4200).

## Lizenz
Dieses Projekt steht unter der [MIT-Lizenz](LICENSE). Bitte lesen Sie die Lizenzdatei für weitere Informationen.
