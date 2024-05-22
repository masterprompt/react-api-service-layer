export abstract class ApiService {
    abstract get(resourcePath: string, options?: any): Promise<any>;
    abstract post(resourcePath: string, payload: any, options?: any): Promise<any>;
    abstract put(resourcePath: string, payload: any, options?: any): Promise<any>;
    abstract patch(resourcePath: string, payload: any, options?: any): Promise<any>;
    abstract delete(resourcePath: string, options?: any): Promise<any>;
}