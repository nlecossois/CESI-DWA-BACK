import bcrypt from "bcrypt";
import axios from "axios";
import { User } from "../model/user-model";
import { v4 as uuidv4 } from "uuid";
import { UserType } from "../model/user-type";
import { BASE_URLS } from "../conf/route";

interface UserConfig {
    name: string;
    email: string;
    password: string;
    type: string;
    extra?: Record<string, any>;
}

async function createClient(userId: string) {
    try {
        const response = await axios.post(BASE_URLS.CLIENT, { userId });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création du client:", error);
        throw new Error("Impossible de créer le client");
    }
}

async function createLivreur(userId: string) {
    try {
        const response = await axios.post(BASE_URLS.LIVREUR, { userId });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création du livreur:", error);
        throw new Error("Impossible de créer le livreur");
    }
}

async function createRestaurant(userId: string, extra: any) {
    try {
        const response = await axios.post(BASE_URLS.RESTAURANT, {
            ownerId: userId,
            name: extra.name ?? `${extra.name}'s Restaurant`,
            address: extra.address ?? "Adresse à définir",
            phone: extra.phone ?? "Numéro de téléphone à définir",
            types: extra.types ?? [],
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création du restaurant:", error);
        throw new Error("Impossible de créer le restaurant");
    }
}

const typeFactory: Record<string, (userId: string, extra?: any) => Promise<any>> = {
    [UserType.CLIENT]: createClient,
    [UserType.LIVREUR]: createLivreur,
    [UserType.RESTAURANT]: createRestaurant,
};

export async function addUser(
    res: any, 
    userConfig: UserConfig,
    isRegister: boolean,
    requestingUser: string,
): Promise<User> {

    const { name, email, password, type, extra } = userConfig;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
        return res.status(400).json({ error: "Cet email est déjà utilisé" });
    }

    if (!isRegister && requestingUser !== UserType.ADMIN) {
        return res.status(403).json({ error: "Accès interdit. Seuls les administrateurs peuvent créer des utilisateurs." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ id: uuidv4(), name, email, password: hashedPassword, type });

    const createTypeSpecific = typeFactory[type];
    if (createTypeSpecific) {
        try {
            await createTypeSpecific(newUser.id, extra);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    return newUser;
}