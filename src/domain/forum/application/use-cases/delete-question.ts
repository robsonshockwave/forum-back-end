import { Either, left, right } from '@/core/either';
import { QuestionsRepository } from '../repositories/questions-repository';
import { NotAllowedError } from './errors/not-allowed-error';

interface DeleteQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
}

type DeleteQuestionUseCaseResponse = Either<NotAllowedError, {}>;

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) throw new Error('Question not found');

    if (question.authorId.toString() !== authorId)
      return left(new NotAllowedError());

    await this.questionsRepository.delete(question);

    return right({});
  }
}
