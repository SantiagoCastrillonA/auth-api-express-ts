import { Request, Response } from 'express';
import ProductService from '../services/ProductService';
import { ProductRepository } from '../repositories/product.repository';

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, stock, category_id, supplier_id } = req.body;
        
        if (!name || !price || !stock) {
            return res.status(400).json({ 
                message: 'Nombre, precio y stock son requeridos' 
            });
        }

        const product = await ProductService.create({
            name,
            description,
            price,
            stock,
            category_id,
            supplier_id
        });

        res.status(201).json({
            message: 'Producto creado exitosamente',
            product
        });
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ message: 'Error al crear el producto' });
    }
};

export const getAllProducts = async (_req: Request, res: Response) => {
    try {
        const products = await ProductRepository.findAll();
        res.json({ products });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await ProductRepository.findById(parseInt(id));
        
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        
        res.json({ product });
    } catch (error) {
        console.error('Error al obtener producto:', error);
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, category_id, supplier_id } = req.body;
        
        if (!name && !price && !stock) {
            return res.status(400).json({ 
                message: 'Se requiere al menos un campo para actualizar' 
            });
        }

        const updated = await ProductRepository.update(parseInt(id), {
            name, description, price, stock, category_id, supplier_id
        });

        if (!updated) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json({ 
            message: 'Producto actualizado exitosamente',
            product: updated
        });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ message: 'Error al actualizar el producto' });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await ProductRepository.delete(parseInt(id));

        if (!deleted) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
};