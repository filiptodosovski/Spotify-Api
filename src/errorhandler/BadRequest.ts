import { BaseError } from './baseError'
export class BadRequest extends BaseError {
  constructor(message: string) {
    super(400, message)
    this.name = 'BadRequest'
    this.httpCode = 400
    this.message = message
  }
}