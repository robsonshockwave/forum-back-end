import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public questions: Question[] = [];

  async create(question: Question) {
    this.questions.push(question);
  }

  async findBySlug(slug: string) {
    const question = this.questions.find(
      (question) => question.slug.value === slug
    );

    return question || null;
  }

  async findById(id: string) {
    const question = this.questions.find(
      (question) => question.id.toString() === id
    );

    return question || null;
  }

  async delete(question: Question) {
    this.questions = this.questions.filter(
      (q) => q.id.toString() !== question.id.toString()
    );
  }

  async save(question: Question) {
    this.questions = this.questions.map((q) =>
      q.id.toString() === question.id.toString() ? question : q
    );
  }
}
