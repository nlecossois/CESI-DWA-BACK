import Config from "../models/config.schema.ts";
import { Request, Response } from "express";
import {unlink} from "fs";

interface Address {
    numero: string;
    rue: string;
    "code postal": string;
    ville: string;
    pays: string;
    coordinates?: [number, number] | "none";
}

//Fonction qui remplace les espaces par des +
const replaceAll = (str: string, search: string = " ", replacement: string = "+") => {
    return str.split(search).join(replacement);
};

const configController = {
    //Calculer la distance entre deux adresses
    getDistance: async (req: Request, res: Response) => {
        try {

            res.status(200).send({
                message: "Distance calculée",
                distance: 100,
            });
            return;

        } catch (error : unknown) {
            if(error instanceof Error){
                //On renvoie une erreur 500 avec le message d'erreur
                res.status(500).send("Erreur serveur : " + error.message);
                return;
            } else {
                //On renvoie une erreur 500 avec un message d'erreur générique
                res.status(500).send("Erreur serveur : unknown error");
                return;
            }
        }
    }
};

export default configController;