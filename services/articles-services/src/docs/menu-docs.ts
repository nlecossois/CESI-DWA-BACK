/**
 * @swagger
 * components:
 *   schemas:
 *     Menu:
 *       type: object
 *       required:
 *         - restaurantId
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: L'ID unique du menu
 *         restaurantId:
 *           type: string
 *           format: uuid
 *           description: L'ID du restaurant auquel appartient le menu
 *         name:
 *           type: string
 *           description: Le nom du menu
 *         price:
 *           type: number
 *           format: decimal
 *           description: Le prix du menu
 *         articles:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Article'
 *           description: Les articles inclus dans le menu
 */

/**
 * @swagger
 * tags:
 *   name: Menus
 *   description: API pour la gestion des menus
 */

/**
 * @swagger
 * /api/menus/getall:
 *   get:
 *     summary: Récupérer les menus d'un restaurateur
 *     tags: [Menus]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Liste des menus
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 */

/**
 * @swagger
 * /api/menus/add:
 *   post:
 *     summary: Ajouter un menu
 *     tags: [Menus]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Menu'
 *     responses:
 *       201:
 *         description: Menu créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 */

/**
 * @swagger
 * /api/menus/edit:
 *   post:
 *     summary: Éditer un menu
 *     tags: [Menus]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Menu mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 */

/**
 * @swagger
 * /api/menus/delete:
 *   delete:
 *     summary: Supprimer un menu
 *     tags: [Menus]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Menu supprimé
 */

/**
 * @swagger
 * /api/menus/addarticles:
 *   post:
 *     summary: Ajouter un article à un menu
 *     tags: [Menus]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - menuId
 *               - articleId
 *             properties:
 *               menuId:
 *                 type: string
 *                 format: uuid
 *               articleId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Article ajouté au menu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 */

/**
 * @swagger
 * /api/menus/deletearticles:
 *   post:
 *     summary: Retirer un article d'un menu
 *     tags: [Menus]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - menuId
 *               - articleId
 *             properties:
 *               menuId:
 *                 type: string
 *                 format: uuid
 *               articleId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Article retiré du menu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 */ 