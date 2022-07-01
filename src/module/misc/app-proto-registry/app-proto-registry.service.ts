import { Injectable } from '@nestjs/common';

export interface RegisterProtobufService {
  package: string;
  protoPath: string;
}

export interface ProtobufService {
  package: string[];
  protoPath: string[];
}

@Injectable()
export class AppProtoRegistryService {
  protected protobufServices: ProtobufService = {
    package: [],
    protoPath: [],
  };

  get services() {
    return this.protobufServices;
  }

  addService(service: RegisterProtobufService): void {
    this.protobufServices.package.push(service.package);
    this.protobufServices.protoPath.push(service.protoPath);
  }
}
