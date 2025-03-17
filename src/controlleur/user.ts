import bcrypt from "bcrypt";
import { UserType } from "../model/user-type";
import { User } from "../model/user-model";
  import { v4 as uuidv4 } from 'uuid';
import { Client } from "../model/client-model";
import { Developpeur } from "../model/developpeur-model";
import { Livreur } from "../model/livreur-model";
import { Restaurant } from "../model/restaurant-model";

export async function addUser(
    res: any, 
    name: string, 
    email: string, 
    password: string, 
    role: string, 
    isAdmin: boolean
): Promise<User> {
    const existingUser = await User.findOne({ where: { email } });
    const allowedRoles = ['Client', 'Livreur', 'Restaurateur'];
    const adminOnlyRoles = ['Developpeur', 'Commercial', 'Technique'];

    if (!allowedRoles.includes(role) && (!isAdmin || !adminOnlyRoles.includes(role))) {
        return res.status(403).json({ error: 'Vous n\'avez pas l\'autorisation de créer cet utilisateur' });
    }

    if (existingUser) {
        return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ id: uuidv4(), name, email, password: hashedPassword, role });

    switch (role) {
        case 'Client':
            await Client.create({ userId: newUser.id });
            break;
        case 'Livreur':
            await Livreur.create({ userId: newUser.id });
            break;
        case 'Developpeur':
            await Developpeur.create({ userId: newUser.id, apiKey: uuidv4() });
            break;
        case 'Restaurateur':
            await Restaurant.create({ ownerId: newUser.id, name: `${name}'s Restaurant`, address: "Adresse à définir" });
            break;
    }

    return newUser;
}
