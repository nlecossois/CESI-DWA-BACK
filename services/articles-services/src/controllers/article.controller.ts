import { Article } from "../model/article-model";
import { v4 as uuidv4 } from "uuid";

// Articles
export async function getArticles(restaurantId: string) {
    try {
        const articles = await Article.findAll({
            where: { restaurantId }
        });
        return articles;
    } catch (error) {
        console.error("Erreur lors de la récupération des articles:", error);
        throw error;
    }
}

export async function addArticle(articleData: any) {
    try {
        const articleId = uuidv4();
        const article = await Article.create({
            id: articleId,
            ...articleData
        });
        return article;
    } catch (error) {
        console.error("Erreur lors de la création de l'article:", error);
        throw error;
    }
}

export async function deleteArticle(articleId: string) {
    try {
        const article = await Article.findByPk(articleId);
        if (!article) {
            throw new Error("Article non trouvé");
        }
        await article.destroy();
        return article;
    } catch (error) {
        console.error("Erreur lors de la suppression de l'article:", error);
        throw error;
    }
}

export async function editArticle(articleId: string, field: string, value: any) {
    try {
        const article = await Article.findByPk(articleId);
        if (!article) {
            throw new Error("Article non trouvé");
        }
        await article.update({ [field]: value });
        return article;
    } catch (error) {
        console.error("Erreur lors de la modification de l'article:", error);
        throw error;
    }
} 