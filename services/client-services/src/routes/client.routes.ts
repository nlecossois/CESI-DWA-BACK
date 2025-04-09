import clientController from "../controller/client.controller.ts";
import { Application } from "express";

export default function registerClientRoutes(app: Application) {
    app.get("/client/test", clientController.test);
}