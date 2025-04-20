import { Request, Response } from 'express';
import { SupplierRepository } from '../repositories/supplier.repository';

export const createSupplier = async (req: Request, res: Response) => {
    try {
        const supplier = await SupplierRepository.create(req.body);
        res.status(201).json({
            message: 'Proveedor creado exitosamente',
            supplier
        });
    } catch (error) {
        console.error('Error al crear proveedor:', error);
        res.status(500).json({ message: 'Error al crear el proveedor' });
    }
};

export const getAllSuppliers = async (_req: Request, res: Response) => {
    try {
        const suppliers = await SupplierRepository.findAll();
        res.json({ suppliers });
    } catch (error) {
        console.error('Error al obtener proveedores:', error);
        res.status(500).json({ message: 'Error al obtener los proveedores' });
    }
};

export const getSupplierById = async (req: Request, res: Response) => {
    try {
        const supplier = await SupplierRepository.findById(parseInt(req.params.id));
        if (!supplier) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }
        res.json({ supplier });
    } catch (error) {
        console.error('Error al obtener proveedor:', error);
        res.status(500).json({ message: 'Error al obtener el proveedor' });
    }
};

export const updateSupplier = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const updateData = req.body;

        // Validar que haya datos para actualizar
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ 
                message: 'No se proporcionaron datos para actualizar' 
            });
        }

        const updated = await SupplierRepository.update(id, updateData);
        
        if (!updated) {
            return res.status(404).json({ 
                message: 'Proveedor no encontrado o no hay cambios' 
            });
        }

        res.json({ 
            message: 'Proveedor actualizado exitosamente' 
        });
    } catch (error) {
        console.error('Error al actualizar proveedor:', error);
        res.status(500).json({ 
            message: 'Error al actualizar el proveedor' 
        });
    }
};

export const deleteSupplier = async (req: Request, res: Response) => {
    try {
        const deleted = await SupplierRepository.delete(parseInt(req.params.id));
        if (!deleted) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }
        res.json({ message: 'Proveedor eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar proveedor:', error);
        res.status(500).json({ message: 'Error al eliminar el proveedor' });
    }
};