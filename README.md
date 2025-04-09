# CESI-DWA-BACK
CESI Dépôt projet DWA - Back  
Le projet n'est pas disponnible en production. Certaines fonctionnalitées ne sont donc pas parfaitement optimisées pour un environnement de production comme par exemple l'absence de load-balancing ou la gestion des images.

## Installation
Après avoir pull le projet sur un répertoire en local, il vous faudra installer make à la racine de votre projet
- npm install make
  
Ensuite, vous devez créer un fichier ".env" à la racine de votre projet afin d'y ajouter les variables d'environnement. Ce fichier n'est pas disponnible sur ce dépot et devra vous être transmis directement par un membre de l'équipe de développement.

Enfin, vous pourez lancer la commande pour initialiser et lancer votre projet.

## Liste des commandes
- **docker-compose up** (initialise / lance toutes les images docker du projet)
- **docker-compose down** (eteint toutes les images docker du projet)
 /!\ Bien exécuter cette commande avant d'éteindre Docker, votre IDE, de push ou d'éteindre votre poste /!\
- **docker system prune -af --volumes** (réinitialise l'ensemble des conteneurs du projet)


## Utilisation de l'API
En local l'api s'appelle via **http://localhost/**
En cas de soucis avec la base de données, connectez-vous à l'adminer:  
- url: http://localhost:8080/
- Système : PostegreSQL
- Serveur : db
- Utilisateur : postgres
- Mot de passe : password  
Au moment de la connexion à la base de données, choisir la base nommé "postgres". Supprimez alors toutes les tables et lancez les commandes de down, de prune et de up pour bien tout relancer proprement.

## Description du fonctionnement des différents services.
La documentation des API de chaque service est disponnible dans son swagger dédié. Pour acceder aux swagger, il faut avoir lancer le projet.  
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
  
  
  
  
