import db from '../config/config-db';

export interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
}

export class UserModel {
    static async create(user: User): Promise<any> {
        const [result] = await db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [user.username, user.email, user.password]
        );
        return result;
    }

    static async findByEmail(email: string): Promise<User | null> {
        const [rows]: any = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0] || null;
    }
}