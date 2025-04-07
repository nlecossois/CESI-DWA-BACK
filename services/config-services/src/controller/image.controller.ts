import express, { Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import mime from 'mime-types';

const app = express();

// Crée un dossier pour stocker les images si ce n'est pas déjà fait
const imageDirectory = path.join(__dirname, '..', '..', 'public', 'images'); // Remonte deux niveaux pour stocker les images

if (!fs.existsSync(imageDirectory)) {
    fs.mkdirSync(imageDirectory, { recursive: true });
}

// Définition des extensions autorisées
const allowedExtensions = ['image/jpeg', 'image/png', 'image/webp'];

// Configure Multer pour stocker les fichiers dans un dossier temporaire
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imageDirectory); // Dossier où on veut stocker les images
    },
    filename: (req, file, cb) => {
        const imageUUID = uuidv4(); // Génère un UUID pour chaque image
        const extension = path.extname(file.originalname).toLowerCase(); // Obtenir l'extension du fichier
        cb(null, `${imageUUID}${extension}`); // Nom du fichier : UUID.extension
    }
});

// Vérifie les types de fichiers autorisés
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (allowedExtensions.includes(file.mimetype)) {
        cb(null, true); // Si le type est autorisé
    } else {
        cb(null, false); // Ne pas accepter le fichier sans lancer d'erreur
    }
};

const upload = multer({ storage, fileFilter });

app.use('/public/images', express.static(path.join(__dirname, '..', '..', 'images')));

// Contrôleur pour le téléchargement de l'image
const imageController = {
    postImage: async (req: Request, res: Response): Promise<any> => {
        try {
            // On vérifie si une image a bien été fournie
            if (!req.file) {
                return res.status(400).send("Aucune image fournie.");
            }

            // Image uploadée avec succès
            const imageUUID = req.file.filename.split('.')[0]; // Extraire l'UUID du nom du fichier
            const imagePath = path.join(imageDirectory, req.file.filename);
            return res.status(200).send({
                message: "🚀 Image uploadée avec succès",
                uuid: imageUUID,
                url: `http://localhost:3000/public/images/${req.file.filename}`,
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("❌ Erreur lors de l'upload de l'image :", error.message);
                return res.status(500).send({
                    message: "Erreur lors de l'upload de l'image",
                    error: error.message,
                });
            } else {
                console.error("❌ Erreur inconnue :", error);
                return res.status(500).send({
                    message: "Erreur inconnue lors de l'upload de l'image",
                });
            }
        }
    },

    getImage: async (req: Request, res: Response): Promise<any> => {
        try {
            // On récupère l'UUID dans le corps de la requête
            const { uuid } = req.body;

            // Vérifier que l'UUID a été fourni dans le corps de la requête
            if (!uuid) {
                return res.status(400).send("Aucun UUID fourni.");
            }

            // On vérifie si le fichier existe avec l'UUID dans le répertoire des images
            const imagePath = fs.readdirSync(imageDirectory).find(file => file.startsWith(uuid));

            // Si aucun fichier correspondant n'est trouvé
            if (!imagePath) {
                console.log("❌ Aucune image trouvée avec l'UUID :", uuid, "dans le répertoire des images.");
                console.log(imageDirectory + " " + imagePath + " " + fs.readdirSync(imageDirectory));
                return res.status(404).send("Image non trouvée avec l'uuid: " + uuid);
            }

            // On construit le chemin complet du fichier
            const filePath = path.join(imageDirectory, imagePath);

            // Détecter le type MIME de l'image
            const mimeType = mime.lookup(filePath) || 'application/octet-stream';

            // Lire l'image en buffer
            const buffer = fs.readFileSync(filePath);

            // Convertir le buffer en chaîne Base64
            const base64String = buffer.toString('base64');

            // Construire la Data URL (incluant le type MIME et les données Base64)
            const dataUrl = `data:${mimeType};base64,${base64String}`;

            // Renvoyer la Data URL dans la réponse
            return res.send({ dataUrl });

        } catch (error: unknown) {
            // Gestion des erreurs globales
            if (error instanceof Error) {
                console.error("❌ Erreur lors de la récupération de l'image :", error.message);
                return res.status(500).send({
                    message: "Erreur lors de la récupération de l'image",
                    error: error.message,
                });
            } else {
                console.error("❌ Erreur inconnue :", error);
                return res.status(500).send({
                    message: "Erreur inconnue lors de la récupération de l'image",
                });
            }
        }
    }

};

export default imageController;