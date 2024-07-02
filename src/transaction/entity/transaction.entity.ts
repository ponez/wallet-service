import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsInt } from 'class-validator';
import { ColumnNumericTransformer } from "@infrastructure/util/numeric.transformer";

@ObjectType()
@Entity()
export class Transaction {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  @IsInt()
  userId: number;

  @Field(() => Int)
  @Column('numeric', {
    precision: 7,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  @IsInt()
  amount: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
