import { Request, Response } from "express";
import { Restaurant } from "../model/restaurant-model";
import { Type } from "../model/type-model";

const restaurantController = {

    createRestaurant: async (req: Request, res: Response): Promise<void> => {
        try {
            const { ownerId, logo, restaurantName, address, siret, codePostal, types } = req.body;

            if (!restaurantName || !address || !siret || !codePostal) {
                res.status(400).json({ error: "Les champs restaurantName, address, siret et codePostal sont requis." });
                return;
            }

            const newRestaurant = await Restaurant.create({
                ownerId,
                logo,
                restaurantName,
                address,
                siret,
                codePostal,
            });

            // Si des types sont spécifiés, on les associe au restaurant
            if (types && Array.isArray(types)) {
                try {
                    const typeInstances = await Type.findAll({
                        where: { id: types }
                    });
                    await newRestaurant.$set('types', typeInstances);
                } catch (error) {
                    console.error("Erreur lors de l'association des types:", error);
                    // On continue même si l'association des types échoue
                }
            }

            // On récupère le restaurant avec ses types associés
            const restaurantWithTypes = await Restaurant.findOne({
                where: { id: newRestaurant.id },
                include: [{
                    model: Type,
                    through: { attributes: [] }
                }]
            });
            
            res.status(201).json(restaurantWithTypes);
        } catch (error: unknown) {
            console.error("Erreur détaillée lors de la création du restaurant:", error);
            if (error instanceof Error) {
                console.error("Message d'erreur:", error.message);
                console.error("Stack trace:", error.stack);
                res.status(500).json({ 
                    error: "Erreur serveur : " + error.message,
                    details: error.stack
                });
            } else {
                res.status(500).json({ error: "Erreur serveur inconnue." });
            }
        }
    },

    getRestaurant: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            // Recherche du restaurant par UUID
            const restaurant = await Restaurant.findOne({
                where: { id },
                include: [
                    {
                        model: Type,
                        attributes: ["id", "name", "icon"],
                        through: { attributes: [] },
                    },
                ],
            });

            if (!restaurant) {
                res.status(404).json({ error: "Restaurant non trouvé." });
                return;
            }

            res.status(200).json(restaurant);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erreur lors de la récupération du restaurant :", error.message);
                res.status(500).json({ error: "Erreur serveur : " + error.message });
            } else {
                res.status(500).json({ error: "Erreur serveur inconnue." });
            }
        }
    },

    getAllRestaurants: async (req: Request, res: Response): Promise<void> => {
        try {
            const restaurants = await Restaurant.findAll({
                include: [
                    {
                        model: Type,
                        attributes: ["id", "name", "icon"],
                        through: { attributes: [] },
                    },
                ],
            });

            if (restaurants.length === 0) {
                res.status(404).json({ error: "Aucun restaurant trouvé." });
                return;
            }

            res.status(200).json(restaurants);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erreur lors de la récupération des restaurants :", error.message);
                res.status(500).json({ error: "Erreur serveur : " + error.message });
            } else {
                res.status(500).json({ error: "Erreur serveur inconnue." });
            }
        }
    },

    // listRestaurants: async (req: Request, res: Response): Promise<void> => {
    //     try {
    //         const restaurants = await Restaurant.findAll();
    //
    //         if (restaurants.length === 0) {
    //             res.status(404).json({ error: "Aucun restaurant trouvé." });
    //             return;
    //         }
    //
    //         res.status(200).json(restaurants);
    //     } catch (error: unknown) {
    //         if (error instanceof Error) {
    //             console.error("Erreur lors de la récupération des restaurants :", error.message);
    //             res.status(500).json({ error: "Erreur serveur : " + error.message });
    //         } else {
    //             res.status(500).json({ error: "Erreur serveur inconnue." });
    //         }
    //     }
    // },

    updateRestaurant: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { logo, restaurantName, type, address, siret } = req.body;

            if (!logo || !restaurantName || !type || !address || !siret) {
                res.status(400).json({ error: "Tous les champs sont requis." });
                return;
            }

            const [updated] = await Restaurant.update(
                { logo, restaurantName, type, address, siret },
                { where: { id } }
            );

            if (updated === 0) {
                res.status(404).json({ error: "Restaurant non reconnu." });
                return;
            }

            const updatedRestaurant = await Restaurant.findOne({ where: { id } });
            res.status(200).json(updatedRestaurant);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erreur lors de la mise à jour du restaurant :", error.message);
                res.status(500).json({ error: "Erreur serveur : " + error.message });
            } else {
                res.status(500).json({ error: "Erreur serveur inconnue." });
            }
        }
    },

    deleteRestaurant: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            const deleted = await Restaurant.destroy({ where: { id } });

            if (deleted === 0) {
                res.status(404).json({ error: "Restaurant non reconnu." });
                return;
            }

            res.status(200).json({ message: "Restaurant supprimé." });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erreur lors de la suppression du restaurant :", error.message);
                res.status(500).json({ error: "Erreur serveur : " + error.message });
            } else {
                res.status(500).json({ error: "Erreur serveur inconnue." });
            }
        }
    },

    getAllTypes: async (req: Request, res: Response): Promise<void> => {
        try {
            const types = await Type.findAll({
                attributes: ['id', 'name', 'icon']
            });

            if (types.length === 0) {
                res.status(404).json({ error: "Aucun type trouvé." });
                return;
            }

            res.status(200).json(types);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erreur lors de la récupération des types :", error.message);
                res.status(500).json({ error: "Erreur serveur : " + error.message });
            } else {
                res.status(500).json({ error: "Erreur serveur inconnue." });
            }
        }
    },

};

export default restaurantController;