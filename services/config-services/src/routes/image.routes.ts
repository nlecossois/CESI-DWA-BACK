import imageController from "../controller/image.controller.ts";
import {Application} from "express";
import multer from "multer";
const upload = multer({ dest: "public/images/" });

export default function registerImageRoutes(app: Application) {
    app.post("/config/postImage", upload.single("newImage"), imageController.postImage);
    app.post("/config/getImage/", imageController.getImage);
}