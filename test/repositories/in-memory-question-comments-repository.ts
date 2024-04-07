import { PaginationParams } from '@/core/repositories/pagination-params';
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public questionComments: QuestionComment[] = [];

  async create(questionComment: QuestionComment) {
    this.questionComments.push(questionComment);
  }

  async findById(id: string) {
    const questionComment = this.questionComments.find(
      (comment) => comment.id.toString() === id.toString()
    );
    return questionComment || null;
  }

  async delete(questionComment: QuestionComment) {
    this.questionComments = this.questionComments.filter(
      (comment) => comment.id.toString() !== questionComment.id.toString()
    );
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const questionComments = this.questionComments
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return questionComments;
  }
}
