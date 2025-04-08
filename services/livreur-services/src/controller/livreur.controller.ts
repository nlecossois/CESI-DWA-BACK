import { Request, Response } from "express";
import { Livreur } from "../models/livreur.model";
import jwt from 'jsonwebtoken';
import {Op} from "sequelize";

const SECRET_KEY = process.env.ACCESS_JWT_KEY || "isEmptyJWT_KEY";

const livreurController = {

    test: async (req: Request, res: Response) => {
        //On renvoie un 201
        res.status(201).json({ message: "Test successful" });
    }

}

export default livreurController;