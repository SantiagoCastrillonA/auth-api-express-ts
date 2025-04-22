export interface BaseRepository<T> {
    create(item: T): Promise<T>;
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    update(id: number, item: T): Promise<T | null>;
    delete(id: number): Promise<boolean>;
}