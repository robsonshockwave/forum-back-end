import { UniqueEntityID } from '@/core/entities/unique-entity-id';

import { AnswersRepository } from '../repositories/answers-repository';
import { Answer } from '../../enterprise/entities/answer';
import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';

interface ChooseQuestionBestAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question;
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private questionRepository: QuestionsRepository
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) throw new Error('Answer not found');

    const question = await this.questionRepository.findById(
      answer.questionId.toString()
    );

    if (!question) throw new Error('Question not found');

    if (question.authorId.toString() !== authorId)
      throw new Error('Unauthorized');

    question.bestAnswerId = answer.id;

    await this.questionRepository.save(question);

    return { question };
  }
}
