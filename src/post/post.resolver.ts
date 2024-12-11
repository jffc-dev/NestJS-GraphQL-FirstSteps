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

@Resolver((of) => Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query((returns) => [Post])
  posts() {
    return this.postService.findAll();
  }

  @ResolveField((returns) => Author)
  author(@Parent() post: Post) {
    return this.postService.getAuthor(post.authorId);
  }

  @Query((returns) => Post)
  post(
    @Args('id', {
      type: () => Int,
    })
    id: number,
  ) {
    return this.postService.findPostById(id);
  }

  @Mutation((returns) => Post)
  createPost(@Args('postInput') postInput: CreatePostInput) {
    return this.postService.createPost(postInput);
  }
}
