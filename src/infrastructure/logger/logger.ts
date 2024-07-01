import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlContext = GqlExecutionContext.create(context);
    const req = gqlContext.getContext().req;
    const info = gqlContext.getInfo();
    const variables = gqlContext.getArgs(); // Getting all arguments including variables

    this.logRequest(req, info, variables);

    return next.handle().pipe(
      tap(() => {
        this.logResponse(req);
      }),
    );
  }

  private logRequest(req: any, info: any, variables: any): void {
    const userId = req.user ? req.user.id : 'Anonymous';
    this.logger.verbose(
      `GraphQL Request initiated by user ${userId}. Operation: ${
        info.parentType
      }.${info.fieldName}. Variables: ${JSON.stringify(variables)}`,
    );
  }

  private logResponse(req: any): void {
    const userId = req.user ? req.user.id : 'Anonymous'; // in case we added auth and there is JWT token
    this.logger.verbose(`GraphQL Response sent to user ${userId}.`);
  }
}
