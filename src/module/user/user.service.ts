import { GrpcService } from '../shared/decorator/class/grpc-service';
import { GrpcMethod } from '@nestjs/microservices';
import { User } from './model/user';
import { plainToInstance } from 'class-transformer';
import { CreateUser } from './input/create-user';
import { from, Observable } from 'rxjs';

@GrpcService()
export class UserService {
  @GrpcMethod()
  register(payload: CreateUser): Observable<User> {
    return from(
      plainToInstance(User, payload)
        .save()
        .then((u) => {
          console.log(u);
          return u;
        }),
    );
  }
}
