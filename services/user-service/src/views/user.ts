import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { addUser } from "../controlleur/user";
import { User } from "../model/user-model";
import { UserType } from "../model/user-type";
import axios from "axios";
import { BASE_URLS } from "../conf/route";

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "isEmptyJWT_KEY";

router.post('/register', async (req: any, res: any) => {
    const { name, email, password, type, extra } = req.body;
    try {
        const userConfig = { name, email, password, type, extra };
        const user: User = await addUser(res, userConfig, true, userConfig.type);

        const token = jwt.sign({ id: user.id, name: user.name, email: user.email, type: user.type }, SECRET_KEY, { expiresIn: '4h' });
        
        res.status(201).json({ message: "Inscription réussie", user, token });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: `Erreur serveur : ${err.message}` });
    }
});

router.post('/create', async (req: any, res: any) => {
    const { name, email, password, type, extra } = req.body;
    try {
        const id = req.user.id;
        const user = await User.findOne({ where: { id } });
        if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
        const newUser = await addUser(res, { name, email, password, type, extra }, false, user.type);
        res.status(201).json({ message: "Utilisateur créé", newUser });
    } catch (err: any) {
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

router.get('/:id', async (req: any, res: any) => {
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

router.delete('/:id', async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ where: { id } });    

    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    if (user.type === UserType.RESTAURANT) {
      try {
              const response = await axios.post(BASE_URLS.RESTAURANT, {
                  ownerId: user.id,
              });
              return response.data;
          } catch (error) {
              console.error("Erreur lors de la supression du restaurant:", error);
              throw new Error("Impossible de supprimer le restaurant");
          }
    }

    await user.destroy()

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Erreur serveur : ${err}` });
  }
});

router.get('/', async (req: any, res: any) => {
  try {
    const { id } = req.user
    const user = await User.findOne({ where: { id } })
    const allowedRoles = ['admin'];

    if (user && !allowedRoles.includes(user?.type)) return res.status(403).json({ error: 'Accès refusé : privilèges insuffisants' });

    const users = await User.findAll();
    
    if (users.length === 0) return res.status(404).json({ error: 'Aucun utilisateur trouvé' });
    
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Erreur serveur : ${err}` });
  }
});

router.post('/authenticate', async (req: any, res: any) => {

  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Accès refusé' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token invalide' });

  jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: 'Token expiré ou invalide' });
    req.user = user;
    res.json(user)
  });
})

export default router;

