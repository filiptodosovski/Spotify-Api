export class BaseError extends Error {
  isOperational: boolean
  httpCode?: number
 
  constructor(httpCode: number, message: string) {
    super(message)
    this.isOperational = true,
    this.httpCode = httpCode
    Error.captureStackTrace(this, this.constructor)
  }
 
  static knownErrors() {
    return [
      'BadRequest',
      'Unauthorized',
      'Unauthenticated',
      'RefreshTokenExpired',
      'Error',
    ]
  }
}