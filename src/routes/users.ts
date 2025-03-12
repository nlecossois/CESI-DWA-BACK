import { User } from "../model/user-model";
import express from "express";
import pool from "../database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "isEmptyJWT_KEY"; 

router.post('/register', async (req, res) => {
  const { name, email, password, type } = req.body;

  try {
    const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date();
    const updatedAt = "";

    const result = await pool.query(
      'INSERT INTO users (name, email, password, type, createdAt, updatedAt) VALUES ($1, $2, $3) RETURNING id, name, email, type, createdAt, updatedAt',
      [name, email, hashedPassword, type, createdAt, updatedAt]
    );

    const user: User = result.rows[0];

    const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, SECRET_KEY, { expiresIn: '4h' });

    res.status(201).json({ message: "Inscription réussie", user, token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(401).json({ error: 'Aucun identifiants existant' });

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Identifiants incorrects' });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '4h' });

    res.status(201).json({ message: `Connexion réussie`, user, token });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur', err });
  }
});

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

router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT id, name, email FROM users WHERE id = $1', [id]);    

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;