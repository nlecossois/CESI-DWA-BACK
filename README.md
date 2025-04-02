# CESI-DWA-BACK
CESI Dépôt projet DWA - Back

## Installation
Après avoir pull le projet sur un répertoire en local, il vous faudra installer make à la racine de votre projet
- npm install make
  
Ensuite, vous devez créer un fichier ".env" à la racine de votre projet afin d'y ajouter les variables d'environnement. Ce fichier n'est pas disponnible sur ce dépot et devra vous être transmis directement par un membre de l'équipe de développement.

Enfin, vous pourez lancer la commande **make up** pour initialiser votre projet.

## Liste des commandes
- **make up** (initialise / lance toutes les images docker du projet)
- **make down** (eteint toutes les images docker du projet)
 /!\ Bien exécuter cette commande avant d'éteindre Docker, votre IDE, de push ou d'éteindre votre poste /!\
- **make dev** (initialise / lance toutes les images docker du projet et lance les environnement de développement)
- **make delete** (A utiliser après un make down uniquement, permet de supprimer les conteneurs pour une réinitialisation propre)

## Procédure de dépannage
En cas de soucis avec le projet, pensez à réinitialiser les micro-services:
- **make down**
- **make delete**
- **make up**

## Utilisation de l'API
En local l'api s'appelle via **http://localhost/**
