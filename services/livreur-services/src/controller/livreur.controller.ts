import { Request, Response } from "express";
import { Livreur } from "../models/livreur.model";
import jwt from 'jsonwebtoken';
import {Op} from "sequelize";

const SECRET_KEY = process.env.ACCESS_JWT_KEY || "isEmptyJWT_KEY";

const livreurController = {

    createLivreur: async (req: Request, res: Response) => {
        try {
            const { userId, phone, vehicule, gpsLongitude, gpsLatitude } = req.body;

            const livreur = await Livreur.create({
                userId,
                phone,
                vehicule,
                gpsLongitude,
                gpsLatitude
            });

            res.status(201).json(livreur);
        } catch (error) {
            if(error instanceof Error){
                console.error("Erreur lors de la création du livreur:", error.message);
                res.status(500).json({ message: "Erreur lors de la création du livreur:" + error.message });
            } else {
                console.error("Erreur inconnue lors de la création du livreur.");
                res.status(500).json({ message: "Erreur inconnue lors de la création du livreur" });
            }
        }
    },

    getAll: async (req: Request, res: Response):  Promise<any> => {
        try {
            //On ajoute un contrôle sur le rôle de l'utilisateur
            const allowedRoles = ['admin'];
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                return res.status(401).json({ error: 'Accès refusé : non identifié' });
            }

            const decoded = jwt.verify(token, SECRET_KEY) as any;

            if (!allowedRoles.includes(decoded.type)) {
                return res.status(403).json({ error: 'Accès refusé : privilèges insuffisants' });
            }

            //On récupère TOUS les livreurs (un livreur sans id n'existe pas)
            const livreurs = await Livreur.findAll({});

            res.status(200).json(livreurs);
        } catch (error) {
            if(error instanceof Error){
                console.error("Erreur lors de la récupération des livreurs:", error.message);
                res.status(500).json({ message: "Erreur lors de la récupération des livreurs:" + error.message });
            } else {
                console.error("Erreur inconnue lors de la récupération des livreurs.");
                res.status(500).json({ message: "Erreur inconnue lors de la récupération des livreurs" });
            }
        }
    }

}

export default livreurController;