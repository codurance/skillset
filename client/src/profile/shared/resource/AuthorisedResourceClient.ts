export interface AuthorisedResourceClient {

    get<T>(path: string, query?: unknown): Promise<T>;

    update<T>(path: string, value: T): Promise<void>;
}