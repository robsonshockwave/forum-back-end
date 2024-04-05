import { Answer } from '@/domain/forum/enterprise/entities/answer';

export class InMemoryAnswersRepository {
  public answers: Answer[] = [];

  async create(answer: Answer) {
    this.answers.push(answer);
  }
}
