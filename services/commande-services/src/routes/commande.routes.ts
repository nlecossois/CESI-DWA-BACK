import commandeController from "../controller/commande.controller";
import { Application } from "express";

export default function registerCommandeRoutes(app: Application) {
    app.post("/commande/createCommande", commandeController.createCommande);
    app.get("/commande/getCommands", commandeController.getCommands);
    app.put("/commande/updateCommande", commandeController.updateCommande);
}