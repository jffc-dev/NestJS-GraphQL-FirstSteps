/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { Author } from 'src/author/entities/author.entity';

@Resolver(() => Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => [Post])
  posts() {
    return this.postService.findAll();
  }

  @ResolveField(() => Author)
  author(@Parent() post: Post) {
    return this.postService.getAuthor(post.authorId);
  }

  @Query(() => Post)
  post(
    @Args('id', {
      type: () => Int,
    })
    id: number,
  ) {
    return this.postService.findPostById(id);
  }

  @Mutation(() => Post)
  createPost(@Args('postInput') postInput: CreatePostInput) {
    return this.postService.createPost(postInput);
  }
}
