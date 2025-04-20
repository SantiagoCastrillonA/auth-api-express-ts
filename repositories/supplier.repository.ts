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

    static async update(id: number, supplier: SupplierDto) {
        const sql = `
            UPDATE suppliers 
            SET name = COALESCE(?, name),
                contact_name = COALESCE(?, contact_name),
                email = COALESCE(?, email),
                phone = COALESCE(?, phone),
                address = COALESCE(?, address)
            WHERE id = ?
        `;
        const [result]: any = await db.execute(sql, [
            supplier.name,
            supplier.contact_name,
            supplier.email,
            supplier.phone,
            supplier.address,
            id
        ]);
        return result.affectedRows > 0;
    }

    static async delete(id: number) {
        const sql = 'DELETE FROM suppliers WHERE id = ?';
        const [result]: any = await db.execute(sql, [id]);
        return result.affectedRows > 0;
    }
}