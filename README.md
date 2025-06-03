# Projet Breezy G4

Une application web Next.js moderne avec TypeScript, Tailwind CSS et PostgreSQL.

## Getting Started

Ce projet est une application web construite avec Next.js 15, React 19, TypeScript et Tailwind CSS, avec une base de données PostgreSQL.

### Prérequis

- Node.js 20 ou supérieur
- npm ou yarn
- Docker et Docker Compose (pour l'exécution avec Docker)

## Installation

### 1. Cloner le projet

```bash
git clone <url-du-repo>
cd Projet-Breezy-G4
```

### 2. Configuration des variables d'environnement

Copiez le fichier d'exemple et configurez vos variables d'environnement :

```bash
cp example.env .env.local
```

Modifiez le fichier `.env.local` avec vos propres valeurs :

```bash
# PostgreSQL database configuration
POSTGRES_USER=votre_nom_utilisateur
POSTGRES_PASSWORD=votre_mot_de_passe
POSTGRES_DB=nom_de_votre_base

# NextAuth configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=votre-clé-secrète-très-sécurisée
```

### 3. Installation des dépendances

```bash
npm install
```

## Running

### Exécution locale (développement)

Pour lancer l'application en mode développement :

```bash
npm run dev
```

L'application sera accessible à l'adresse : http://localhost:3000

### Autres commandes disponibles

```bash
# Construire l'application pour la production
npm run build

# Lancer l'application en mode production
npm run start

# Linter le code
npm run lint
```

### Exécution avec Docker

#### Option 1 : Application seule

Construire et lancer l'application avec Docker :

```bash
# Construire l'image
docker build -t projet-breezy-g4 .

# Lancer le conteneur
docker run -p 3000:3000 projet-breezy-g4
```

#### Option 2 : Stack complète (Application + Base de données)

Pour lancer l'ensemble de la stack (application Next.js + PostgreSQL) :

```bash
# Copier le fichier d'environnement pour Docker
cp example.env .env

# Lancer la stack complète
docker-compose up -d
```

La stack comprend :
- **Application Next.js** : accessible sur http://localhost:3000
- **Base de données PostgreSQL** : accessible sur localhost:5432

Pour arrêter la stack :

```bash
docker-compose down
```

Pour arrêter et supprimer les volumes (⚠️ cela supprimera les données de la base) :

```bash
docker-compose down -v
```