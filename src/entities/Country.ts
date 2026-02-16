import { IsNotEmpty, Length } from "class-validator";
import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Country extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  @IsNotEmpty()
  @Length(2, 2)
  code!: string;

  @Field()
  @Column()
  @IsNotEmpty()
  @Length(2, 50)
  name!: string;

  @Field()
  @Column()
  @IsNotEmpty()
  @Length(1, 4)
  emoji!: string;
}
