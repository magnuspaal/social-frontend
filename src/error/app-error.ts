export class AppError extends Error{
  type: AppErrorType
  cause: Error;

  constructor(type: AppErrorType, cause: Error) {
    super()
    this.type = type;
    this.cause = cause;
  }
}

export enum AppErrorType {
  DECRYPTION_FAILED='decryption_failed'
}