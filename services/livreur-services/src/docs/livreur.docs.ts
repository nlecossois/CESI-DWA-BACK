/**
 * @swagger
 * components:
 *   schemas:
 *     Livreur:
 *       type: object
 *       required:
 *         - userId
 *         - phone
 *         - vehicule
 *         - gpsLongitude
 *         - gpsLatitude
 *       properties:
 *         userId:
 *           type: string
 *           description: L'ID de l'utilisateur du livreur
 *         phone:
 *           type: string
 *           description: Le numéro de téléphone du livreur
 *         vehicule:
 *           type: string
 *           description: Le type de véhicule du livreur
 *         gpsLongitude:
 *           type: number
 *           description: La longitude GPS du livreur
 *         gpsLatitude:
 *           type: number
 *           description: La latitude GPS du livreur
 */