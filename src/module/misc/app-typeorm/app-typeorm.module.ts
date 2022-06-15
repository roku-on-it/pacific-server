import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { getManager } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<PostgresConnectionOptions> => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        entities: ['dist/**/model/*.{ts,js}'],
        subscribers: ['dist/**/model/event-subscriber/*.subscriber.{ts,js}'],
        dropSchema: /true/i.test(configService.get('DB_DROP_SCHEMA')),
        synchronize: /true/i.test(configService.get('DB_SYNCHRONIZE')),
        logging: /true/i.test(configService.get('DB_LOGGING')),
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class AppTypeormModule implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    await getManager().query(`
    ALTER TABLE person_acquaintances_person
    DROP CONSTRAINT IF EXISTS cannot_know_self;
    
    ALTER TABLE person_acquaintances_person
    ADD CONSTRAINT cannot_know_self
    CHECK ("personId_1" <> "personId_2");
     `);
  }
}
