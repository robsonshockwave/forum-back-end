import { DomainEvents } from '@/core/events/domain-events';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

export class InMemoryAnswersRepository implements AnswersRepository {
  public answers: Answer[] = [];

  constructor(
    private answerAttachmentsRepository: AnswerAttachmentsRepository
  ) {}

  async create(answer: Answer) {
    this.answers.push(answer);

    DomainEvents.dispatchEventsForAggregate(answer.id);
  }

  async findById(id: string) {
    const answer = this.answers.find((answer) => answer.id.toString() === id);

    return answer || null;
  }

  async delete(answer: Answer) {
    this.answers = this.answers.filter(
      (a) => a.id.toString() !== answer.id.toString()
    );

    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString());
  }

  async save(answer: Answer) {
    this.answers = this.answers.map((a) =>
      a.id.toString() === answer.id.toString() ? answer : a
    );

    DomainEvents.dispatchEventsForAggregate(answer.id);
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.answers
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return answers;
  }
}
