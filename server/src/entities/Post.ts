// ObjectType makes Post a GraphQL type.
// Field exposes the field to our GraphQL schema.
import { ObjectType, Field } from "type-graphql";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
} from "typeorm";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
    @Field(/*Infers Int type.*/)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    @Field(/*Infers string type.*/)
    @Column()
    title!: string;
}