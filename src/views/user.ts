import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { addUser } from "../controlleur/user";
import { User } from "../model/user-model";

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "isEmptyJWT_KEY"; 


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Accès refusé' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token invalide' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token expiré ou invalide' });

    req.user = user;
    next();
  });
}; 

router.post('/create', authenticateToken, async (req: any, res: any) => {
  const { name, email, password, type } = req.body;

  try {
    // Vérifier si l'utilisateur authentifié est un Admin
    if (req.user.type !== 'admin') {
      return res.status(403).json({ error: "Accès refusé. Seuls les admins peuvent créer des utilisateurs." });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }

    const allowedUserTypes = ['client', 'livreur', 'restaurant'];
    if (!allowedUserTypes.includes(type)) {
      return res.status(403).json({ error: 'Création non autorisée pour ce type d\'utilisateur' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      type
    });

    res.status(201).json({ message: "Utilisateur créé avec succès", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Erreur serveur : ${err}` });
  }
});

router.post('/register', async (req: any, res: any) => {
    const { name, email, password, role } = req.body;
    const isAdmin = req.user?.role === 'Admin'; // Vérifier si l'utilisateur authentifié est un admin

    try {
        const user: User = await addUser(res, name, email, password, role, isAdmin);
        const token = jwt.sign({ id: user.id, name: user.name, email: user.email, type: user.type }, SECRET_KEY, { expiresIn: '4h' });
        res.status(201).json({ message: "Inscription réussie", user, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Erreur serveur : ${err}` });
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
function uuidv4(): unknown {
  throw new Error("Function not implemented.");
}

