interface SupplierDto {
    id?: number;
    name: string;
    contact_name?: string;
    email: string;
    phone?: string;
    address?: string;
    created_at?: Date;
    updated_at?: Date;
}

export default SupplierDto;