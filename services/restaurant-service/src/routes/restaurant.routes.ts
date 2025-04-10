import restaurantController from "../controller/restaurant.controller";
import {Application} from "express";

export default function registerRestaurantRoutes(app: Application) {
    app.get("/restaurants/", restaurantController.getAllRestaurants);
    app.post("/restaurants/", restaurantController.createRestaurant);
    app.get("/restaurants/:ownerId", restaurantController.getRestaurant);
    app.put("/restaurants/:ownerId", restaurantController.updateRestaurant);
    app.delete("/restaurants/:ownerId", restaurantController.deleteRestaurant);
    app.get("/types", restaurantController.getAllTypes);
}