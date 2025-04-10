import db from '../config/config-db';

export interface Product {
    id?: number;
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    category_id?: number;
    supplier_id?: number;
    created_at?: Date;
}

export class ProductRepository {
    static async create(product: Product): Promise<Product> {
        const sql = `
            INSERT INTO products 
            (name, description, price, stock, category_id, supplier_id) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        const [result]: any = await db.execute(sql, [
            product.name,
            product.description,
            product.price,
            product.stock,
            product.category_id,
            product.supplier_id
        ]);

        return { ...product, id: result.insertId };
    }

    static async findAll(): Promise<Product[]> {
        const sql = 'SELECT * FROM products';
        const [rows]: any = await db.execute(sql);
        return rows;
    }

    static async findById(id: number): Promise<Product | null> {
        const sql = 'SELECT * FROM products WHERE id = ?';
        const [rows]: any = await db.execute(sql, [id]);
        return rows[0] || null;
    }

    static async update(id: number, product: Product): Promise<Product | null> {
        const sql = `
            UPDATE products 
            SET name = COALESCE(?, name),
                description = COALESCE(?, description),
                price = COALESCE(?, price),
                stock = COALESCE(?, stock),
                category_id = COALESCE(?, category_id),
                supplier_id = COALESCE(?, supplier_id)
            WHERE id = ?
        `;

        const [result]: any = await db.execute(sql, [
            product.name,
            product.description,
            product.price,
            product.stock,
            product.category_id,
            product.supplier_id,
            id
        ]);

        if (result.affectedRows === 0) return null;
        return this.findById(id);
    }

    static async delete(id: number): Promise<boolean> {
        const sql = 'DELETE FROM products WHERE id = ?';
        const [result]: any = await db.execute(sql, [id]);
        return result.affectedRows > 0;
    }
}