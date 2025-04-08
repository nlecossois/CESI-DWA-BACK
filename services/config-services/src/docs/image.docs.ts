/**
 * @swagger
 * tags:
 *   name: Image
 *   description: Opérations d'upload et de récupération d'images
 */

/**
 * @swagger
 * /config/postImage:
 *   post:
 *     summary: Upload une image vers le serveur
 *     tags:
 *       - Image
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - newImage
 *             properties:
 *               newImage:
 *                 type: string
 *                 format: binary
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
 *                   example: 🚀 Image uploadée avec succès
 *                 uuid:
 *                   type: string
 *                   format: uuid
 *                   example: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *                 url:
 *                   type: string
 *                   example: "http://localhost:3000/public/images/3fa85f64-5717-4562-b3fc-2c963f66afa6.jpg"
 *       400:
 *         description: Aucune image fournie
 *       500:
 *         description: Erreur serveur lors de l'upload
 */

/**
 * @swagger
 * /config/getImage:
 *   post:
 *     summary: Récupère une image à partir de son UUID
 *     tags:
 *       - Image
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - uuid
 *             properties:
 *               uuid:
 *                 type: string
 *                 format: uuid
 *                 example: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *     responses:
 *       200:
 *         description: Image encodée en base64 sous forme de Data URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dataUrl:
 *                   type: string
 *                   example: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD..."
 *       400:
 *         description: Aucun UUID fourni
 *       404:
 *         description: Image non trouvée
 *       500:
 *         description: Erreur lors de la récupération de l'image
 */
