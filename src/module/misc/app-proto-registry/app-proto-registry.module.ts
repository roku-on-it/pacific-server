import { Module } from '@nestjs/common';
import {
  AppProtoRegistryService,
  RegisterProtobufService,
} from './app-proto-registry.service';
import { from, map, mergeAll } from 'rxjs';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

@Module({
  providers: [AppProtoRegistryService],
  exports: [AppProtoRegistryService],
})
export class AppProtoRegistryModule {
  constructor(private appProtoRegistryService: AppProtoRegistryService) {
    const subscription = from(readdir(join(__dirname, 'proto-files'))).pipe(
      mergeAll(),
      map(this.parseDir),
    );

    subscription.subscribe((protoService) => {
      this.appProtoRegistryService.addService(protoService);
    });
  }

  protected parseDir(directory: string): RegisterProtobufService {
    return {
      package: directory.split('.')[0],
      protoPath: join(__dirname, 'proto-files', directory),
    };
  }
}
