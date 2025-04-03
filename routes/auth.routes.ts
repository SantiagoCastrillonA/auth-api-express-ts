import { Router, Request, Response } from 'express';

export class AuthController {
    static async register(req: Request, res: Response) {
        // Add registration logic here
        res.status(200).json({ message: 'Register endpoint' });
    }

    static async login(req: Request, res: Response) {
        // Add login logic here
        res.status(200).json({ message: 'Login endpoint' });
    }
}

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

export default router;