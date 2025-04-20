import db from '../config/config-db';
import SupplierDto from '../Dto/SupplierDto';

export class SupplierRepository {
    static async create(supplier: SupplierDto) {
        const sql = `
            INSERT INTO suppliers (name, contact_name, email, phone, address)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result]: any = await db.execute(sql, [
            supplier.name,
            supplier.contact_name,
            supplier.email,
            supplier.phone,
            supplier.address
        ]);
        return { ...supplier, id: result.insertId };
    }

    static async findAll() {
        const sql = 'SELECT * FROM suppliers';
        const [rows]: any = await db.execute(sql);
        return rows;
    }

    static async findById(id: number) {
        const sql = 'SELECT * FROM suppliers WHERE id = ?';
        const [rows]: any = await db.execute(sql, [id]);
        return rows[0];
    }

    static async update(id: number, supplier: Partial<SupplierDto>) {
        try {
            // Filtrar solo los campos que tienen valor
            const updates: Record<string, any> = {};
            if (supplier.name !== undefined) updates.name = supplier.name;
            if (supplier.contact_name !== undefined) updates.contact_name = supplier.contact_name;
            if (supplier.email !== undefined) updates.email = supplier.email;
            if (supplier.phone !== undefined) updates.phone = supplier.phone;
            if (supplier.address !== undefined) updates.address = supplier.address;

            // Si no hay campos para actualizar, retornar false
            if (Object.keys(updates).length === 0) {
                return false;
            }

            // Construir la consulta SQL dinámicamente
            const setClauses = Object.keys(updates).map(key => `${key} = ?`).join(', ');
            const sql = `UPDATE suppliers SET ${setClauses} WHERE id = ?`;
            
            // Preparar los valores para la consulta
            const values = [...Object.values(updates), id];

            const [result]: any = await db.execute(sql, values);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error en update:', error);
            throw error;
        }
    }

    static async delete(id: number) {
        const sql = 'DELETE FROM suppliers WHERE id = ?';
        const [result]: any = await db.execute(sql, [id]);
        return result.affectedRows > 0;
    }
}