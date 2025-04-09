import restaurantController from "../controller/restaurant";
import {Application} from "express";

export default function registerRestaurantRoutes(app: Application) {
    app.post("/restaurants/createRestaurant", restaurantController.createRestaurant);
    app.get("/restaurants/:id", restaurantController.getRestaurant);
    app.get("/getAllRestaurants", restaurantController.getAllRestaurants);
    app.put("/restaurants/:id", restaurantController.updateRestaurant);
    app.delete("/restaurants/:id", restaurantController.deleteRestaurant);
}