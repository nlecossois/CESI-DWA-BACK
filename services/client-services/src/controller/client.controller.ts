import { Request, Response } from "express";
import { Client, ClientAttributes } from "../models/client.model";
import jwt from 'jsonwebtoken';
import {Op} from "sequelize";
import { WhereOptions } from 'sequelize';


const SECRET_KEY = process.env.ACCESS_JWT_KEY || "isEmptyJWT_KEY";

const clientController = {

    createClient: async (req: Request, res: Response): Promise<void> => {
        try {
            const { userId, phone, address, codePostal } = req.body;

            const client = await Client.create({
                userId,
                address,
                codePostal,
                phone
            });

            res.status(201).json(client);
        } catch (error) {
            if(error instanceof Error){
                console.error("Erreur lors de la création du client:", error.message);
                res.status(500).json({ message: "Erreur lors de la création du client:" + error.message });
            } else {
                console.error("Erreur inconnue lors de la création du client.");
                res.status(500).json({ message: "Erreur inconnue lors de la création du client" });
            }
        }
    },

    getAll: async (req: Request, res: Response): Promise<void> => {

    },

    getClient: async (req: Request, res: Response): Promise<void> => {

    },

    updateClient: async (req: Request, res: Response): Promise<void> => {

    },

    deleteClient: async (req: Request, res: Response): Promise<void> => {

    },
}

export default clientController;