import { Request, Response } from "express";
import {unlink} from "fs";
import paramsController from "./params.controller.ts";

interface Address {
    numero: string;
    rue: string;
    "code postal": string;
    ville: string;
    pays: string;
    coordinates?: [number, number] | "none";
}


const isAddressValid = (address: Address): boolean => {
    if (
        typeof address.numero !== "string" ||
        typeof address.rue !== "string" ||
        typeof address["code postal"] !== "string" ||
        typeof address.ville !== "string" ||
        typeof address.pays !== "string"
    ) {
        console.error("Adresse invalide : ", address);
        return false;
    }
    return true;
};

const haversineDistance = (coord1: [number, number], coord2: [number, number]): number => {
    const toRad = (deg: number): number => (deg * Math.PI) / 180;

    const [lon1, lat1] = coord1;
    const [lon2, lat2] = coord2;

    const R = 6371e3; // Rayon de la Terre en mètres

    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);

    const a =
        Math.sin(Δφ / 2) ** 2 +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;

    return d; // en mètres
};

const configController = {
    callGetDistance: async (req: Request, res: Response) => {
        const address1: Address = req.body.address1;
        const address2: Address = req.body.address2;
        if (!isAddressValid(address1) || !isAddressValid(address2)) {
            res.status(400).send("Erreur : une ou plusieurs adresses invalides.");
            return;
        }
        const { distanceRoute: distanceRoute, distanceVolOiseau: distanceVolOiseau } = await configController.getDistance(address1, address2);

        //On renvoie les données
        res.status(200).send({
            message: "Données extraites avec succès",
            address1,
            address2,
            distanceRoute,
            distanceVolOiseau,
        });
        return;
    },

    //Calculer la distance entre deux adresses
    getDistance: async (address1: Address, address2: Address) => {
        try {
            if (!isAddressValid(address1) || !isAddressValid(address2)) {
                throw new Error("Une ou plusieurs adresses invalides.");
            }

            const address1Tab = [
                address1.numero || "null",
                address1.rue.replace(/ /g, "+") || "null",
                address1["code postal"] || "null",
                address1.ville || "null",
                address1.pays || "null",
            ];
            const address2Tab = [
                address2.numero || "null",
                address2.rue.replace(/ /g, "+") || "null",
                address2["code postal"] || "null",
                address2.ville || "null",
                address2.pays || "null",
            ];

            const url1 = `https://api-adresse.data.gouv.fr/search/?q=${address1Tab[0]}+${address1Tab[1]}&postcode=${address1Tab[2]}`;
            const url2 = `https://api-adresse.data.gouv.fr/search/?q=${address2Tab[0]}+${address2Tab[1]}&postcode=${address2Tab[2]}`;

            const [response1, response2] = await Promise.all([fetch(url1), fetch(url2)]);

            if (!response1.ok || !response2.ok) {
                throw new Error("Impossible de récupérer les coordonnées GPS des adresses.");
            }

            const data1 = await response1.json();
            const data2 = await response2.json();

            const coords1 = data1.features?.[0]?.geometry?.coordinates ?? "none";
            const coords2 = data2.features?.[0]?.geometry?.coordinates ?? "none";

            address1.coordinates = coords1;
            address2.coordinates = coords2;

            const [lon1, lat1] = coords1;
            const [lon2, lat2] = coords2;

            const routingUrl = `https://routing.openstreetmap.de/routed-car/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false&geometries=polyline`;
            const routingResponse = await fetch(routingUrl);

            if (!routingResponse.ok) {
                throw new Error("Erreur lors de la récupération de la distance via OpenStreetMap.");
            }

            const routingData = await routingResponse.json();
            const route = routingData.routes?.[0];

            if (!route) {
                throw new Error("Aucune route trouvée entre les deux points.");
            }

            const distanceRoute = route.distance / 1000; // Distance en km
            const roundedDistanceRoute = Math.round(distanceRoute * 100) / 100;

            const haversine = haversineDistance(coords1, coords2);
            const haversineKm = haversine / 1000; // Distance en km
            const roundedDidtanceVolOiseau = Math.round(haversineKm * 100) / 100;

            return {
                distanceRoute: roundedDistanceRoute,
                distanceVolOiseau: roundedDidtanceVolOiseau,
            };
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error("Erreur inconnue lors du calcul de la distance.");
            }
        }
    },
    //Fonction permettant de calculer le prix d'une commande
    getCommandPrice: async (req: Request, res: Response) => {
        try {
            const address1: Address = req.body.address1;
            const address2: Address = req.body.address2;
            const cartValue: number = req.body.cartValue;

            if (!isAddressValid(address1) || !isAddressValid(address2)) {
                res.status(400).send("Erreur : une ou plusieurs adresses invalides.");
                return;
            }

            if(!cartValue || typeof cartValue !== "number") {
                res.status(400).send("Erreur : la valeur du panier est invalide.");
                return;
            }

            // Appel local à la fonction `getDistance` pour obtenir la distance entre address1 et address2
            const { distanceRoute: distanceTotal, distanceVolOiseau: distanceVolOiseau1 } = await configController.getDistance(address1, address2);

            //On va maintenant récuperer les paramètres dont nous avons besoins
            const deliveryPriceByKm = await paramsController.getParam("deliveryPriceByKm");
            const servicePrice = await paramsController.getParam("servicePrice");

            //On va récuperer uniquement le value
            const numDeliveryPriceByKm = deliveryPriceByKm?.value ?? 0;
            const numServicePrice = servicePrice?.value ?? 0;

            //Maintenant, nous allons opérer les calculs
            const tvaService : number = 0.2;
            const tvaFood : number = 0.1;

            const cartTTC : number =  Math.round((cartValue * (1 + tvaFood)) * 100) / 100;
            const serviceTTC : number =  Math.round((numServicePrice * (1 + tvaService)) * 100) / 100;

            const roundedDeliveryHT : number = Math.round((numDeliveryPriceByKm * distanceTotal) * 100) / 100;
            const roundedDeliveryTTC : number = Math.round((roundedDeliveryHT * (1 + tvaService)) * 100) / 100;

            res.status(200).send({
                cart: {
                    "Cart HT": cartValue,
                    "Cart TVA": tvaFood * 100 + "%",
                    "Cart TTC": cartTTC,
                },
                service: {
                    "Service HT": numServicePrice,
                    "Service TVA": tvaService * 100 + "%",
                    "Service TTC": serviceTTC,
                },
                delivery: {
                    "Unit price / km": numDeliveryPriceByKm,
                    "Distance total": distanceTotal,
                    "Delivery HT": roundedDeliveryHT,
                    "Delivery TVA": tvaService * 100 + "%",
                    "Delivery TTC": roundedDeliveryTTC
                },
                total: {
                    "Total HT": cartValue+numServicePrice+roundedDeliveryHT,
                    "Total TTC": cartTTC+serviceTTC+roundedDeliveryTTC,
                }
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).send("Erreur serveur : " + error.message);
            } else {
                res.status(500).send("Erreur serveur : erreur inconnue");
            }
        }
    },
};

export default configController;