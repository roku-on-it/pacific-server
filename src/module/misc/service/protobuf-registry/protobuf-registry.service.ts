import { Injectable } from '@nestjs/common';

interface RegisterProtobufService {
  package: string;
  protoPath: string;
}

interface ProtobufService {
  package: string[];
  protoPath: string[];
}

@Injectable()
export class ProtobufRegistryService {
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
