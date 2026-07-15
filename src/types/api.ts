export type FieldErrors = Record<string, string>;

export type ApiErrorResponse = {
  timestamp?: string;
  status: number;
  code: string;
  message: string;
  path?: string;
  fieldErrors: FieldErrors;
};