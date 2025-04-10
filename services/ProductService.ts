import ProductDto from '../Dto/ProductDto';
import { ProductRepository } from '../repositories/product.repository';

class ProductService {
    static async create(product: ProductDto) {
        return await ProductRepository.create(product);
    }
}

export default ProductService;