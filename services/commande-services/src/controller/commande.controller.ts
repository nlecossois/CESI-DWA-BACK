import { Request, Response } from "express";
import { Commande } from "../models/commande.model";

const logsController = {

    createCommande: async (req: Request, res: Response): Promise<any> => {
        try {
            const { clientId, restaurantId, livreurId, status, cartPriceHT, finalPriceTTC, menus, articles } = req.body;

            // Vérification de la présence des données obligatoires
            if (!clientId || !restaurantId || !status || !cartPriceHT) {
                return res.status(400).send({
                    message: "Les champs 'clientId', 'restaurantId', 'status', et 'cartPriceHT' sont obligatoires"
                });
            }

            // Création de la nouvelle commande
            const newCommande = await Commande.create({
                clientId,
                restaurantId,
                livreurId: livreurId || null, // livreurId est optionnel
                status,
                cartPriceHT,
                finalPriceTTC: finalPriceTTC || null, // finalPriceTTC est optionnel
                menus,
                articles
            });

            // Réponse de succès
            res.status(201).send({
                message: "Commande créée avec succès",
                data: newCommande
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("❌ Erreur lors de la création de la commande :", error.message);
                res.status(500).send({
                    message: "Erreur lors de la création de la commande",
                    error: error.message
                });
            } else {
                console.error("❌ Erreur inconnue lors de la création de la commande");
                res.status(500).send({
                    message: "Erreur inconnue lors de la création de la commande"
                });
            }
        }
    },

    getCommands: async (req: Request, res: Response): Promise<any> => {
        try {
            const commandes = await Commande.findAll();
            res.status(200).send({
                message: "Commandes récupérées avec succès",
                data: commandes
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("❌ Erreur lors de la récupération des commandes :", error.message);
                res.status(500).send({
                    message: "Erreur lors de la récupération des commandes",
                    error: error.message
                });
            } else {
                console.error("❌ Erreur inconnue lors de la récupération des commandes");
                res.status(500).send({
                    message: "Erreur inconnue lors de la récupération des commandes"
                });
            }
        }
    },

    updateCommande: async (req: Request, res: Response): Promise<any> => {
        try {
            const { commandId, param, value } = req.body;

            // Type explicite pour `param`
            const validParams: ("status" | "livreurId" | "finalPriceTTC")[] = ["status", "livreurId", "finalPriceTTC"];

            // Vérification si le param est valide
            if (!validParams.includes(param)) {
                return res.status(400).send({
                    message: "Le champ 'param' doit être 'status', 'livreurId' ou 'finalPriceTTC'"
                });
            }

            if (!commandId) {
                return res.status(400).send({
                    message: "Le champ 'commandId' est obligatoire"
                });
            }

            if (!value) {
                return res.status(400).send({
                    message: "Le champ 'value' est obligatoire"
                });
            }

            const commande = await Commande.findByPk(commandId);

            if (!commande) {
                return res.status(404).send({
                    message: "Commande non trouvée"
                });
            }

            //Si le Param est status, on vérifie que la valeur est valide
            if (param === "status") {
                const validStatuses = ["Pending", "Accepted", "In Delivery", "Completed", "Cancelled"];
                if (!validStatuses.includes(value)) {
                    return res.status(400).send({
                        message: "Le champ 'value' doit être 'Pending', 'Accepted', 'In Delivery', 'Completed' ou 'Cancelled'"
                    });
                }
            }

            // On met à jour la commande
            commande.set(param, value);
            await commande.save();

            res.status(200).send({
                message: "Commande mise à jour avec succès",
                data: commande
            });

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("❌ Erreur lors de la mise à jour de la commande :", error.message);
                res.status(500).send({
                    message: "Erreur lors de la mise à jour de la commande",
                    error: error.message
                });
            } else {
                console.error("❌ Erreur inconnue lors de la mise à jour de la commande");
                res.status(500).send({
                    message: "Erreur inconnue lors de la mise à jour de la commande"
                });
            }
        }
    }
};

export default logsController;
