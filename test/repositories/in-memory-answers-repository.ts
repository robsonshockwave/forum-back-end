import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

export class InMemoryAnswersRepository implements AnswersRepository {
  public answers: Answer[] = [];

  async create(answer: Answer) {
    this.answers.push(answer);
  }

  async findById(id: string) {
    const answer = this.answers.find((answer) => answer.id.toString() === id);

    return answer || null;
  }

  async delete(answer: Answer) {
    this.answers = this.answers.filter(
      (a) => a.id.toString() !== answer.id.toString()
    );
  }
}
