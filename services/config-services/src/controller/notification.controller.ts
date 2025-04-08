import { Request, Response } from "express";
import {unlink} from "fs";
import Notification from "../models/notification.model.ts";
import { NotificationType } from "../models/notificationType.enum.ts";
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.ACCESS_JWT_KEY || "isEmptyJWT_KEY";

const notificationController = {
    getNotifications: async (req: Request, res: Response): Promise<any> => {
        try {
            //On contrôle que le paramètre uuid est bien présent dans l'url
            const { uuid } = req.params;
            if (!uuid) {
                return res.status(400).send({
                    message: "Le paramètre uuid est requis"
                });
            }

            //On contrôle que l'utilisateur qui fait la demande est le bon utilisateur ou qu'il est admin
            const allowedRoles = ['admin'];
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                return res.status(401).json({ error: 'Accès refusé : non identifié' });
            }

            const decoded = jwt.verify(token, SECRET_KEY) as any;

            //On va vérifier si l'utilisateur connécté est admin ou si il s'agit de l'utilisateur qui fait la demande
            if (decoded.uuid !== uuid && !allowedRoles.includes(decoded.type)) {
                return res.status(403).json({ error: 'Accès refusé : privilèges insuffisants' });
            }

            //On va récupérer les notifications de l'utilisateur
            const notifications = await Notification.find({ userId: uuid });
            if (notifications.length === 0) {
                return res.status(404).send({
                    message: "Aucune notification trouvée pour cet utilisateur"
                });
            }
            //On va supprimer les notifications qui ont été lues
            await Notification.deleteMany({ userId: uuid });

            //On renvoie les notifications à l'utilisateur
            console.log("✅ Notifications récupérées avec succès :", notifications);
            res.status(200).send({
                message: "Notifications récupérées avec succès",
                data: notifications
            });


        } catch (error: unknown) {
            // Vérifie si 'error' est une instance d'Error
            if (error instanceof Error) {
                console.error("❌ Erreur lors de la récupération des notifications :", error.message);
                res.status(500).send({
                    message: "Erreur lors de la récupération des notifications",
                    error: error.message
                });
            } else {
                console.error("❌ Erreur inconnue :", error);
                res.status(500).send({
                    message: "Erreur inconnue lors de la récupération des notifications"
                });
            }
        }
    },

    postNotification: async (req: Request, res: Response): Promise<any> => {
        try {
            //On va récuperer les champs "userId, type, title et message" dans le body de la requête
            const { userId, type, title, message } = req.body;

            //On vérifie que les champs sont bien définies
            if (!userId || !type || !title || !message) {
                return res.status(400).send({
                    message: "Tous les champs sont requis : userId, type, title et message"
                });
            }
            //On contrôle que l'ENUM de type est bien respecté
            if (!Object.values(NotificationType).includes(type)) {
                return res.status(400).send({
                    message: "Le type de notification est invalide"
                });
            }

            //On va créer une nouvelle notification
            const newNotification = new Notification({
                userId,
                type,
                title,
                message
            });
            //On va sauvegarder la notification dans la base de données
            await newNotification.save();
            console.log("✅ Notification enregistrée avec succès :", newNotification);
            res.status(201).send({
                message: "Notification enregistrée avec succès",
                data: newNotification
            });
        } catch (error: unknown) {
            // Vérifie si 'error' est une instance d'Error
            if (error instanceof Error) {
                console.error("❌ Erreur lors de la récupération des notifications :", error.message);
                res.status(500).send({
                    message: "Erreur lors de la récupération des notifications",
                    error: error.message
                });
            } else {
                console.error("❌ Erreur inconnue :", error);
                res.status(500).send({
                    message: "Erreur inconnue lors de la récupération des notifications"
                });
            }
        }


    },
}

export default notificationController;