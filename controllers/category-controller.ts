import { Request, Response } from 'express';
import CategoryService from '../services/CategoryService';

export const getAllCategories = async (_req: Request, res: Response) => {
    try {
        const categories = await CategoryService.findAll();

        res.status(200).json({
            message: 'Categorías obtenidas exitosamente',
            count: categories.length,
            categories
        });
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        res.status(500).json({ message: 'Error al obtener categorías' });
    }
};

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const category = await CategoryService.findById(id);

        if (!category) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        res.status(200).json({ category });
    } catch (error) {
        console.error(`Error al obtener categoría ${req.params.id}:`, error);
        res.status(500).json({ message: 'Error al obtener categoría' });
    }
};

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'El nombre de la categoría es requerido' });
        }

        console.log('Datos recibidos:', { name, description });

        const newCategory = await CategoryService.create({ name, description });

        res.status(201).json({
            message: 'Categoría creada exitosamente',
            category: newCategory
        });
    } catch (error) {
        console.error('Error al crear categoría:', error);
        res.status(500).json({ message: 'Error al crear categoría' });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'El nombre de la categoría es requerido' });
        }

        const updatedCategory = await CategoryService.update(id, { name, description });

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        res.status(200).json({
            message: 'Categoría actualizada exitosamente',
            category: updatedCategory
        });
    } catch (error) {
        console.error(`Error al actualizar categoría ${req.params.id}:`, error);
        res.status(500).json({ message: 'Error al actualizar categoría' });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await CategoryService.delete(id);

        if (!result) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        res.status(200).json({ message: 'Categoría eliminada exitosamente' });
    } catch (error) {
        console.error(`Error al eliminar categoría ${req.params.id}:`, error);
        res.status(500).json({ message: 'Error al eliminar categoría' });
    }
};