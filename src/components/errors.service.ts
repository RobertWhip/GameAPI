// External
import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorService {
  notFound(): { error: true, message: string } {
    return {
        error: true,
        message: 'NOT_FOUND'
    }
  }
}
