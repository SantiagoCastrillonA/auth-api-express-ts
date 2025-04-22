import { Product } from '../models/product-model';
import { ProductRepository } from '../repositories/product-repository';

const productRepository = new ProductRepository();

export default {
    create: async (productData: Product): Promise<Product> => {
        return await productRepository.create(productData);
    },

    findAll: async (): Promise<Product[]> => {
        return await productRepository.findAll();
    },

    findById: async (id: number): Promise<Product | null> => {
        return await productRepository.findById(id);
    },

    update: async (id: number, productData: Product): Promise<Product | null> => {
        return await productRepository.update(id, productData);
    },

    delete: async (id: number): Promise<boolean> => {
        return await productRepository.delete(id);
    }
};