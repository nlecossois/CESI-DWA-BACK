/**
 * @swagger
 * tags:
 *   name: Notification
 *   description: Gestion des notifications
 */

/**
 * @swagger
 * /config/getNotification/{uuid}:
 *   get:
 *     summary: Récupère les notifications d'un utilisateur
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: param
 *         required: true
 *         schema:
 *           type: string
 *         description: userId
 *     responses:
 *       200:
 *         description: Notifications trouvées avec succès
 *       404:
 *         description: Notifications non trouvées
 *       500:
 *         description: Erreur lors de la récupération du paramètre
 */

/**
 * @swagger
 * /config/postNotification:
 *   post:
 *     summary: Enregistrer une notification
 *     tags: [Notification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: UUID de l'utilisateur
 *               type:
 *                 type: string
 *                 description: Type de notification
 *               title:
 *                 type: string
 *                 description: Titre de la notification
 *               message:
 *                 type: string
 *                 description: Message de la notification
 *
 *     responses:
 *       200:
 *         description: Log de connexion enregistré avec succès
 *       500:
 *         description: Erreur lors de l'enregistrement du log
 */