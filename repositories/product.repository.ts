import db from '../config/config-db';
import { Product } from '../models/product.model';
import { BaseRepository } from './base.repository';

export class ProductRepository implements BaseRepository<Product> {
    async create(product: Product): Promise<Product> {
        try {
            console.log('Iniciando creación de producto:', product);

            const query = 'INSERT INTO products (name, description, price, stock, category_id, supplier_id) VALUES (?, ?, ?, ?, ?, ?)';
            const params = [product.name, product.description, product.price, product.stock, product.category_id, product.supplier_id];

            console.log('Query:', query);
            console.log('Parámetros:', params);

            const [result]: any = await db.query(query, params);

            console.log('Resultado de inserción:', result);

            return { id: result.insertId, ...product };
        } catch (error) {
            console.error('Error en repositorio:', error);
            throw error;
        }
    }

    async findAll(): Promise<Product[]> {
        const sql = 'SELECT * FROM products';
        const [rows]: any = await db.execute(sql);
        return rows;
    }

    async findById(id: number): Promise<Product | null> {
        const sql = 'SELECT * FROM products WHERE id = ?';
        const [rows]: any = await db.execute(sql, [id]);
        return rows[0] || null;
    }

    async update(id: number, product: Product): Promise<Product | null> {
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

    async delete(id: number): Promise<boolean> {
        const sql = 'DELETE FROM products WHERE id = ?';
        const [result]: any = await db.execute(sql, [id]);
        return result.affectedRows > 0;
    }
}