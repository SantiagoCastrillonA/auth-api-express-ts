import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { log } from 'console';
dotenv.config();


interface JwtPayload {
    data: { id: number },
    exp: number,
    iat: number
}


const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Imprime los headers para depuración
        console.log("Headers:", req.headers);

        const authHeader = req.headers['authorization'];
        console.log("Auth Header:", authHeader);

        if (!authHeader) {
            return res.status(401).json({
                status: 'Unauthorized',
                message: 'No authorization header'
            });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                status: 'Unauthorized',
                message: 'No token provided'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'clave_secreta');
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error en verificación de token:", error);
        return res.status(401).json({
            status: 'Unauthorized',
            message: 'Invalid token'
        });
    }
};


export default verifyToken;