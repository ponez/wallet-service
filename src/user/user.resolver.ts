// src/user/user.resolver.ts
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { GetBalanceDto } from '@user/dto/get-balance.dto';
import { UpdateBalanceDto } from '@user/dto/update-balance.dto';
import { UpdateBalanceReponseDto } from '@user/dto/update-balance.reponse.dto';
import { BalanceResponseDto } from '@user/dto/balance.response.dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => BalanceResponseDto)
  async balance(
    @Args('GetBalanceDto') getBalanceDto: GetBalanceDto,
  ): Promise<BalanceResponseDto> {
    return this.userService.getBalance(getBalanceDto.userId);
  }

  @Mutation(() => UpdateBalanceReponseDto)
  async updateBalance(
    @Args('UpdateBalanceDto') updateBalanceDto: UpdateBalanceDto,
  ): Promise<UpdateBalanceReponseDto> {
    return this.userService.updateBalance(
      updateBalanceDto.userId,
      updateBalanceDto.amount,
    );
  }
}
