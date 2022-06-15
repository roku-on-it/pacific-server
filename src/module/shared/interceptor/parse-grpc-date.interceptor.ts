import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ParseGrpcDateInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      tap((entity) => {
        for (const [key, value] of Object.entries(entity)) {
          if (value instanceof Date) {
            entity[key] = value.getTime();
          }
        }
      }),
    );
  }
}
