import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public answerComments: AnswerComment[] = [];

  async create(answerComment: AnswerComment) {
    this.answerComments.push(answerComment);
  }

  async findById(id: string) {
    const answerComment = this.answerComments.find(
      (comment) => comment.id.toString() === id.toString()
    );
    return answerComment || null;
  }

  async delete(answerComment: AnswerComment) {
    this.answerComments = this.answerComments.filter(
      (comment) => comment.id.toString() !== answerComment.id.toString()
    );
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const answerComments = this.answerComments
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20);

    return answerComments;
  }
}
