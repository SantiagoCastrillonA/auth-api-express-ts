interface ProductDto {
    id?: number;
    name: string;
    description?: string;
    price: number;
    stock: number;
    category_id?: number;
    supplier_id?: number;
    created_at?: Date;
}

export default ProductDto;