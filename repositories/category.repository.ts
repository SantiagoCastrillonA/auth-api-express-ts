// repositories/category.repository.ts
import db from '../config/config-db';
import { Category } from '../models/category.model';
import { BaseRepository } from './base.repository';

export class CategoryRepository implements BaseRepository<Category> {
    async findAll(): Promise<Category[]> {
        try {
            const [rows]: any = await db.query('SELECT * FROM categories');
            console.log(`Se encontraron ${rows.length} categorías`);
            return rows;
        } catch (error) {
            console.error('Error al buscar categorías:', error);
            throw error;
        }
    }

    async findById(id: number): Promise<Category | null> {
        try {
            const [rows]: any = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
            return rows.length ? rows[0] : null;
        } catch (error) {
            console.error(`Error al buscar categoría con id ${id}:`, error);
            throw error;
        }
    }

    async create(category: Category): Promise<Category> {
        try {
            console.log('Intentando crear categoría:', category);
            const [result]: any = await db.query(
                'INSERT INTO categories (name, description) VALUES (?, ?)',
                [category.name, category.description]
            );
            console.log('Categoría creada con id:', result.insertId);
            return { id: result.insertId, ...category };
        } catch (error) {
            console.error('Error al crear categoría:', error);
            throw error;
        }
    }

    async update(id: number, category: Category): Promise<Category | null> {
        try {
            const [result]: any = await db.query(
                'UPDATE categories SET name = ?, description = ? WHERE id = ?',
                [category.name, category.description, id]
            );

            if (result.affectedRows === 0) return null;
            return this.findById(id);
        } catch (error) {
            console.error(`Error al actualizar categoría ${id}:`, error);
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const [result]: any = await db.query('DELETE FROM categories WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error(`Error al eliminar categoría ${id}:`, error);
            throw error;
        }
    }
}