import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "isEmptyJWT_KEY"; 

export const authenticateToken = (req, res, next) => {
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