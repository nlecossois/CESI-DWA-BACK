# CESI-DWA-BACK
CESI Dépôt projet DWA - Back

## Installation
Après avoir pull le projet sur un répertoire en local, il vous faudra installer make à la racine de votre projet
- npm install make
Ensuite, vous pourrez exécuter les commandes détaillées ci-dessous.

## Liste des commandes
- **make up** (initialise / lance toutes les images docker du projet)
- **make down** (eteint toutes les images docker du projet)
 /!\ Bien exécuter cette commande avant d'éteindre Docker, votre IDE, de push ou d'éteindre votre poste /!\
- **make dev** (initialise / lance toutes les images docker du projet et lance les environnement de développement)
- **make delete** (A utiliser après un make down uniquement, permet de supprimer les conteneurs pour une réinitialisation propre)
