/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './post.entity';
import { CreatePostInput } from './dto/create-post.input';

@Resolver()
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query((returns) => [Post])
  posts() {
    return this.postService.findAll();
  }

  @Query((returns) => Post)
  post(
    @Args('id', {
      type: () => Int,
    })
    id: number,
  ) {
    return this.postService.findProductById(id);
  }

  @Mutation((returns) => Post)
  createPost(@Args('postInput') postInput: CreatePostInput) {
    return this.postService.createPost(postInput);
  }
}
