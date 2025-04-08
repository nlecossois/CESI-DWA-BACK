import livreurController from "../controller/livreur.controller";
import { Application } from "express";

export default function registerLivreurRoutes(app: Application) {
    app.post("/livreur/test", livreurController.test);
}