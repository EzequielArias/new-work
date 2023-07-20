export interface ResponseData<T> {
  ok: Boolean;
  statusCode: number;
  payload: T;
}
