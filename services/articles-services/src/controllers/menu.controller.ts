import { Menu } from "../model/menu-model";
import { Article } from "../model/article-model";
import { v4 as uuidv4 } from "uuid";

export async function getMenus(restaurantId: string) {
    try {
        const menus = await Menu.findAll({
            where: { restaurantId },
            include: [Article]
        });
        return menus;
    } catch (error) {
        console.error("Erreur lors de la récupération des menus:", error);
        throw error;
    }
}

export async function getArticlesByMenu(restaurantId: string, menuId: string) {
    try {
        const menu = await Menu.findOne({
            where: { id: menuId, restaurantId },
            include: [Article]
        });
        return menu?.articles || [];
    } catch (error) {
        console.error("Erreur lors de la récupération des articles du menu:", error);
        throw error;
    }
}

export async function addMenu(menuData: any) {
    try {
        const menuId = uuidv4();
        const menu = await Menu.create({
            id: menuId,
            ...menuData
        });
        return menu;
    } catch (error) {
        console.error("Erreur lors de la création du menu:", error);
        throw error;
    }
}

export async function editMenu(menuId: string, field: string, value: any) {
    try {
        const menu = await Menu.findByPk(menuId);
        if (!menu) {
            throw new Error("Menu non trouvé");
        }
        await menu.update({ [field]: value });
        return menu;
    } catch (error) {
        console.error("Erreur lors de la modification du menu:", error);
        throw error;
    }
}

export async function deleteMenu(menuId: string) {
    try {
        const menu = await Menu.findByPk(menuId);
        if (!menu) {
            throw new Error("Menu non trouvé");
        }
        await menu.destroy();
        return menu;
    } catch (error) {
        console.error("Erreur lors de la suppression du menu:", error);
        throw error;
    }
}

export async function addArticleToMenu(menuId: string, articleId: string) {
    try {
        const menu = await Menu.findByPk(menuId);
        const article = await Article.findByPk(articleId);
        
        if (!menu || !article) {
            throw new Error("Menu ou article non trouvé");
        }
        
        await menu.$add('articles', article);
        return { menu, article };
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'article au menu:", error);
        throw error;
    }
}

export async function removeArticleFromMenu(menuId: string, articleId: string) {
    try {
        const menu = await Menu.findByPk(menuId);
        const article = await Article.findByPk(articleId);
        
        if (!menu || !article) {
            throw new Error("Menu ou article non trouvé");
        }
        
        await menu.$remove('articles', article);
        return { menu, article };
    } catch (error) {
        console.error("Erreur lors du retrait de l'article du menu:", error);
        throw error;
    }
} 