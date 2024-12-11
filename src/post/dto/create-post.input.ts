import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreatePostInput {
  @MaxLength(100, {
    message: 'The title is too long',
  })
  @MinLength(3, {
    message: 'The title is too short',
  })
  @IsNotEmpty({
    message: 'The title is required',
  })
  @Field()
  title: string;

  @MaxLength(400)
  @Field({ nullable: true })
  content?: string;

  @IsInt()
  @Field()
  authorId: number;
}
