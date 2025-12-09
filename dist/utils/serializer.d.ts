export interface Serialized<T, K extends number = number> {
    data: T;
    status: K;
    message: string;
}
export declare function SerializeHttpResponse<T, K extends number = number>(data: T, status: K, message: string): Serialized<T, K>;
