import db from '../config/config-db';
import User from '../Dto/UserDto';
import Auth from '../Dto/AuthDto';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

class UserRepository {

  static async add(user: User) {
    const sql = 'INSERT INTO users (email, nombres, apellidos, telefono, password) VALUES (?, ?, ?, ?, ?)';
    const values = [user.email, user.nombres, user.apellidos, user.telefono, user.password];
    return db.execute(sql, values);
  }

  static async login(auth: Auth) {
    const sql = 'SELECT id, password FROM users WHERE email=?';
    const values = [auth.email];
    const result: any = await db.execute(sql, values);
    if (result[0].length > 0) {
      const isPasswordValid = await bcrypt.compare(auth.password, result[0][0].password);
      if (isPasswordValid) {
        return { logged: true, status: "Successful authentication", id: result[0][0].id }
      }
      return { logged: false, status: "Invalid username or password" };
    }
    return { logged: false, status: "Invalid username or password" };
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

export default UserRepository;