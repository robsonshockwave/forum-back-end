import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public questionComments: QuestionComment[] = [];

  async create(questionComment: QuestionComment) {
    this.questionComments.push(questionComment);
  }

  async findyById(id: string) {
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
}
