/**
 * @swagger
 * tags:
 *   name: Config
 *   description: Gestion de la configuration et calculs liés aux distances et tarifs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       required:
 *         - numero
 *         - rue
 *         - code postal
 *         - ville
 *         - pays
 *       properties:
 *         numero:
 *           type: string
 *           example: "10"
 *         rue:
 *           type: string
 *           example: "Rue de la paix"
 *         code postal:
 *           type: string
 *           example: "75002"
 *         ville:
 *           type: string
 *           example: "Paris"
 *         pays:
 *           type: string
 *           example: "France"
 *         coordinates:
 *           type: array
 *           description: Coordonnées GPS de l'adresse (non recquis dans la requête)
 *           items:
 *             type: number
 *           example: [2.3522, 48.8566]
 */

/**
 * @swagger
 * /config/getDistance:
 *   post:
 *     summary: Calcule la distance entre deux adresses
 *     tags:
 *       - Config
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - address1
 *               - address2
 *             properties:
 *               address1:
 *                 $ref: '#/components/schemas/Address'
 *               address2:
 *                 $ref: '#/components/schemas/Address'
 *     responses:
 *       200:
 *         description: Distances calculées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Données extraites avec succès"
 *                 address1:
 *                   $ref: '#/components/schemas/Address'
 *                 address2:
 *                   $ref: '#/components/schemas/Address'
 *                 distanceRoute:
 *                   type: number
 *                   example: 12.34
 *                 distanceVolOiseau:
 *                   type: number
 *                   example: 10.56
 *       400:
 *         description: Une ou plusieurs adresses sont invalides
 */

/**
 * @swagger
 * /config/getCommandPrice:
 *   post:
 *     summary: Calcule le prix d'une commande en fonction des adresses et de la valeur du panier
 *     tags:
 *       - Config
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - address1
 *               - address2
 *               - cartValue
 *             properties:
 *               address1:
 *                 $ref: '#/components/schemas/Address'
 *               address2:
 *                 $ref: '#/components/schemas/Address'
 *               address3:
 *                 $ref: '#/components/schemas/Address'
 *               cartValue:
 *                 type: number
 *                 example: 42.5
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
 *                   properties:
 *                     Cart HT:
 *                       type: number
 *                       example: 42.5
 *                     Cart TVA:
 *                       type: string
 *                       example: "10%"
 *                     Cart TTC:
 *                       type: number
 *                       example: 46.75
 *                 service:
 *                   type: object
 *                   properties:
 *                     Service HT:
 *                       type: number
 *                       example: 2
 *                     Service TVA:
 *                       type: string
 *                       example: "20%"
 *                     Service TTC:
 *                       type: number
 *                       example: 2.4
 *                 delivery:
 *                   type: object
 *                   properties:
 *                     Unit price / km:
 *                       type: number
 *                       example: 1.2
 *                     Distance total:
 *                       type: number
 *                       example: 5.5
 *                     Delivery HT:
 *                       type: number
 *                       example: 6.6
 *                     Delivery TVA:
 *                       type: string
 *                       example: "20%"
 *                     Delivery TTC:
 *                       type: number
 *                       example: 7.92
 *                 total:
 *                   type: object
 *                   properties:
 *                     Total HT:
 *                       type: number
 *                       example: 51.1
 *                     Total TTC:
 *                       type: number
 *                       example: 57.07
 *       400:
 *         description: Données invalides dans la requête
 *       500:
 *         description: Erreur serveur lors du calcul
 */
