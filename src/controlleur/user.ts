import bcrypt from "bcrypt";
import { User } from "../model/user-model";
import { v4 as uuidv4 } from 'uuid';
import { Client } from "../model/client-model";
import { Livreur } from "../model/livreur-model";
import { Restaurant } from "../model/restaurant-model";
import { UserType } from "../model/user-type";

interface UserConfig {
    name: string;
    email: string;
    password: string;
    type: string;
    extra?: Record<string, any>;
}

async function createClient(userId: string) {
    return await Client.create({ userId });
}

async function createLivreur(userId: string) {
    return await Livreur.create({ userId });
}

async function createRestaurant(userId: string, extra: any) {
    const newRestaurant = await Restaurant.create({
        ownerId: userId,
        name: extra.name ?? `${extra.name}'s Restaurant`,
        address: extra.address ?? "Adresse à définir",
        phone: extra.phone ?? "Numéro de téléphone à définir"
    });

    if (extra.types && Array.isArray(extra.types)) {
        await newRestaurant.$set('types', extra.types);
    }

    return newRestaurant;
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
        return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }

    if (!isRegister && requestingUser !== UserType.ADMIN) {
        return res.status(403).json({ error: 'Accès interdit. Seuls les administrateurs peuvent créer des utilisateurs.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ id: uuidv4(), name, email, password: hashedPassword, type });

    const createTypeSpecific = typeFactory[type];
    if (createTypeSpecific) {
        await createTypeSpecific(newUser.id, extra);
    }

    return newUser;
}
