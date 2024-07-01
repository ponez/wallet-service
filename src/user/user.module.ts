import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserRepository } from '@user/repository/user.repository';
import { UserResolver } from '@user/user.resolver';
import { User } from '@user/entity/user.entity';
import { TransactionModule } from '@transaction/transaction.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TransactionModule],
  providers: [UserService, UserRepository, UserResolver],
  exports: [UserService],
})
export class UserModule {}
