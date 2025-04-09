import { Request, Response } from "express";
import { Client, ClientAttributes } from "../models/client.model";
import jwt from 'jsonwebtoken';
import {Op} from "sequelize";
import { WhereOptions } from 'sequelize';


const SECRET_KEY = process.env.ACCESS_JWT_KEY || "isEmptyJWT_KEY";

const clientController = {

    test: async (req: Request, res: Response): Promise<any> => {
        res.status(200).json({ message: "Hello from client service" });
    }
}

export default clientController;