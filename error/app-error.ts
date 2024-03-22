export class AppError extends Error {
  private type: AppErrorType

  constructor(type: AppErrorType, cause: Error) {
    super()
    this.type = type;
    this.cause = cause;
  }
}

export enum AppErrorType {
  DECRYPTION_FAILED='decryption_failed'
}