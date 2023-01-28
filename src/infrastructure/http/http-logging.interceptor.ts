import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { scrubUrl } from './http.module';
import { catchError, Observable, tap } from 'rxjs';
import { request } from 'express';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(
    // wrapper around arguments that have been passed to the original handler
    context: ExecutionContext,
    // I think this allows you to decide when stuff related to the original call executes
    next: CallHandler<any>,

    // What the hell are observables?
    // similar to promises, handles async requests
    // My understanding: an async object used to manipulate function responses
  ): Observable<any> | Promise<Observable<any>> {
    // return;
    if (context.getType() === 'http') {
      const req: Request = context.switchToHttp().getRequest();
      this.logRequest(req);

      return next.handle().pipe(
        //seems like a map type thing
        tap((val) => {
          this.logger.debug('Response');
          this.logger.debug({
            method: req.method,
            url: scrubUrl(req.url),
            data: val,
          });
        }),
        catchError((err, _caught) => {
          this.logger.debug('Response');
          this.logger.debug({
            method: req.method,
            url: scrubUrl(req.url),
            error: err,
          });
          return Promise.reject(err);
        }),
      );
    }

    return next.handle();
  }

  logRequest = function (request: Request) {
    if (this != undefined) {
      this.logger.debug('Request');
      this.logger.debug({
        method: request.method,
        url: scrubUrl(request.url),
        headers: request.headers,
        data: request.body,
      });
    }
  };

  logResponse = function (response: Response) {
    if (this != undefined) {
      this.logger.debug('Request');
      this.logger.debug({
        method: request.method,
        url: scrubUrl(request.url),
        headers: request.headers,
        data: request.body,
      });
    }
  };
}
