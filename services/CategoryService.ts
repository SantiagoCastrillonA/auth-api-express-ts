import { Category } from '../models/category.model';
import { CategoryRepository } from '../repositories/category.repository';

class CategoryService {
    private repository: CategoryRepository;

    constructor() {
        this.repository = new CategoryRepository();
    }

    async findAll(): Promise<Category[]> {
        return await this.repository.findAll();
    }

    async findById(id: number): Promise<Category | null> {
        return await this.repository.findById(id);
    }

    async create(categoryData: Category): Promise<Category> {
        return await this.repository.create(categoryData);
    }

    async update(id: number, categoryData: Category): Promise<Category | null> {
        return await this.repository.update(id, categoryData);
    }

    async delete(id: number): Promise<boolean> {
        return await this.repository.delete(id);
    }
}

export default new CategoryService();