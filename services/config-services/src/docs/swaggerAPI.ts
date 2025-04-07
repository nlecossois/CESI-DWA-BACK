/**
 * @swagger
 * /config/getParam/{param}:
 *   get:
 *     summary: Récupère un paramètre spécifique
 *     tags:
 *       - Paramètres
 *     parameters:
 *       - name: param
 *         in: path
 *         required: true
 *         description: Nom du paramètre
 *         schema:
 *           type: string
 *           example: deliveryPriceByKm
 *     responses:
 *       200:
 *         description: Paramètre trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Liste des paramètres récupérée avec succès"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: ID du paramètre
 *                         example: "64f8e4b2c9d3f1a2b3c4d5e6"
 *                       param:
 *                         type: string
 *                         description: Nom du paramètre
 *                         example: "deliveryPriceByKm"
 *                       value:
 *                         type: number
 *                         description: Valeur du paramètre
 *                         example: 0.5
 *                       __v:
 *                         type: number
 *                         description: Version du paramètre
 *                         example: 0
 *       404:
 *         description: Paramètre introuvable
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /config/getLastLogin/{uuid}:
 *   get:
 *     summary: Récupère le dernier log de connexion d'un utilisateur
 *     description: Cette API permet de récupérer le dernier log de connexion d'un utilisateur spécifique.
 *     tags:
 *       - Logs - Login
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: UUID de l'utilisateur dont le dernier log doit être récupéré
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dernier log de connexion récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de succès
 *                   example: "Dernier log de connexion récupéré avec succès"
 *                 data:
 *                   uuid:
 *                     type: string
 *                     description: UUID de l'utilisateur
 *                     example: "123e4567-e89b-12d3-a456-426614174000"
 *                   date:
 *                     type: object
 *                     properties:
 *                       day:
 *                         type: string
 *                         description: Jour de la date
 *                         example: 15
 *                       month:
 *                         type: string
 *                         description: Mois de la date
 *                         example: 10
 *                       year:
 *                         type: string
 *                         description: Année de la date
 *                         example: 2023
 *                       hour:
 *                         type: string
 *                         description: Heure de la date
 *                         example: 14
 *                       minute:
 *                         type: string
 *                         description: Minute de la date
 *                         example: 30
 *                       second:
 *                         type: string
 *                         description: Seconde de la date
 *                         example: 45
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /config/getLogsLoginByUser/{uuid}:
 *   get:
 *     summary: Récupère les logs de connexion d'un utilisateur
 *     description: Cette API permet de récupérer les logs de connexion d'un utilisateur spécifique.
 *     tags:
 *       - Logs - Login
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: UUID de l'utilisateur dont les logs doivent être récupérés
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Logs de connexion récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Message de succès
 *                     example: "Logs de connexion récupérés avec succès"
 *                   data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         uuid:
 *                           type: string
 *                           description: UUID de l'utilisateur
 *                           example: "123e4567-e89b-12d3-a456-426614174000"
 *                         date:
 *                           day:
 *                             type: string
 *                             description: Jour de la date
 *                             example: 15
 *                           month:
 *                             type: string
 *                             description: Mois de la date
 *                             example: 10
 *                           year:
 *                             type: string
 *                             description: Année de la date
 *                             example: 2023
 *                           hour:
 *                             type: string
 *                             description: Heure de la date
 *                             example: 14
 *                           minute:
 *                             type: string
 *                             description: Minute de la date
 *                             example: 30
 *                           second:
 *                             type: string
 *                             description: Seconde de la date
 *                             example: 45
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /config/getLogsLogin:
 *   get:
 *     summary: Récupère tous les logs de connexion
 *     description: Cette API permet de récupérer tous les logs de connexion.
 *     tags:
 *       - Logs - Login
 *     responses:
 *       200:
 *         description: Logs de connexion récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Message de succès
 *                     example: "Logs de connexion récupérés avec succès"
 *                   data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         uuid:
 *                           type: string
 *                           description: UUID de l'utilisateur
 *                           example: "123e4567-e89b-12d3-a456-426614174000"
 *                         date:
 *                           type: object
 *                           day:
 *                             type: string
 *                             description: Jour de la date
 *                             example: 15
 *                           month:
 *                             type: string
 *                             description: Mois de la date
 *                             example: 10
 *                           year:
 *                             type: string
 *                             description: Année de la date
 *                             example: 2023
 *                           hour:
 *                             type: string
 *                             description: Heure de la date
 *                             example: 14
 *                           minute:
 *                             type: string
 *                             description: Minute de la date
 *                             example: 30
 *                           second:
 *                             type: string
 *                             description: Seconde de la date
 *                             example: 45
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /config/postLogLogin:
 *   post:
 *     summary: Enregistre un log de connexion
 *     description: Cette API permet d'enregistrer un log de connexion d'un utilisateur.
 *     tags:
 *       - Logs - Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uuid:
 *                 type: string
 *                 description: UUID de l'utilisateur
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Log de connexion enregistré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de log
 *                   example: "Log de connexion enregistré avec succès"
 *                 data:
 *                   uuid:
 *                     type: string
 *                     description: UUID de l'utilisateur
 *                     example: "123e4567-e89b-12d3-a456-426614174000"
 *                   date:
 *                     type: number
 *                     description: Timestamp de la date de connexion
 *                     example: 1697360400000
 *                   _id:
 *                     type: string
 *                     description: ID du log
 *                     example: "64f8e4b2c9d3f1a2b3c4d5e6"
 *                   __v:
 *                     type: number
 *                     description: Version du log
 *                     example: 0
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /config/getImage:
 *   post:
 *     summary: Récupère une image par son UUID
 *     description: Cette API permet de récupérer une image en utilisant son UUID.
 *     tags:
 *       - Image
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uuid:
 *                 type: string
 *     responses:
 *       200:
 *         description: Image récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dataUrl:
 *                   type: string
 *                   description: URL de l'image au format Base64
 *                   example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
 *
 *       404:
 *         description: Image non trouvée
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /config/postImage:
 *   post:
 *     summary: Upload d'une image
 *     description: Cette API permet d'uploader une image pour un usage quelconque.
 *     tags:
 *       - Image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               newImage:
 *                 type: string
 *                 format: binary
 *                 description: L'image à uploader
 *     responses:
 *       200:
 *         description: Image uploadée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de succès
 *                   example: "Image uploadée avec succès"
 *                 uuid:
 *                   type: string
 *                   description: UUID de l'image
 *                   example: "123e4567-e89b-12d3-a456-426614174000"
 *
 *       400:
 *         description: Fichier invalide
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /config/getCommandPrice:
 *   post:
 *     summary: Calcule le prix d'une commande
 *     description: Cette API permet de calculer le prix d'une commande en fonction de certains paramètres.
 *     tags:
 *       - Calculs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartValue:
 *                 type: number
 *                 description: Prix du panier HT (articles + menus)
 *               address1:
 *                 type: object
 *                 properties:
 *                   numero:
 *                     type: string
 *                   rue:
 *                     type: string
 *                   code postal:
 *                     type: string
 *                   ville:
 *                     type: string
 *                   pays:
 *                     type: string
 *               address2:
 *                   type: object
 *                 properties:
 *                   numero:
 *                     type: string
 *                   rue:
 *                     type: string
 *                   code postal:
 *                     type: string
 *                   ville:
 *                     type: string
 *                   pays:
 *                     type: string
 *               address3:
 *                   type: object
 *                 properties:
 *                   numero:
 *                     type: string
 *                   rue:
 *                     type: string
 *                   code postal:
 *                     type: string
 *                   ville:
 *                     type: string
 *                   pays:
 *                     type: string
 *     responses:
 *       200:
 *         description: Prix calculé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   type: object
 *                   Cart HT:
 *                     type: number
 *                     description: Prix du panier HT
 *                     example: 50.0
 *                   Cart TVA:
 *                     type: string
 *                     description: Taux de TVA appliqué
 *                     example: "10%"
 *                   Cart TTC:
 *                     type: number
 *                     description: Prix du panier TTC
 *                     example: 55.0
 *                 service:
 *                   type: object
 *                   Service HT:
 *                     type: number
 *                     description: Prix du service HT
 *                     example: 5.0
 *                   Service TVA:
 *                     type: string
 *                     description: Taux de TVA appliqué
 *                     example: "20%"
 *                   Service TTC:
 *                     type: number
 *                     description: Prix du service TTC
 *                     example: 6.0
 *                 delivery:
 *                   type: object
 *                   Unit price / km:
 *                     type: number
 *                     description: Prix unitaire par km
 *                     example: 0.4
 *                   Distance total:
 *                     type: number
 *                     description: Distance totale en km
 *                     example: 10.0
 *                   Delivery HT:
 *                     type: number
 *                     description: Prix de la livraison HT
 *                     example: 4.0
 *                   Delivery TVA:
 *                     type: string
 *                     description: Taux de TVA appliqué
 *                     example: "20%"
 *                   Delivery TTC:
 *                     type: number
 *                     description: Prix de la livraison TTC
 *                     example: 4.8
 *                 total:
 *                   type: object
 *                   Total HT:
 *                     type: number
 *                     description: Prix total HT
 *                     example: 59.0
 *                   Total TTC:
 *                     type: number
 *                     description: Prix total TTC
 *                     example: 65.0
 *       400:
 *         description: Paramètres invalides
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /config/getDistance:
 *   post:
 *     summary: Calcule la distance entre deux points
 *     description: Cette API permet de calculer la distance entre deux points géographiques (coordonnées GPS).
 *     tags:
 *       - Calculs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address1:
 *                   properties:
 *                     numero:
 *                       type: string
 *                     rue:
 *                       type: string
 *                     code postal:
 *                       type: string
 *                     ville:
 *                       type: string
 *                     pays:
 *                       type: string
 *               address2:
 *                   properties:
 *                     numero:
 *                       type: string
 *                     rue:
 *                       type: string
 *                     code postal:
 *                       type: string
 *                     ville:
 *                       type: string
 *                     pays:
 *                       type: string
 *     responses:
 *       200:
 *         description: Distance calculée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 distanceRoute:
 *                   type: number
 *                   description: Distance en km par la route
 *                   example: 10.0
 *                 distanceVolOiseau:
 *                   type: number
 *                   description: Distance en km à vol d'oiseau
 *                   example: 8.0
 *       400:
 *         description: Paramètres invalides
 *       500:
 *         description: Erreur serveur
 */


/**
 * @swagger
 * /config/getParams:
 *   get:
 *     summary: Récupère la liste complète des paramètres
 *     tags:
 *       - Paramètres
 *     responses:
 *       200:
 *         description: Liste des paramètres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Message de succès
 *                     example: "Liste des paramètres récupérée avec succès"
 *                   data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: ID du paramètre
 *                           example: "64f8e4b2c9d3f1a2b3c4d5e6"
 *                         param:
 *                           type: string
 *                           description: Nom du paramètre
 *                           example: "deliveryPriceByKm"
 *                         value:
 *                           type: number
 *                           description: Valeur du paramètre
 *                           example: 0.5
 *                         __v:
 *                           type: number
 *                           description: Version du paramètre
 *                           example: 0
 *       500:
 *         description: Erreur serveur
 */


/**
 * @swagger
 * /config/postLogCommand:
 *   post:
 *     summary: Enregistre un log de commande
 *     description: Cette API permet d'enregistrer un log d'une commande.
 *     tags:
 *       - Logs - Commande
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uuid:
 *                 type: string
 *               uuid_client:
 *                 type: string
 *               uuid_livreur:
 *                 type: string
 *               uuid_restaurant:
 *                 type: string
 *               final_status:
 *                 type: string
 *               prixTTC:
 *                 type: number
 *               articles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     uuid:
 *                       type: string
 *                     uuid_restaurant:
 *                       type: string
 *               menus:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     uuid:
 *                       type: string
 *                     uuid_restaurant:
 *                       type: string
 *     responses:
 *       200:
 *         description: Log de commande enregistré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uuid:
 *                   type: string
 *                 uuid_client:
 *                   type: string
 *                 uuid_livreur:
 *                   type: string
 *                 uuid_restaurant:
 *                   type: string
 *                 final_status:
 *                   type: string
 *                 prixTTC:
 *                   type: number
 *                 articles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       uuid:
 *                         type: string
 *                       uuid_restaurant:
 *                         type: string
 *                 menus:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       uuid:
 *                         type: string
 *                       uuid_restaurant:
 *                         type: string
 *                 _id:
 *                   type: string
 *                   description: ID du log de commande
 *                   example: "64f8e4b2c9d3f1a2b3c4d5e6"
 *                 __v:
 *                   type: number
 *                   description: Version du log de commande
 *                   example: 0
 *       500:
 *         description: Erreur serveur
 */


/**
 * @swagger
 * /config/getLogsCommand:
 *   get:
 *     summary: Récupère tous les logs de commandes
 *     description: Cette API permet de récupérer tous les logs de commandes.
 *     tags:
 *       - Logs - Commande
 *     responses:
 *       200:
 *         description: Logs de commande récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uuid:
 *                   type: string
 *                 uuid_client:
 *                   type: string
 *                 uuid_livreur:
 *                   type: string
 *                 uuid_restaurant:
 *                   type: string
 *                 final_status:
 *                   type: string
 *                 prixTTC:
 *                   type: number
 *                 articles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       uuid:
 *                         type: string
 *                       uuid_restaurant:
 *                         type: string
 *                 menus:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       uuid:
 *                         type: string
 *                       uuid_restaurant:
 *                         type: string
 *                 _id:
 *                   type: string
 *                   description: ID du log de commande
 *                   example: "64f8e4b2c9d3f1a2b3c4d5e6"
 *                 __v:
 *                   type: number
 *                   description: Version du log de commande
 *                   example: 0
 *       500:
 *         description: Erreur serveur
 */
