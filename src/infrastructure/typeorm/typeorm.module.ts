import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@user/entity/user.entity';
import { Transaction } from '@transaction/entity/transaction.entity';

@Global()
@Module({})
export class TypeOrmDynamicModule {
  static forRoot(): DynamicModule {
    return {
      module: TypeOrmDynamicModule,
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: parseInt(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USERNAME,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB_NAME,
          entities: [User, Transaction],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User, Transaction]),
      ],
      exports: [TypeOrmModule],
    };
  }
}
