import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { PostService } from 'src/post/post.service';
import { Post } from 'src/post/post.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    @Inject(forwardRef(() => PostService)) private postService: PostService,
  ) {}

  async create(createAuthorInput: CreateAuthorInput) {
    const author = this.authorRepository.create(createAuthorInput);
    return await this.authorRepository.save(author);
  }

  async findAll() {
    return await this.authorRepository.find();
  }

  async findOne(id: number) {
    return await this.authorRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateAuthorInput: UpdateAuthorInput) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }

  async getPosts(authorId: number): Promise<Post[]> {
    return await this.postService.findPostsByAuthor(authorId);
  }
}
