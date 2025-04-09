# CESI-DWA-BACK
CESI Dépôt projet DWA - Back

## Installation
Après avoir pull le projet sur un répertoire en local, il vous faudra installer make à la racine de votre projet
- npm install make
  
Ensuite, vous devez créer un fichier ".env" à la racine de votre projet afin d'y ajouter les variables d'environnement. Ce fichier n'est pas disponnible sur ce dépot et devra vous être transmis directement par un membre de l'équipe de développement.

Enfin, vous pourez lancer la commande pour initialiser et lancer votre projet.

## Liste des commandes (JetBrains PhpStorm)
- **make up** (initialise / lance toutes les images docker du projet)
- **make down** (eteint toutes les images docker du projet)
 /!\ Bien exécuter cette commande avant d'éteindre Docker, votre IDE, de push ou d'éteindre votre poste /!\
- **make dev** (initialise / lance toutes les images docker du projet et lance les environnement de développement)
- **make delete** (A utiliser après un make down uniquement, permet de supprimer les conteneurs pour une réinitialisation propre)
- **make restart** (Redémarre l'ensemble des conteneurs)
- **make reset** (Réinitialise les conteneurs)

## Liste des commandes (Cursor / VS Code)
- **npm run up** (initialise / lance toutes les images docker du projet)
- **npm run down** (eteint toutes les images docker du projet)
 /!\ Bien exécuter cette commande avant d'éteindre Docker, votre IDE, de push ou d'éteindre votre poste /!\
- **npm run dev** (initialise / lance toutes les images docker du projet et lance les environnement de développement)
- **npm run delete** (A utiliser après un make down uniquement, permet de supprimer les conteneurs pour une réinitialisation propre)
- **npm run restart** (Redémarre l'ensemble des conteneurs)
- **npm run reset** (Réinitialise les conteneurs)

## Utilisation de l'API
En local l'api s'appelle via **http://localhost/**

## Description du fonctionnement des différents services. La documentation des API de chaque service est disponnible dans son swagger dédié
**articles-services**:
- Route d'utilisation : http://localhost/articles/
- Port : 3004
- Swagger : http://localhost:3004/swagger
> Description :
  
**auth-service**:
- Route d'utilisation : http://localhost/auth/
- Port : 3006
> Description : 

**client-services**:
- Route d'utilisation : http://localhost/client/
- Port : 3002
- Swagger : http://localhost:3002/swagger
> Description :

**commande-services**:
- Route d'utilisation : http://localhost/client/
- Port : 3005
- Swagger : http://localhost:3005/swagger
> Description :

**config-services**:
- Route d'utilisation : http://localhost/config/
- Port : 3007
- Swagger : http://localhost:3007/swagger
> Description :

**livreur-services**:
- Route d'utilisation : http://localhost/livreur/
- Port : 3003
- Swagger : http://localhost:3003/swagger
> Description :

**restaurant-services**:
- Route d'utilisation : http://localhost/restaurants/
- Port : 3001
- Swagger : http://localhost:3001/swagger
> Description :

**user-services**:
- Route d'utilisation : http://localhost/users/
- Port : 3000
- Swagger : http://localhost:3000/swagger
> Description :
  
  
  
  
