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


const isAddressValid = (address: Address): boolean => {
    return (
        typeof address.numero === "string" &&
        typeof address.rue === "string" &&
        typeof address["code postal"] === "string" &&
        typeof address.ville === "string" &&
        typeof address.pays === "string"
    );
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
    //Calculer la distance entre deux adresses
    getDistance: async (req: Request, res: Response) => {
        try {
            //On commence par récuperer nos deux addresses
            const address1: Address = req.body.address1;
            const address2: Address = req.body.address2;
            //On vérifie que les deux adresses sont présentes
            if (!isAddressValid(address1) || !isAddressValid(address2)) {
                res.status(400).send("Erreur : une ou plusieurs adresses invalides ! " + address1 + "; " + address2);
                return;
            }
            //Les addresses sont au format: 13, la noé violain, 44119, treillières, france
            //On format cela dans un tableau
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


            //On crée une URL pour l'API de https://api-adresse.data.gouv.fr/search/?q=${address.numero}+${address.rue.replaceAll(" ", "+")}+${address["code postal"]}+${address.ville.replaceAll(" ", "+")}`
            const url1 = `https://api-adresse.data.gouv.fr/search/?q=${address1Tab[0]}+${address1Tab[1]}&postcode=${address1Tab[2]}`;
            const url2 = `https://api-adresse.data.gouv.fr/search/?q=${address2Tab[0]}+${address2Tab[1]}&postcode=${address2Tab[2]}`;

            const [response1, response2] = await Promise.all([
                fetch(url1),
                fetch(url2),
            ]);

            if (!response1.ok || !response2.ok) {
                res.status(400).send("Erreur API : Impossible de récupérer les coordonnées GPS des adresses.");
                return;
            }

            const data1 = await response1.json();
            const data2 = await response2.json();

            const coords1 = data1.features?.[0]?.geometry?.coordinates ?? "none";
            const coords2 = data2.features?.[0]?.geometry?.coordinates ?? "none";

            address1.coordinates = coords1;
            address2.coordinates = coords2;

            //Maintenant que l'on possède les coordonnées GPS, on va appeler une seconde API pour calculer la distance la plus rapide par la route
            // Construire l’URL pour l’API OpenStreetMap Routing
            const [lon1, lat1] = coords1;
            const [lon2, lat2] = coords2;

            const routingUrl = `https://routing.openstreetmap.de/routed-car/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false&geometries=polyline`;

            const routingResponse = await fetch(routingUrl);

            if (!routingResponse.ok) {
                res.status(400).send("Erreur lors de la récupération de la distance via OpenStreetMap.");
                return;
            }
            const routingData = await routingResponse.json();
            const route = routingData.routes?.[0];

            if (!route) {
                res.status(400).send("Erreur : aucune route trouvée entre les deux points.");
                return;
            }

            //On convertit la distance en KM
            const distanceRoute = route.distance / 1000; // Distance en km
            //On arrondi au deuxième chiffre après la virgule
            const roundedDistanceRoute = Math.round(distanceRoute * 100) / 100;

            //Il ne nous reste plus qu'à calculer la distance à vol d'oiseau
            const haversine = haversineDistance(coords1, coords2);
            //On convertit en KM
            const haversineKm = haversine / 1000; // Distance en km
            //On arrondi au deuxième chiffre après la virgule
            const roundedDidtanceVolOiseau = Math.round(haversineKm * 100) / 100;


            res.status(200).send({
                message: "Coordonnées extraites avec succès",
                address1,
                address2,
                "distanceRoute" : roundedDistanceRoute,
                "distanceVolOiseau" : roundedDidtanceVolOiseau,
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