import express from "express";
import * as articleController from "../controllers/article.controller";
import * as menuController from "../controllers/menu.controller";

const router = express.Router();

//Récuperer les articles d'un restaurant
router.get('/articles/articles/getall', async (req: any, res: any) => {
    try {
        const { uuid: restaurantId } = req.query;
        const articles = await articleController.getArticles(restaurantId);
        res.json(articles);
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: `Erreur serveur : ${err.message}` });
    }
});



router.post('/articles/articles/add', async (req: any, res: any) => {
    try {
        const { email, name, description, price, type } = req.body;
        const article = await articleController.addArticle({ name, description, price, type });
        res.status(201).json({ message: "Article créé", article });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: `Erreur serveur : ${err.message}` });
    }
});

router.delete('/articles/articles/delete', async (req: any, res: any) => {
    try {
        const { email, uuid: articleId } = req.body;
        const article = await articleController.deleteArticle(articleId);
        res.json({ message: "Article supprimé", article });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: `Erreur serveur : ${err.message}` });
    }
});

router.post('/articles/articles/edit', async (req: any, res: any) => {
    try {
        const { email, uuid: articleId, field, value } = req.body;
        const article = await articleController.editArticle(articleId, field, value);
        res.json({ message: "Article modifié", article });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: `Erreur serveur : ${err.message}` });
    }
});

//Récupérer tous les menus d'un restaurant
router.get('/articles/menus/getall', async (req: any, res: any) => {
    try {
        const { uuid: restaurantId } = req.query;
        const menus = await menuController.getMenus(restaurantId);
        res.json(menus);
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: `Erreur serveur : ${err.message}` });
    }
});

//Créer un menu pour un restaurant
router.post('/articles/menus/add', async (req: any, res: any) => {
    try {
        const { email, name, description, price, type } = req.body;
        const menu = await menuController.addMenu({ name, description, price, type });
        res.status(201).json({ message: "Menu créé", menu });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: `Erreur serveur : ${err.message}` });
    }
});

//Modifier un menu d'un restaurant
router.post('/articles/menus/edit', async (req: any, res: any) => {
    try {
        const { email, uuid: menuId, field, value } = req.body;
        const menu = await menuController.editMenu(menuId, field, value);
        res.json({ message: "Menu modifié", menu });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: `Erreur serveur : ${err.message}` });
    }
});

//Supprimer un menu d'un restaurant
router.delete('/articles/menus/delete', async (req: any, res: any) => {
    try {
        const { email, uuid: menuId } = req.body;
        const menu = await menuController.deleteMenu(menuId);
        res.json({ message: "Menu supprimé", menu });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: `Erreur serveur : ${err.message}` });
    }
});

//Ajouter un article à un menu d'un restaurant
router.post('/articles/menus/addarticles', async (req: any, res: any) => {
    try {
        const { email, uuid: menuId, articleId } = req.body;
        const result = await menuController.addArticleToMenu(menuId, articleId);
        res.json({ message: "Article ajouté au menu", result });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: `Erreur serveur : ${err.message}` });
    }
});

//Retirer un article d'un menu d'un restaurant  
router.post('/articles/menus/deletearticles', async (req: any, res: any) => {
    try {
        const { email, uuid: menuId, articleId } = req.body;
        const result = await menuController.removeArticleFromMenu(menuId, articleId);
        res.json({ message: "Article retiré du menu", result });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: `Erreur serveur : ${err.message}` });
    }
});

export default router; 