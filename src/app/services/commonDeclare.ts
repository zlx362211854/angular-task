export type ArrayElement<Type> = Type extends Array<infer Item> ? Item : Type;
export interface IResponse<T> {
    result: T
    code: 100 | 200
    message: string
}