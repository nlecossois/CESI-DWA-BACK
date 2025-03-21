import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { addUser } from "../controlleur/user";
import { User } from "../model/user-model";
import { authenticateToken } from "../controlleur/authenticate";
import { Restaurant } from "../model/restaurant-model";
import { UserType } from "../model/user-type";

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "isEmptyJWT_KEY"; 

router.post('/register', async (req: any, res: any) => {
    const { name, email, password, type, extra } = req.body;  // On récupère extra
    try {
        // Ajout de extra dans la fonction addUser
        const userConfig = { name, email, password, type, extra };
        const user: User = await addUser(res, userConfig, true, userConfig.type);

        const token = jwt.sign({ id: user.id, name: user.name, email: user.email, type: user.type }, SECRET_KEY, { expiresIn: '4h' });
        
        res.status(201).json({ message: "Inscription réussie", user, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Erreur serveur : ${err.message}` });
    }
});

router.post('/create', authenticateToken, async (req: any, res: any) => {
    const { name, email, password, type, extra } = req.body;
    try {
        const id = req.user.id;
        const user = await User.findOne({ where: { id } });
        const newUser = await addUser(res, { name, email, password, type, extra }, false, user.type);
        res.status(201).json({ message: "Utilisateur créé", newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Erreur serveur : ${err.message}` });
    }
});

router.post('/login', async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Aucun identifiants existant' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Identifiants incorrects' });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '4h' });

    res.status(201).json({ message: `Connexion réussie`, user, token });
  } catch (err) {
    res.status(500).json({ error: `Erreur serveur : ${err}` });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ where: { id } });    

    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Erreur serveur : ${err}` });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ where: { id } });    

    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    if (user.type === UserType.RESTAURANT) {
      await Restaurant.destroy({ where: { ownerId: user.id } });
    }

    await user.destroy()

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Erreur serveur : ${err}` });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  try {

    const { id } = req.user
    const user = await User.findOne({ where: { id } })
    const allowedRoles = ['admin'];

    if (!allowedRoles.includes(user.type)) return res.status(403).json({ error: 'Accès refusé : privilèges insuffisants' });

    const users = await User.findAll();
    
    if (users.length === 0) return res.status(404).json({ error: 'Aucun utilisateur trouvé' });
    
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Erreur serveur : ${err}` });
  }
});

export default router;

