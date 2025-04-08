import commandeController from "../controller/commande.controller";
import { Application } from "express";

export default function registerCommandeRoutes(app: Application) {
    app.get("/commande/test", commandeController.test);
}